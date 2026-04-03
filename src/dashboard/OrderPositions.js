import { useNavigate } from 'react-router-dom'
import Table from '../table/Table'
import 'devextreme/dist/css/dx.light.css'
import { useCallback } from 'react'

import {
  DataGrid,
  Column,
  SearchPanel,
  FilterRow,
  Selection,
} from 'devextreme-react/data-grid'

import { useTranslation } from 'react-i18next'
import { trHeader } from '../i18n/headerMap'

export default function OrderPositions(props) {
  const { t } = useTranslation()
  let navigate = useNavigate()

  // This code converts the old api result to the devexpress data array.
  let gridData = []
  if (props.data && Array.isArray(props.data.Items)) {
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
        // Add auto-increment id field
        properties.id = index + 1
        return properties
      } catch (error) {
        return null // or any other error handling logic
      }
    }).filter((item) => item !== null) // Filter out null values if needed
  }

  const selectPosition = useCallback((e) => {
    let chosenPositionDocument = e.selectedRowsData
    // Communicate to parent component.
    props.communicate('position', 'select', chosenPositionDocument[0])
  }, [])

  return (
    <div>
      <DataGrid
        className='devexpress-grid order-position'
        dataSource={gridData}
        onSelectionChanged={selectPosition}
        keyExpr={'id'}
        allowColumnReordering={true}
        allowColumnResizing={true}
        noDataText={t('common.noData')}
        columnAutoWidth={true}
        focusedRowEnabled={true}
        hoverStateEnabled={true}
      >
        <FilterRow visible={true} />
        <Column dataField='Ident' caption={trHeader('Ident', t)} />
        <Column dataField='Name' caption={trHeader('Name', t)} />
        <Column dataField='No' caption={trHeader('Št. artikla', t)} />
        <Column dataField='ItemID' caption={trHeader('Številka', t)} />
        <Column dataField='OpenQty' caption={trHeader('Odprto', t)} />
        <Column dataField='FullQty' caption={trHeader('Naročeno', t)} />
        <Selection mode='single' />
      </DataGrid>
    </div>
  )
}
