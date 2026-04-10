import HeaderOrderListing from './HeaderOrderListing'
import OrderHeadsListing from './OrderHeadsListing'
import OrderPositions from './OrderPositions'
import Header from './Header'
import Footer from './Footer'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TableExportButton from '../components/TableExportButton'
import {
  getOrderListingHeadExportColumns,
  getOrderListingPositionsExportColumns,
} from '../utility/tableExportColumnSets'
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
import { pickNovelOrderKeyFromRows } from '../utility/listingOrderUtils'

export default function Listing() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const orderHeadsGridRef = useRef(null)
  const orderPositionsGridRef = useRef(null)

  const orderHeadExportColumns = useMemo(
    () => getOrderListingHeadExportColumns(t),
    [t],
  )
  const orderPositionsExportColumns = useMemo(
    () => getOrderListingPositionsExportColumns(t),
    [t],
  )

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
  const ordersRef = useRef(orders)
  // positions
  const [positions, setPositions] = useState([])
  const [selectedHeadOrder, setSelectedHeadOrder] = useState()
  const [showStatusAlert, setShowStatusAlert] = useState(false)
  const [focusOrderKey, setFocusOrderKey] = useState(null)
  const [focusPositionHint, setFocusPositionHint] = useState(null)

  useEffect(() => {
    ordersRef.current = orders
  }, [orders])

  const refreshListingAfterOrder = useCallback((createdKey) => {
    return new Promise((resolve) => {
      const prevRows = ordersRef.current?.rows || []
      const previousKeys = new Set(
        prevRows
          .map((r) =>
            r && r.acKey != null && r.acKey !== '' ? String(r.acKey) : null,
          )
          .filter(Boolean),
      )

      const MAX_ATTEMPTS = 1
      let attempt = 0

      const fetchAndFocus = () => {
        ListingService.getAllListings()
          .then((response) => {
            const rows = response.rows || []
            setOrders(response)

            let keyToFocus =
              createdKey != null && createdKey !== ''
                ? String(createdKey)
                : null
            if (!keyToFocus) {
              keyToFocus = pickNovelOrderKeyFromRows(previousKeys, rows)
            }

            if (keyToFocus) {
              setFocusOrderKey(keyToFocus)
              resolve(keyToFocus)
              return
            }

            attempt += 1
            if (attempt < MAX_ATTEMPTS) {
              window.setTimeout(fetchAndFocus, 500)
              return
            }
            resolve(null)
          })
          .catch(() => resolve(null))
      }

      fetchAndFocus()
    })
  }, [])

  const clearFocusOrderKey = useCallback(() => setFocusOrderKey(null), [])
  const clearFocusPositionHint = useCallback(
    () => setFocusPositionHint(null),
    [],
  )

  useEffect(() => {
    localStorage.setItem('back', 'dashboard')
    ListingService.getAllListings().then((response) => {
      setOrders(response)
    })
  }, [])

  function getPositions(order, hint = null) {
    if (order == null || order === '') return
    ListingService.getAllPositions(order)
      .then((response) => {
        const base = response && typeof response === 'object' ? response : {}
        const rawItems = Array.isArray(base.Items) ? base.Items : []
        const sorted = [...rawItems].sort(function (a, b) {
          var aValue = DataAccess.getData(a, 'No', 'IntValue')
          var bValue = DataAccess.getData(b, 'No', 'IntValue')
          return aValue - bValue
        })

        var positions = []

        for (var i = 0; i < sorted.length; i++) {
          var itemID = DataAccess.getData(sorted[i], 'ItemID', 'IntValue')
          if (itemID != 0) {
            positions.push(sorted[i])
          } else {
            continue
          }
        }

        setPositions({ ...base, Items: positions })
      const hasItemId =
        hint &&
        typeof hint === 'object' &&
        hint.focusItemId != null &&
        hint.focusItemId !== ''
      const hasIdent =
        hint &&
        typeof hint === 'object' &&
        hint.focusIdent != null &&
        hint.focusIdent !== ''
      if (hasItemId || hasIdent) {
        setFocusPositionHint({
          itemId: hasItemId ? String(hint.focusItemId) : null,
          ident: hasIdent ? String(hint.focusIdent) : null,
          qty:
            hint &&
            typeof hint === 'object' &&
            hint.focusQty != null &&
            hint.focusQty !== ''
              ? String(hint.focusQty)
              : null,
        })
      } else {
        setFocusPositionHint(null)
      }
      })
      .catch(() => {
        setPositions({ Items: [] })
        setFocusPositionHint(null)
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
        const hint =
          data && typeof data === 'object'
            ? {
                focusItemId:
                  data.focusItemId != null && data.focusItemId !== ''
                    ? data.focusItemId
                    : null,
                focusIdent:
                  data.focusIdent != null && data.focusIdent !== ''
                    ? String(data.focusIdent)
                    : null,
                focusQty:
                  data.focusQty != null && data.focusQty !== ''
                    ? String(data.focusQty)
                    : null,
              }
            : null
        getPositions(selectedHead.Key, hint)
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
          if (!response.Success) {
            window.showAlert(i18n.t('common.info'), i18n.t('common.dataError'), 'error')
          }

          // Refresh and re-focus the edited line so subsequent edits show latest qty
          getPositions(selectedHead.Key, { focusItemId: itemID })
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
              appendActions={
                <TableExportButton
                  fileBaseName="wms-listing-orders"
                  columnDefs={orderHeadExportColumns}
                  getRows={() =>
                    orderHeadsGridRef.current?.getExportRows?.() ?? []
                  }
                />
              }
            />
            <OrderHeadsListing
              ref={orderHeadsGridRef}
              communicate={communicate}
              data={orders}
              sort={sort}
              focusOrderKey={focusOrderKey}
              onFocusOrderHandled={clearFocusOrderKey}
            />
            <ListingPositionsButtons
              selectedElement={selectedPosition}
              communicate={communicate}
              appendActions={
                <TableExportButton
                  fileBaseName="wms-listing-positions"
                  columnDefs={orderPositionsExportColumns}
                  getRows={() =>
                    orderPositionsGridRef.current?.getExportRows?.() ?? []
                  }
                />
              }
            />
            <OrderPositions
              ref={orderPositionsGridRef}
              communicate={communicate}
              data={positions}
              focusHint={focusPositionHint}
              onFocusPositionHandled={clearFocusPositionHint}
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
