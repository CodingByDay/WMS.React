import 'devextreme/dist/css/dx.light.css'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
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
import { getDxDataGridInstance, getDxExportRows } from '../utility/devextremeGridInstance'

const OrderPositions = forwardRef(function OrderPositions (props, ref) {
  const { t } = useTranslation()
  const { communicate, focusHint, onFocusPositionHandled } = props
  const gridRef = useRef(null)

  const gridData = useMemo(() => {
    if (!props.data || !Array.isArray(props.data.Items)) return []
    return props.data.Items.map((item, index) => {
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
        const rawId = properties.ItemID
        const itemID =
          rawId !== '' && rawId != null ? Number(rawId) : NaN
        const ItemID = Number.isFinite(itemID) ? itemID : index
        return { ...properties, ItemID, id: index + 1 }
      } catch (error) {
        return null
      }
    }).filter((item) => item !== null)
  }, [props.data])

  useImperativeHandle(
    ref,
    () => ({
      getExportRows: () => getDxExportRows(gridRef, gridData),
    }),
    [gridData],
  )

  const selectPosition = useCallback(
    (e) => {
      const chosen = e.selectedRowsData
      if (chosen && chosen[0]) {
        communicate('position', 'select', chosen[0])
      }
    },
    [communicate],
  )

  useEffect(() => {
    if (!focusHint || !gridData.length) return undefined

    const { itemId, ident, qty } = focusHint
    let row = null
    if (itemId) {
      row = gridData.find((r) => String(r.ItemID) === String(itemId))
    }
    if (!row && ident) {
      const matches = gridData.filter((r) => String(r.Ident) === String(ident))
      if (matches.length) {
        if (qty != null && qty !== '') {
          const byQty = matches.filter(
            (r) =>
              String(r.FullQty) === String(qty) ||
              String(r.OpenQty) === String(qty),
          )
          row = byQty.length
            ? byQty[byQty.length - 1]
            : matches[matches.length - 1]
        } else {
          row = matches[matches.length - 1]
        }
      }
    }
    if (!row) {
      onFocusPositionHandled?.()
      return undefined
    }

    const timer = window.setTimeout(() => {
      const grid = getDxDataGridInstance(gridRef)
      if (!grid) {
        onFocusPositionHandled?.()
        return
      }
      try {
        grid.deselectAll()
        grid.selectRows([row.ItemID], true)
        grid.option('focusedRowKey', row.ItemID)
        if (typeof grid.navigateToRow === 'function') {
          grid.navigateToRow(row.ItemID)
        }
        communicate('position', 'select', row)
      } finally {
        onFocusPositionHandled?.()
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [focusHint, gridData, onFocusPositionHandled, communicate])

  return (
    <div>
      <DataGrid
        ref={gridRef}
        className='devexpress-grid order-position'
        dataSource={gridData}
        keyExpr='ItemID'
        onSelectionChanged={selectPosition}
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
})

export default OrderPositions
