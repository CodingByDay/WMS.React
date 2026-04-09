import 'devextreme/dist/css/dx.light.css'
import {
  DataGrid,
  Column,
  FilterRow,
  Selection,
} from 'devextreme-react/data-grid'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { useTranslation } from 'react-i18next'
import { trHeader } from '../i18n/headerMap'
import { getDxDataGridInstance, getDxExportRows } from '../utility/devextremeGridInstance'
import { toLocalDateAtMidnight } from '../utility/listingOrderUtils'

const OrderHeadsListing = forwardRef(function OrderHeadsListing (props, ref) {
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
        /** DevExtreme requires unique keyExpr; SQL view often repeats the same acKey per row. */
        const rowId = `${Key}::${index}`
        return {
          rowId,
          Key,
          Warehouse: row.acWarehouse,
          Consignee: row.acConsignee,
          DeliveryDeadline: toLocalDateAtMidnight(row.adDeliveryDeadline),
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
          properties.rowId = `${properties.Key}::legacy-${index}`
          const deadlineRaw =
            properties.adDeliveryDeadline ??
            properties.DeliveryDeadline ??
            null
          if (deadlineRaw != null && deadlineRaw !== '') {
            properties.DeliveryDeadline =
              toLocalDateAtMidnight(deadlineRaw)
          }
          return properties
        } catch (error) {
          return null
        }
      }).filter((item) => item !== null)
    }

    return out
  }, [props.data])

  useImperativeHandle(
    ref,
    () => ({
      getExportRows: () => getDxExportRows(gridRef, gridData),
    }),
    [gridData],
  )

  const selectHeader = useCallback((e) => {
    const chosenHeadDocument = e.selectedRowsData
    if (chosenHeadDocument && chosenHeadDocument[0]) {
      communicate('head', 'select', chosenHeadDocument[0])
    }
  }, [communicate])

  useEffect(() => {
    if (!focusOrderKey || !gridData.length) return undefined

    const matches = gridData.filter(
      (r) => String(r.Key) === String(focusOrderKey),
    )
    const row =
      matches.length > 0 ? matches[matches.length - 1] : null
    if (!row) {
      onFocusOrderHandled?.()
      return undefined
    }

    const timer = window.setTimeout(() => {
      const grid = getDxDataGridInstance(gridRef)
      if (!grid) {
        onFocusOrderHandled?.()
        return
      }
      try {
        grid.deselectAll()
        grid.option('focusedRowKey', row.rowId)
        if (typeof grid.navigateToRow === 'function') {
          Promise.resolve(grid.navigateToRow(row.rowId))
            .catch(() => undefined)
            .finally(() => {
              try {
                grid.selectRows([row.rowId], true)
              } catch {
                /* ignore */
              }
            })
        } else {
          grid.selectRows([row.rowId], true)
        }
      } finally {
        // If navigateToRow is async, we still clear the hint immediately.
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
        keyExpr='rowId'
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
          dataType='date'
          caption={trHeader('Rok dobave', t)}
          editorOptions={{ type: 'date', showClearButton: true }}
        />
        <Column dataField='DocumentType' caption={trHeader('Vrsta dokumenta', t)} />
        <Column dataField='acStatus' caption={trHeader('Status', t)} />
        <Column dataField='Key' caption={trHeader('Ključ', t)} />
        <Column dataField='Receiver' caption={trHeader('Sprejemnik', t)} />
        <Selection mode='single' />
      </DataGrid>
    </div>
  )
})

export default OrderHeadsListing
