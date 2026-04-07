import 'devextreme/dist/css/dx.light.css'
import {
  DataGrid,
  Column,
  FilterRow,
  Selection,
} from 'devextreme-react/data-grid'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { trHeader } from '../i18n/headerMap'

export default function OrderHeadsListing (props) {
  const { t } = useTranslation()
  const { communicate, focusOrderKey, onFocusOrderHandled } = props
  const gridRef = useRef(null)

  const gridData = useMemo(() => {
    let out = []

    if (props.data?.rows && Array.isArray(props.data.rows)) {
      out = props.data.rows.map((row, index) => {
        const keyBase = row.acKey
        const Key =
          keyBase != null && keyBase !== ''
            ? String(keyBase)
            : `__row-${index}`
        return {
          Key,
          Warehouse: row.acWarehouse,
          Consignee: row.acConsignee,
          DeliveryDeadline: row.adDeliveryDeadline,
          DocumentType: row.acDocType,
          acStatus: row.acStatus ?? row.AcStatus ?? '',
          Receiver: row.acReceiver,
        }
      })
    } else if (props.data && Array.isArray(props.data.Items)) {
      out = props.data.Items.map((item, index) => {
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
          const keyRaw = properties.Key || properties.acKey
          properties.Key =
            keyRaw != null && keyRaw !== ''
              ? String(keyRaw)
              : `__legacy-${index}`
          return properties
        } catch (error) {
          return null
        }
      }).filter((item) => item !== null)
    }

    return out
  }, [props.data])

  const selectHeader = useCallback((e) => {
    const chosenHeadDocument = e.selectedRowsData
    if (chosenHeadDocument && chosenHeadDocument[0]) {
      communicate('head', 'select', chosenHeadDocument[0])
    }
  }, [communicate])

  useEffect(() => {
    if (!focusOrderKey || !gridData.length) return undefined

    const row = gridData.find((r) => String(r.Key) === String(focusOrderKey))
    if (!row) {
      onFocusOrderHandled?.()
      return undefined
    }

    const timer = window.setTimeout(() => {
      const grid = gridRef.current?.instance?.()
      if (!grid) {
        onFocusOrderHandled?.()
        return
      }
      try {
        grid.deselectAll()
        grid.selectRows([row.Key], true)
        grid.option('focusedRowKey', row.Key)
        if (typeof grid.navigateToRow === 'function') {
          grid.navigateToRow(row.Key)
        }
      } finally {
        onFocusOrderHandled?.()
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [focusOrderKey, gridData, onFocusOrderHandled])

  return (
    <div>
      <DataGrid
        ref={gridRef}
        className='devexpress-grid order'
        dataSource={gridData}
        keyExpr='Key'
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
