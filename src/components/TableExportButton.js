import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdFileDownload, MdGridOn, MdNotes } from "react-icons/md";
import {
  downloadTableAsCsv,
  downloadTableAsXlsx,
  sanitizeExportBaseName,
} from "../utility/tableExportCore";

/**
 * @param {object} props
 * @param {string} props.fileBaseName
 * @param {{ key: string, header: string }[]} props.columnDefs
 * @param {object[]=} props.rows Static rows (optional if getRows provided)
 * @param {(() => object[] | Promise<object[]>)=} props.getRows Filtered rows for export (may be async)
 * @param {string=} props.className
 */
export default function TableExportButton({
  fileBaseName,
  columnDefs,
  rows: rowsProp,
  getRows,
  className = "",
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(() => new Set());
  const getRowsRef = useRef(getRows);
  const rowsPropRef = useRef(rowsProp);
  getRowsRef.current = getRows;
  rowsPropRef.current = rowsProp;

  const [exportReady, setExportReady] = useState({ loading: false, rows: [] });

  const keysList = useMemo(
    () => (Array.isArray(columnDefs) ? columnDefs.map((c) => c.key) : []),
    [columnDefs],
  );

  useEffect(() => {
    if (!open) return;
    setSelectedKeys(new Set(keysList));
  }, [open, keysList]);

  const resolveRowsAsync = useCallback(async () => {
    try {
      if (typeof getRowsRef.current === "function") {
        const r = getRowsRef.current();
        const resolved = r != null && typeof r.then === "function" ? await r : r;
        return Array.isArray(resolved) ? resolved : [];
      }
      const rp = rowsPropRef.current;
      return Array.isArray(rp) ? rp : [];
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setExportReady({ loading: false, rows: [] });
      return undefined;
    }
    let cancelled = false;
    setExportReady({ loading: true, rows: [] });
    resolveRowsAsync().then((rows) => {
      if (!cancelled) setExportReady({ loading: false, rows });
    });
    return () => {
      cancelled = true;
    };
  }, [open, resolveRowsAsync]);

  const toggleKey = (key) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const selectAll = () => setSelectedKeys(new Set(keysList));
  const clearAll = () => setSelectedKeys(new Set());

  const doExport = async (kind) => {
    const rows = await resolveRowsAsync();
    if (!rows.length || selectedKeys.size === 0) return;
    const base = sanitizeExportBaseName(fileBaseName);
    if (kind === "csv") {
      downloadTableAsCsv(rows, columnDefs, selectedKeys, base);
    } else {
      downloadTableAsXlsx(rows, columnDefs, selectedKeys, base);
    }
    setOpen(false);
  };

  const disabled = keysList.length === 0;
  const rowCount = exportReady.rows.length;
  const canExport =
    !exportReady.loading && rowCount > 0 && selectedKeys.size > 0;

  return (
    <>
      <span
        className={`actions smallerr wms-table-export-trigger ${className}`.trim()}
        role="button"
        tabIndex={0}
        onClick={() => !disabled && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) setOpen(true);
          }
        }}
        style={disabled ? { opacity: 0.45, pointerEvents: "none" } : undefined}
        title={t("export.tooltip")}
      >
        <span className="wms-action-label">{t("export.export")}</span>
        <MdFileDownload className="wms-export-trigger-icon" aria-hidden />
      </span>

      {open ? (
        <div
          className="popup-overlay insert wms-export-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wms-export-title"
          aria-busy={exportReady.loading}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="popup-content insert wms-popup-shell wms-export-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="wms-export-dialog__header">
              <h2 id="wms-export-title" className="wms-export-dialog__title">
                {t("export.title")}
              </h2>
              <button
                type="button"
                className="wms-export-dialog__close"
                onClick={() => setOpen(false)}
                aria-label={t("common.close")}
              >
                ×
              </button>
            </header>

            <div className="wms-export-dialog__section-head">
              <span className="wms-export-dialog__hint">{t("export.chooseColumns")}</span>
              <div className="wms-export-dialog__bulk">
                <button type="button" className="wms-export-dialog__textbtn" onClick={selectAll}>
                  {t("export.selectAll")}
                </button>
                <span className="wms-export-dialog__bulk-sep" aria-hidden="true">
                  |
                </span>
                <button type="button" className="wms-export-dialog__textbtn" onClick={clearAll}>
                  {t("export.clearAll")}
                </button>
              </div>
            </div>

            <div className="wms-export-dialog__columns">
              {columnDefs.map((c) => (
                <label key={c.key} className="wms-export-dialog__row">
                  <input
                    type="checkbox"
                    className="wms-export-dialog__checkbox"
                    checked={selectedKeys.has(c.key)}
                    onChange={() => toggleKey(c.key)}
                  />
                  <span className="wms-export-dialog__row-label">{c.header || c.key}</span>
                </label>
              ))}
            </div>

            <p className="wms-export-dialog__hint wms-export-dialog__hint--format">
              {t("export.chooseFormat")}
            </p>

            <footer className="wms-export-dialog__footer">
              <button
                type="button"
                className="wms-export-dialog__btn wms-export-dialog__btn--quiet"
                onClick={() => setOpen(false)}
              >
                {t("common.close")}
              </button>
              <div className="wms-export-dialog__footer-actions">
                <button
                  type="button"
                  className="wms-export-dialog__btn wms-export-dialog__btn--primary"
                  onClick={() => void doExport("xlsx")}
                  disabled={!canExport}
                >
                  <MdGridOn className="wms-export-dialog__btn-icon" aria-hidden />
                  {t("export.excel")}
                </button>
                <button
                  type="button"
                  className="wms-export-dialog__btn wms-export-dialog__btn--secondary"
                  onClick={() => void doExport("csv")}
                  disabled={!canExport}
                >
                  <MdNotes className="wms-export-dialog__btn-icon" aria-hidden />
                  {t("export.csv")}
                </button>
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
