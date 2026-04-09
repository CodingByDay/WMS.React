import * as XLSX from "xlsx";

/**
 * @param {*} value
 * @returns {string}
 */
export function formatCellForExport(value) {
  if (value == null || value === "") return "";
  if (value instanceof Date) {
    return value.toISOString().slice(0, 19).replace("T", " ");
  }
  if (typeof value === "boolean") return value ? "1" : "0";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

/**
 * @param {string} name
 */
export function sanitizeExportBaseName(name) {
  const s = String(name || "export").trim() || "export";
  return s.replace(/[^a-zA-Z0-9-_]+/g, "_").slice(0, 80);
}

/**
 * @param {object[]} rows
 * @param {{ key: string, header: string }[]} columnDefs
 * @param {Set<string>|string[]} selectedKeys
 * @returns {{ headers: string[], body: string[][] }}
 */
export function buildExportMatrix(rows, columnDefs, selectedKeys) {
  const sel =
    selectedKeys instanceof Set
      ? selectedKeys
      : new Set(Array.isArray(selectedKeys) ? selectedKeys : []);
  const cols = columnDefs.filter((c) => c && c.key && sel.has(c.key));
  const headers = cols.map((c) => c.header || c.key);
  const body = (Array.isArray(rows) ? rows : []).map((row) =>
    cols.map((c) => formatCellForExport(row[c.key])),
  );
  return { headers, body };
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * @param {object[]} rows
 * @param {{ key: string, header: string }[]} columnDefs
 * @param {Set<string>} selectedKeys
 * @param {string} baseName without extension
 */
export function downloadTableAsCsv(rows, columnDefs, selectedKeys, baseName) {
  const { headers, body } = buildExportMatrix(rows, columnDefs, selectedKeys);
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = [headers.map(esc).join(",")];
  body.forEach((line) => lines.push(line.map(esc).join(",")));
  const blob = new Blob(["\ufeff", lines.join("\r\n")], {
    type: "text/csv;charset=utf-8;",
  });
  downloadBlob(blob, `${sanitizeExportBaseName(baseName)}.csv`);
}

/**
 * @param {object[]} rows
 * @param {{ key: string, header: string }[]} columnDefs
 * @param {Set<string>} selectedKeys
 * @param {string} baseName without extension
 */
export function downloadTableAsXlsx(rows, columnDefs, selectedKeys, baseName) {
  const sel =
    selectedKeys instanceof Set
      ? selectedKeys
      : new Set(Array.isArray(selectedKeys) ? selectedKeys : []);
  const cols = columnDefs.filter((c) => c && c.key && sel.has(c.key));
  const data = (Array.isArray(rows) ? rows : []).map((row) => {
    const o = {};
    cols.forEach((c) => {
      const h = c.header || c.key;
      o[h] = formatCellForExport(row[c.key]);
    });
    return o;
  });
  const ws = XLSX.utils.json_to_sheet(data.length ? data : [{}]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Export");
  XLSX.writeFile(wb, `${sanitizeExportBaseName(baseName)}.xlsx`);
}
