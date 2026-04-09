import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react'
import {
  DataGrid,
  Column,
  FilterRow,
  Selection,
} from 'devextreme-react/data-grid'
import { useTranslation } from 'react-i18next'
import { trHeader } from '../i18n/headerMap'
import { getDxExportRows } from '../utility/devextremeGridInstance'

const TransactionHeads = forwardRef(function TransactionHeads(props, ref) {
  const { t } = useTranslation()
  const gridRef = useRef(null)

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

  useImperativeHandle(
    ref,
    () => ({
      getExportRows: () => getDxExportRows(gridRef, gridData),
    }),
    [gridData],
  )

  const selectPosition = useCallback((e) => {
    let chosenHeadDocument = e.selectedRowsData
    // Communicate to parent component.
    props.selectHead(chosenHeadDocument[0])
  }, [])

  return (
    <div className='transcation-heads-dashboard'>
      <DataGrid
        ref={gridRef}
        className='devexpress-grid transaction-head'
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

        <Column dataField='DocumentType' caption={trHeader('Tip', t)} />
        <Column dataField='Status' caption={trHeader('Status', t)} />
        <Column dataField='Key' caption={trHeader('ERP ključ', t)} />
        <Column dataField='LinkKey' caption={trHeader('Nalog za transakcijo', t)} />
        <Column dataField='Receiver' caption={trHeader('Stranka', t)} />
        <Column dataField='Wharehouse' caption={trHeader('Skladišče', t)} />
        <Column dataField='Date' dataType='date' caption={trHeader('Datum', t)} />
        <Column dataField='ClerkName' caption={trHeader('Vnesel', t)} />
        <Column dataField='DateInserted' caption={trHeader('Datum vnosa', t)} />

        <Selection mode='single' />
      </DataGrid>
    </div>
  )
})

export default TransactionHeads
