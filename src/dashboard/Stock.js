import Header from './Header'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import StockService from '../services/StockService'
import $ from 'jquery'
import Table from '../table/Table'
import DataAccess from '../utility/DataAccess'
import TableForgeDashboard from './TableForgeDashboard'
import 'devextreme/dist/css/dx.light.css'
import {
  DataGrid,
  Column,
  FilterRow,
  SearchPanel,
} from 'devextreme-react/data-grid'
import { useTranslation } from 'react-i18next'
import { trHeader } from '../i18n/headerMap'

export default function Stock() {
  const { t } = useTranslation()
  const [warehouses, setWarehouses] = useState([])
  const [locations, setLocations] = useState([])
  const [idents, setidents] = useState([])
  const [ident, setIdent] = useState()
  const [location, setLocation] = useState()
  const [warehouse, setWarehouse] = useState()
  const [data, setData] = useState([])

  useEffect(() => {
    StockService.getWarehouses().then((response) => {
      var warehouses = onlyWarehouses(response)
      setWarehouses(warehouses)
    })

    StockService.getIdents().then((response) => {
      var identsFinal = []
      identsFinal.push({ value: '', label: '' })

      for (var i = 0; i < response.length; i++) {
        try {
          identsFinal.push({ value: response[i], label: response[i] })
        } catch (e) {
          continue
        }
      }
      setidents(identsFinal)
    })
  }, [])

  function onlyWarehouses(data) {
    var returnArray = []
    returnArray.push({ value: '', label: '' })

    for (var i = 0; i < data.Items.length; i++) {
      returnArray.push({
        value: data.Items[i].Properties.Items[0].StringValue,
        label: data.Items[i].Properties.Items[0].StringValue,
      })
    }

    return returnArray
  }

 const customStyles = {
  control: (base) => ({
    ...base,
    width: '15em',
  }),
  menu: (base) => ({
    ...base,
    width: '15em',
    zIndex: 9999999,          // still good to set
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 99999999,         // THIS is the real winner
  }),
  option: (provided) => ({
    ...provided,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
}

  const fetchData = async (sql, params) => {
    StockService.executeSQLQuery(sql, params).then((result) => {
      setData(result)
    })
  }

  const handleInventory = (e) => {
    var usedFilters = []
    var params = []
    var sql = 'SELECT si.acName, s.* FROM uWMSStock s JOIN tHE_SEtItem si ON s.acIdent = si.acIdent'
    if (typeof warehouse !== 'undefined' && warehouse !== null) {
      usedFilters.push('warehouse')
    }
    if (typeof location !== 'undefined' && location !== null) {
      usedFilters.push('location')
    }
    if (typeof ident !== 'undefined' && ident !== null) {
      usedFilters.push('ident')
    }

    if (usedFilters.length != 0) {
      sql += ' WHERE'
    }
    for (var i = 0; i < usedFilters.length; i++) {
      if (i == 0) {
        if (usedFilters[i] == 'warehouse') {
          sql += ' acWarehouse = @warehouse'
          var parameter = {
            Name: 'warehouse',
            Type: 'String',
            Value: warehouse.value,
          }
          params.push(parameter)
        } else if (usedFilters[i] == 'location') {
          sql += ' acLocation = @location'
          var parameter = {
            Name: 'location',
            Type: 'String',
            Value: location.value,
          }
          params.push(parameter)
        } else if (usedFilters[i] == 'ident') {
          sql += ' acIdent = @ident'
          var parameter = { Name: 'ident', Type: 'String', Value: ident.value }
          params.push(parameter)
        }
      } else {
        if (usedFilters[i] == 'warehouse') {
          sql += ' AND acWarehouse = @warehouse'
          var parameter = {
            Name: 'warehouse',
            Type: 'String',
            Value: warehouse.value,
          }
          params.push(parameter)
        } else if (usedFilters[i] == 'location') {
          sql += ' AND acLocation = @location'
          var parameter = {
            Name: 'location',
            Type: 'String',
            Value: location.value,
          }
          params.push(parameter)
        } else if (usedFilters[i] == 'ident') {
          sql += ' AND acIdent = @ident'
          var parameter = { Name: 'ident', Type: 'String', Value: ident.value }
          params.push(parameter)
        }
      }
    }
    sql += ';'
    fetchData(sql, params)
  }

  function handleIdentChange(event) {
    if (event.value != '') {
      setIdent(event)
    } else {
      setIdent(null)
    }
  }

  function handleLocationChange(event) {
    if (event.value != '') {
      setLocation(event)
    } else {
      setLocation(null)
    }
  }

  function handleWarehouseChange(event) {
    if (event.value != '') {
      setWarehouse(event)
    } else {
      setWarehouse(null)
    }
    StockService.getLocations(event.value).then((response) => {
      var locations = []
      locations.push({ value: '', label: '' })

      for (var i = 0; i < response.Items.length; i++) {
        locations.push({
          value: response.Items[i].Properties.Items[0].StringValue,
          label: response.Items[i].Properties.Items[0].StringValue,
        })
      }
      setLocations(locations)
    })
  }

  // Set up the value for the back button
  localStorage.setItem('back', 'dashboard')
  const name = 'stock'
  return (
    <div>
      <div className='main-container stock-main'>
        <Header />

        <div className='listing-bg'>
          <div className='listing-body stock-listing-body'>
            <div className='stock-container-filters'>
              <Select
                className='select-filters-stock'
                styles={customStyles}
                placeholder={t('stock.placeholderWarehouse')}
                value={warehouse}
                onChange={handleWarehouseChange}
                options={warehouses}
                id='warehouseStock'
              />
              <Select
                className='select-filters-stock'
                styles={customStyles}
                placeholder={t('stock.placeholderLocation')}
                value={location}
                onChange={handleLocationChange}
                options={locations}
                id='locationStock'
              />
              <Select
                className='select-filters-stock'
                styles={customStyles}
                placeholder={t('stock.placeholderIdent')}
                value={ident}
                onChange={handleIdentChange}
                options={idents}
                id='identStock'
              />

              <span
                className='actions smallerr stock'
                styles={customStyles}
                onClick={handleInventory}
              >
                {t('common.show')}
              </span>
            </div>

            {/* <TableForgeDashboard name={name} tableData = {data} /> */}

            <div className='stock-grid-host'>
              <DataGrid
                className='devexpress-grid stock'
                id='dataGrid'
                dataSource={data}
                keyExpr='acWarehouse'
                allowColumnReordering={true}
                allowColumnResizing={true}
                noDataText={t('common.noData')}
                columnAutoWidth={true}
              >
                <FilterRow visible={true} />

                <Column dataField='acWarehouse' caption={trHeader('Skladišče', t)} />
                <Column dataField='acIdent' caption={trHeader('Ident', t)} />
                <Column dataField='acName' caption={trHeader('Naziv', t)} />
                <Column dataField='anQty' caption={trHeader('Količina', t)} />
                <Column dataField='acLocation' caption={trHeader('Lokacija', t)} />
              </DataGrid>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
