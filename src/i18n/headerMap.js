/**
 * Maps legacy UI source strings (mostly Slovenian) to i18n keys.
 * Used for grid captions, settings table columns, and dropdown header rows.
 */
export const HEADER_SL_TO_KEY = {
  // English fallbacks used in some grids
  Name: "grid.itemName",

  Naziv: "grid.name",
  Opis: "grid.description",
  Vrednost: "grid.value",
  Id: "grid.id",
  Ident: "grid.ident",
  Subjekt: "grid.subject",
  "Črtna koda": "grid.barcode",
  "Število kosov": "grid.pieceCount",
  "Vrsta dokumenta": "grid.documentType",
  "Koda statusa": "grid.statusCode",
  "Naziv statusa": "grid.statusName",
  Viden: "grid.visible",
  Vrsta: "grid.type",
  Namen: "grid.purpose",
  Varianta: "grid.variant",
  Izdajno: "grid.issue",
  Prevzemno: "grid.receipt",
  Prevzeto: "grid.received",
  "Vrsta prevzema": "grid.receiptType",
  "Vrsta izdaje": "grid.issueType",
  "Status delno zakl.": "grid.statusPartial",
  "Status zaklj.": "grid.statusFinal",
  Šifra: "grid.code",
  Kupec: "grid.buyer",
  Dobavitelj: "grid.supplier",
  Skladišče: "grid.warehouse",
  Naslov: "grid.address",
  Pošta: "grid.postal",
  Država: "grid.country",
  Predpona: "grid.prefix",
  "Dav. št.": "grid.vatId",
  "Mat. št.": "grid.regNo",
  Aktiven: "grid.active",
  Zaloga: "grid.stockQty",
  "Brez naročila": "grid.withoutOrder",
  "Šifra identa": "grid.identCode",
  "EAN koda": "grid.ean",
  "Tip identa": "grid.identType",
  "1 enota": "grid.unit1",
  Pretvornik: "grid.converter",
  "2 enota": "grid.unit2",
  "Tip št.": "grid.numberType",
  Višina: "grid.height",
  Širina: "grid.width",
  Globina: "grid.depth",
  Teža: "grid.weight",
  Bruto: "grid.gross",
  "En. dolžine": "grid.lengthUnit",
  "En. teže": "grid.weightUnit",
  Vidno: "grid.visibleShort",

  // Listing / order heads
  Prejemnik: "grid.consignee",
  "Rok dobave": "grid.deliveryDeadline",
  Status: "grid.status",
  Ključ: "grid.key",
  Sprejemnik: "grid.receiver",
  "Št. artikla": "grid.articleNo",
  Številka: "grid.number",
  Odprto: "grid.open",
  Naročeno: "grid.ordered",

  // Transactions
  "ID transakcije": "grid.transactionId",
  "Ključ transakcije": "grid.transactionKey",
  "Številka pozicije": "grid.positionNo",
  "Serijska številka": "grid.serialNo",
  "Naziv identa": "grid.identName",
  "WMS količina": "grid.wmsQty",
  "ERP ključ": "grid.erpKey",
  "Nalog za transakcijo": "grid.workOrder",
  Stranka: "grid.customer",
  Datum: "grid.date",
  Vnesel: "grid.enteredBy",
  "Datum vnosa": "grid.entryDate",

  // Stock
  Količina: "grid.quantity",
  Lokacija: "grid.location",
  Tip: "grid.tip",

  Ime: "users.firstName",
  Priimek: "users.lastName",
  "UP ime": "users.upName",
  Geslo: "users.password",
  Dejanja: "users.actions",
  Posodobi: "users.update",
  Pobriši: "users.deleteRow",

  // Import column labels (subjects / idents / orders)
  "Poštna številka": "import.postalCode",
  "Davčna številka": "import.vatFull",
  "Matična številka": "import.regFull",
  Vpisal: "import.enteredVerb",
  "Primarna enota": "import.primaryUnit",
  Sekundardna: "import.secondaryUnit",
  "Tip serijske številke": "import.serialNoType",
  "Ali je aktiven": "import.isActiveQ",
  "Enota mere dolžine": "import.dimUnitLength",
  "Enota more teže": "import.dimUnitWeight",
  "Številka naročila": "grid.orderNumber",
  Pozicija: "import.lineNo",
  Opomba: "import.note",
  Upisal: "import.wrote",
  "Dokument 1": "import.doc1",
  "Datum dokumenta 1": "import.doc1Date",
  Izdajatelj: "import.issuer",
  "Povezovalni dokument": "import.linkDocKey",
  "Uporabnik ki je vpisal": "import.userInserted",
  Čas: "import.timeCol",
  Spremenil: "import.modifiedBy",
  "Čas spremembe": "import.modifiedAt",
  "Teža bruto": "import.weightBrutto",
};

/**
 * @param {string|unknown} text - Column header or label from legacy config
 * @param {(key: string) => string} t - i18next t()
 */
export function trHeader(text, t) {
  if (text == null || typeof text !== "string") return text;
  const key = HEADER_SL_TO_KEY[text];
  return key ? t(key) : text;
}

/** Translate an array of header labels (e.g. columnOrderTranslation). */
export function trHeaders(arr, t) {
  if (!Array.isArray(arr)) return arr;
  return arr.map((item) => trHeader(item, t));
}
