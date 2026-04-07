import HeaderOrderListing from './HeaderOrderListing'
import OrderHeadsListing from './OrderHeadsListing'
import OrderPositions from './OrderPositions'
import Header from './Header'
import Footer from './Footer'
import { useCallback, useEffect, useState } from 'react'
import ListingService from '../services/ListingService'
import Loader from '../loader/Loader'
import $ from 'jquery'
import ListingPositionsButtons from './ListingPositionsButtons'
import DataAccess from '../utility/DataAccess'
import StatusChange from './StatusChange'
import { useSelector, useDispatch } from 'react-redux'
import * as redux from '../features/data'
import AddOrderPosition from '../popup/AddOrderPosition'
import TransactionService from '../services/TransactionService'
import i18n from '../i18n'

export default function Listing() {
  const dispatch = useDispatch()

  const name = useSelector((state) => state.user.fullName)
  const [popupVisible, setPopupVisible] = useState(false)

  const [warehouses, setWarehouses] = useState([])
  const [locations, setLocations] = useState([])
  const [idents, setIdents] = useState([])

  const [selectedHead, setSelectedHead] = useState([])
  const [selectedPosition, setSelectedPosition] = useState()

  const [isPositionSelected, setIsPositionSelected] = useState(false)
  const [isHeadOrderSelected, setIsHeadOrderSelected] = useState(false)

  const handlePopupClose = () => {
    setPopupVisible(false)
  }

  // orders — { rows } from SQL uvWMSOpenOrder (getAllListings); legacy shape { Items } still supported in grid
  const [orders, setOrders] = useState({ rows: [] })
  // positions
  const [positions, setPositions] = useState([])
  const [selectedHeadOrder, setSelectedHeadOrder] = useState()
  const [showStatusAlert, setShowStatusAlert] = useState(false)
  const [focusOrderKey, setFocusOrderKey] = useState(null)
  const [focusPositionItemId, setFocusPositionItemId] = useState(null)

  const refreshListingAfterOrder = useCallback((createdKey) => {
    ListingService.getAllListings().then((response) => {
      setOrders(response)
      if (createdKey != null && createdKey !== '') {
        setFocusOrderKey(String(createdKey))
      }
    })
  }, [])

  const clearFocusOrderKey = useCallback(() => setFocusOrderKey(null), [])
  const clearFocusPositionItemId = useCallback(
    () => setFocusPositionItemId(null),
    [],
  )

  useEffect(() => {
    localStorage.setItem('back', 'dashboard')
    ListingService.getAllListings().then((response) => {
      setOrders(response)
    })
  }, [])

  function getPositions(order, focusItemId = null) {
    if (order == null || order === '') return
    ListingService.getAllPositions(order).then((response) => {
      response.Items = response.Items.sort(function (a, b) {
        var aValue = DataAccess.getData(a, 'No', 'IntValue')
        var bValue = DataAccess.getData(b, 'No', 'IntValue')
        return aValue - bValue
      })

      var positions = []

      for (var i = 0; i < response.Items.length; i++) {
        var itemID = DataAccess.getData(response.Items[i], 'ItemID', 'IntValue')
        if (itemID != 0) {
          positions.push(response.Items[i])
        } else {
          continue
        }
      }

      response.Items = positions

      setPositions(response)
      if (focusItemId != null && focusItemId !== '') {
        setFocusPositionItemId(String(focusItemId))
      } else {
        setFocusPositionItemId(null)
      }
    })
  }

  const [sort, setSort] = useState()
  const [refresh, setRefresh] = useState('refresh')

  const getSortingObject = (sorting) => {
    setSort(sorting)
  }

  const communicate = (type, event, data) => {
    if (type === 'position') {
      if (event === 'delete') {
        window
          .swal({
            title: i18n.t('common.confirm'),
            text: i18n.t('listing.confirmDeletePosition'),
            icon: 'warning',
            buttons: [i18n.t('common.no'), i18n.t('listing.yesDelete')],
          })
          .then((result) => {
            if (result) {
              const currentId = selectedPosition.ItemID

              ListingService.deletePosition(currentId).then((response) => {
                window.showAlert(i18n.t('common.info'), i18n.t('listing.deleteSuccess'), 'success')
                getPositions(selectedHead.Key)
              })
            }
          })
      } else if (event === 'render') {
        const focusItemId =
          data &&
          typeof data === 'object' &&
          data.focusItemId != null &&
          data.focusItemId !== ''
            ? data.focusItemId
            : null
        getPositions(selectedHead.Key, focusItemId)
      } else if (event == 'create') {
        setPopupVisible(!popupVisible)
      } else if (event == 'select') {
        setSelectedPosition(data)
      } else if (type == 'position' && event == 'update') {
        let key = selectedHead.Key
        let itemID = selectedPosition.ItemID
        let no = selectedPosition.No
        let ident = selectedPosition.Ident

        var objectToUpdate = {
          Key: key,
          Qty: data,
          ItemID: itemID,
          Clerk: localStorage.getItem('name'),
          No: no,
          Ident: ident,
        }

        ListingService.updatePosition(objectToUpdate).then((response) => {
          if (response.Success) {
            window.showAlert(
              i18n.t('common.info'),
              i18n.t('listing.positionUpdated'),
              'success',
            )
          } else {
            window.showAlert(i18n.t('common.info'), i18n.t('common.dataError'), 'error')
          }

          getPositions(selectedHead.Key)
        })
      }
    } else if (type === 'head') {
      if (event === 'delete') {
        window
          .swal({
            title: i18n.t('common.confirm'),
            text: i18n.t('listing.confirmDeleteOrder'),
            icon: 'warning',
            buttons: [i18n.t('common.no'), i18n.t('listing.yesDelete')],
          })
          .then((result) => {
            if (result) {
              ListingService.deleteHeadDocumentOrder(selectedHead.Key).then(
                (response) => {
                  if (response.data.Success) {
                    ListingService.getAllListings().then((response) => {
                      window.showAlert(
                        i18n.t('common.info'),
                        i18n.t('listing.deleteSuccess'),
                        'success',
                      )

                      setOrders(response)
                    })
                  }
                },
              )
            }
          })
      } else if (event === 'render') {
        renderComponent()
      } else if (event === 'select') {
        setSelectedHead(data)
        getPositions(data.Key)
      }
    }
  }

  const renderComponent = () => {
    ListingService.getAllListings().then((response) => {
      setOrders(response)
    })
  }

  return (
    <div>
      <Loader />
      <div className='main-container'>
        <Header />

        <div className='listing-bg'>
          <div className='listing-body'>
            <HeaderOrderListing
              render={renderComponent}
              refreshListingAfterOrder={refreshListingAfterOrder}
              communicate={communicate}
              getSortingObject={getSortingObject}
            />
            <OrderHeadsListing
              communicate={communicate}
              data={orders}
              sort={sort}
              focusOrderKey={focusOrderKey}
              onFocusOrderHandled={clearFocusOrderKey}
            />
            <ListingPositionsButtons
              selectedElement={selectedPosition}
              communicate={communicate}
            />
            <OrderPositions
              communicate={communicate}
              data={positions}
              focusItemId={focusPositionItemId}
              onFocusPositionHandled={clearFocusPositionItemId}
            />
            <AddOrderPosition
              current={selectedHead.Key}
              isVisible={popupVisible}
              onClose={handlePopupClose}
              communicate={communicate}
              warehouse={warehouses}
              idents={idents}
              locations={locations}
            />
            {showStatusAlert && typeof selectedHeadOrder != 'undefined' && (
              <StatusChange order={selectedHead.Key} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
