import { useNavigate } from 'react-router-dom'
import Table from '../table/Table'
import 'devextreme/dist/css/dx.light.css'
import {
  DataGrid,
  Column,
  FilterRow,
  SearchPanel,
  Selection,
} from 'devextreme-react/data-grid'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { trHeader } from '../i18n/headerMap'

export default function OrderHeadsListing(props) {
  const { t } = useTranslation()
  let navigate = useNavigate()

  // SQL (query API): { rows }; legacy: { Items } from mode=list&table=ooa
  let gridData = []

  if (props.data?.rows && Array.isArray(props.data.rows)) {
    gridData = props.data.rows.map((row, index) => ({
      id: index + 1,
      Key: row.acKey,
      Warehouse: row.acWarehouse,
      Consignee: row.acConsignee,
      DeliveryDeadline: row.adDeliveryDeadline,
      DocumentType: row.acDocType,
      acStatus: row.acStatus ?? row.AcStatus ?? '',
      Receiver: row.acReceiver,
    }))
  } else if (props.data && Array.isArray(props.data.Items)) {
    gridData = props.data.Items.map((item, index) => {
      try {
        const properties = item.Properties.Items.reduce((acc, prop) => {
          acc[prop.Name] =
            prop.StringValue ||
            prop.IntValue ||
            prop.DoubleValue ||
            prop.BoolValue ||
            prop.DateTimeValue ||
            ''
          return acc
        }, {})
        if (properties.acStatus === undefined && properties.AcStatus !== undefined) {
          properties.acStatus = properties.AcStatus
        }
        // Add auto-increment id field
        properties.id = index + 1
        return properties
      } catch (error) {
        return null // or any other error handling logic
      }
    }).filter((item) => item !== null) // Filter out null values if needed
  }

  const selectHeader = useCallback((e) => {
    let chosenHeadDocument = e.selectedRowsData
    // Communicate to parent component.
    props.communicate('head', 'select', chosenHeadDocument[0])
  }, [])

  return (
    <div>
      <DataGrid
        className='devexpress-grid order'
        dataSource={gridData}
        keyExpr={'id'}
        onSelectionChanged={selectHeader}
        allowColumnReordering={true}
        allowColumnResizing={true}
        noDataText={t('common.noData')}
        columnAutoWidth={true}
        focusedRowEnabled={true}
        hoverStateEnabled={true}
      >
        <FilterRow visible={true} />

        <Column dataField='Warehouse' caption={trHeader('Skladišče', t)} />
        <Column dataField='Consignee' caption={trHeader('Prejemnik', t)} />
        <Column
          dataField='DeliveryDeadline'
          date
          dataType='datetime'
          caption={trHeader('Rok dobave', t)}
        />
        <Column dataField='DocumentType' caption={trHeader('Vrsta dokumenta', t)} />
        <Column dataField='acStatus' caption={trHeader('Status', t)} />
        <Column dataField='Key' caption={trHeader('Ključ', t)} />
        <Column dataField='Receiver' caption={trHeader('Sprejemnik', t)} />
        <Selection mode='single' />
      </DataGrid>
    </div>
  )
}
