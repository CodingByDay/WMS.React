import Swal from 'sweetalert2'

function escapeHtml(text) {
  if (text == null) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatPropertySample(p) {
  if (!p) return ''
  if (p.StringValue !== undefined && p.StringValue !== '')
    return String(p.StringValue)
  if (p.IntValue !== undefined && p.IntValue !== '') return String(p.IntValue)
  if (p.DoubleValue !== undefined && p.DoubleValue !== '')
    return String(p.DoubleValue)
  if (p.DateTimeValue !== undefined && p.DateTimeValue !== '')
    return String(p.DateTimeValue)
  if (p.BoolValue !== undefined) return String(p.BoolValue)
  return ''
}

/**
 * Collects Name keys from listing (ooa) API: Items[].Properties.Items[].
 * - names: sorted union of all property names across rows
 * - samples: values from the first row only (by field name)
 */
export function collectOoaListingFieldInfo(apiResponse) {
  const names = new Set()
  const samples = {}

  if (!apiResponse?.Items || !Array.isArray(apiResponse.Items)) {
    return { names: [], samples: {}, rowCount: 0 }
  }

  const firstProps = apiResponse.Items[0]?.Properties?.Items
  if (Array.isArray(firstProps)) {
    for (const p of firstProps) {
      if (p?.Name) samples[p.Name] = formatPropertySample(p)
    }
  }

  for (const item of apiResponse.Items) {
    const props = item?.Properties?.Items
    if (!Array.isArray(props)) continue
    for (const p of props) {
      if (p?.Name) names.add(p.Name)
    }
  }

  return {
    names: [...names].sort((a, b) => a.localeCompare(b)),
    samples,
    rowCount: apiResponse.Items.length,
  }
}

/**
 * Popup when listing data loads:
 * - default: once per browser session (tab)
 * - ?debugFields=1 : every load
 * - ?debugFields=0 : never
 */
export function maybeShowListingApiFieldsPopup(apiResponse) {
  const param = new URLSearchParams(window.location.search).get('debugFields')
  if (param === '0') return
  const everyLoad = param === '1'
  if (!everyLoad) {
    if (sessionStorage.getItem('wms_listing_api_fields_shown') === '1') return
    sessionStorage.setItem('wms_listing_api_fields_shown', '1')
  }

  const { names, samples, rowCount } = collectOoaListingFieldInfo(apiResponse)

  if (names.length === 0) {
    Swal.fire({
      title: 'Listing API — polja',
      html: `<p style="text-align:left">Ni vrstic ali odziv nima pričakovane oblike <code>Items[].Properties.Items[]</code>.</p>`,
      width: 640,
      confirmButtonText: 'V redu',
    })
    return
  }

  const rows = names
    .map(
      (name) =>
        `<tr><td style="font-family:monospace;padding:4px 8px;vertical-align:top;border-bottom:1px solid #eee">${escapeHtml(name)}</td><td style="padding:4px 8px;vertical-align:top;border-bottom:1px solid #eee;word-break:break-word">${escapeHtml(samples[name] !== undefined && samples[name] !== '' ? samples[name] : '—')}</td></tr>`,
    )
    .join('')

  const hint = `<p style="font-size:12px;color:#666;margin-bottom:0;text-align:left">Privzeto: enkrat na zavihek. Ob vsakem nalaganju: <code>?debugFields=1</code>. Izklopi: <code>?debugFields=0</code> ali odstrani klic v <code>Listing.js</code>.</p>`

  Swal.fire({
    title: 'Polja API-ja (listing, table=ooa)',
    html: `<p style="text-align:left;margin-top:0">Število vrstic: <strong>${rowCount}</strong>. Spodaj so imena polj (<code>Name</code>) in vzorec iz <strong>prve</strong> vrstice (če obstaja).</p><div style="max-height:55vh;overflow:auto;text-align:left"><table style="width:100%;border-collapse:collapse;font-size:13px"><thead><tr><th style="text-align:left;padding:8px;background:#f5f5f5">Ime polja</th><th style="text-align:left;padding:8px;background:#f5f5f5">Vzorec (1. vrstica)</th></tr></thead><tbody>${rows}</tbody></table></div>${hint}`,
    width: 720,
    confirmButtonText: 'V redu',
  })
}
