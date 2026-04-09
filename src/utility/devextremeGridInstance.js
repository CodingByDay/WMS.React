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

/**
 * Row objects currently visible in the grid (respects filter/sort). Falls back if API missing.
 * With paging, this is only the current page — use {@link getDxExportRows} for export.
 */
export function getDxVisibleRowData(gridRef, fallbackRows = []) {
  const grid = getDxDataGridInstance(gridRef)
  if (!grid) return fallbackRows
  try {
    if (typeof grid.getVisibleRows === 'function') {
      const vr = grid.getVisibleRows()
      if (Array.isArray(vr) && vr.length > 0) {
        const out = vr.map((r) => r?.data).filter(Boolean)
        if (out.length > 0) return out
      }
    }
  } catch {
    /* ignore */
  }
  return fallbackRows
}

/**
 * All row objects for the current grid filter/sort across every page (client-side store).
 * Same approach as DevExpress “get all filtered data” example: store.load + getCombinedFilter.
 * @param {object} gridRef React ref to devextreme-react DataGrid
 * @param {object[]} fallbackRows
 * @returns {Promise<object[]>}
 */
export function getDxExportRows(gridRef, fallbackRows = []) {
  const fallback = Array.isArray(fallbackRows) ? fallbackRows : []
  const grid = getDxDataGridInstance(gridRef)

  if (!grid || typeof grid.getDataSource !== 'function') {
    return Promise.resolve(fallback)
  }

  try {
    const dataSource = grid.getDataSource()
    if (!dataSource || typeof dataSource.store !== 'function') {
      return Promise.resolve(getDxVisibleRowData(gridRef, fallback))
    }

    const store = dataSource.store()
    if (!store || typeof store.load !== 'function') {
      return Promise.resolve(getDxVisibleRowData(gridRef, fallback))
    }

    const filterExpr =
      typeof grid.getCombinedFilter === 'function'
        ? grid.getCombinedFilter(true)
        : typeof dataSource.filter === 'function'
          ? dataSource.filter()
          : null

    const loadOptions =
      typeof dataSource.loadOptions === 'function'
        ? dataSource.loadOptions()
        : {}

    const loadResult = store.load({
      filter: filterExpr,
      sort: loadOptions.sort,
      group: loadOptions.group,
    })

    const normalize = (result) => {
      if (Array.isArray(result)) return result
      if (result && Array.isArray(result.data)) return result.data
      return getDxVisibleRowData(gridRef, fallback)
    }

    if (loadResult && typeof loadResult.then === 'function') {
      return loadResult
        .then(normalize)
        .catch(() => getDxVisibleRowData(gridRef, fallback))
    }

    return Promise.resolve(normalize(loadResult))
  } catch {
    return Promise.resolve(getDxVisibleRowData(gridRef, fallback))
  }
}
