import { trHeader } from "../i18n/headerMap";

/** Column defs for listing order heads grid export (keys match DataGrid dataField). */
export function getOrderListingHeadExportColumns(t) {
  return [
    { key: "Warehouse", header: trHeader("Skladišče", t) },
    { key: "Consignee", header: trHeader("Prejemnik", t) },
    { key: "DeliveryDeadline", header: trHeader("Rok dobave", t) },
    { key: "DocumentType", header: trHeader("Vrsta dokumenta", t) },
    { key: "acStatus", header: trHeader("Status", t) },
    { key: "Key", header: trHeader("Ključ", t) },
    { key: "Receiver", header: trHeader("Sprejemnik", t) },
  ];
}

export function getOrderListingPositionsExportColumns(t) {
  return [
    { key: "Ident", header: trHeader("Ident", t) },
    { key: "Name", header: trHeader("Name", t) },
    { key: "No", header: trHeader("Št. artikla", t) },
    { key: "ItemID", header: trHeader("Številka", t) },
    { key: "OpenQty", header: trHeader("Odprto", t) },
    { key: "FullQty", header: trHeader("Naročeno", t) },
  ];
}

export function getTransactionHeadExportColumns(t) {
  return [
    { key: "DocumentType", header: trHeader("Tip", t) },
    { key: "Status", header: trHeader("Status", t) },
    { key: "Key", header: trHeader("ERP ključ", t) },
    { key: "LinkKey", header: trHeader("Nalog za transakcijo", t) },
    { key: "Receiver", header: trHeader("Stranka", t) },
    { key: "Wharehouse", header: trHeader("Skladišče", t) },
    { key: "Date", header: trHeader("Datum", t) },
    { key: "ClerkName", header: trHeader("Vnesel", t) },
    { key: "DateInserted", header: trHeader("Datum vnosa", t) },
  ];
}

export function getTransactionPositionsExportColumns(t) {
  return [
    { key: "HeadID", header: trHeader("ID transakcije", t) },
    { key: "LinkKey", header: trHeader("Ključ transakcije", t) },
    { key: "ItemID", header: trHeader("Številka pozicije", t) },
    { key: "SerialNo", header: trHeader("Serijska številka", t) },
    { key: "Ident", header: trHeader("Ident", t) },
    { key: "IdentName", header: trHeader("Naziv identa", t) },
    { key: "Qty", header: trHeader("WMS količina", t) },
  ];
}
