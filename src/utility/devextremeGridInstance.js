/**
 * Resolve DataGrid / dxDataGrid widget from devextreme-react ref.
 * In some versions `ref.instance` is a function; in others it is the widget itself.
 */
export function getDxDataGridInstance(gridRef) {
  const cmp = gridRef?.current
  if (!cmp) return null
  if (typeof cmp.instance === 'function') {
    return cmp.instance()
  }
  return cmp.instance ?? null
}
