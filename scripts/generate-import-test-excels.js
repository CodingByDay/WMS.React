/**
 * Generates sample .xlsx files for /import-idents, /import-subjects, and /import-orders.
 * Headers use SQL parameter names (e.g. acIdent) so column locking maps 1:1 in ImportWizzard.
 *
 * Run from repo root: node scripts/generate-import-test-excels.js
 */
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "test-data", "import");

const identsHeaders = [
  "acIdent",
  "acName",
  "acCode",
  "acSetOfItem",
  "acSupplier",
  "acUM",
  "anUMToUM2",
  "acUM2",
  "acSerialNo",
  "acActive",
  "anDimHeight",
  "anDimWidth",
  "anDimDepth",
  "anDimWeight",
  "anDimWeightBrutto",
  "acUMDim1",
  "acUMDim2",
  "anUserIns",
  "uWMS",
];

const identsRows = [
  [
    "WMS-TEST-ID-001",
    "Test artikel A",
    "5901234123457",
    "200",
    "",
    "kos",
    "1",
    "",
    "N",
    "T",
    "10",
    "20",
    "30",
    "100",
    "110",
    "m",
    "kg",
    "0",
    "1",
  ],
  [
    "WMS-TEST-ID-002",
    "Test artikel B",
    "",
    "200",
    "",
    "kos",
    "1",
    "",
    "N",
    "T",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "0",
    "1",
  ],
];

const subjectsHeaders = [
  "acSubject",
  "acBuyer",
  "acSupplier",
  "acWarehouse",
  "acName2",
  "acAddress",
  "acPost",
  "acCountry",
  "acVATCodePrefix",
  "acCode",
  "acRegNo",
  "acActive",
  "anUserIns",
  "uWMSStock",
  "uWMS",
  "uWMSSubj",
];

const subjectsRows = [
  [
    "WMS-TEST-SUBJ-001",
    "T",
    "F",
    "F",
    "Test partner d.o.o.",
    "Testna ulica 1",
    "1000",
    "SI",
    "SI",
    "12345678",
    "1234567",
    "T",
    "0",
    "0",
    "1",
    "1",
  ],
  [
    "WMS-TEST-SUBJ-002",
    "F",
    "T",
    "F",
    "Test dobavitelj",
    "",
    "",
    "",
    "",
    "",
    "",
    "T",
    "0",
    "0",
    "1",
    "1",
  ],
];

const orderHeadHeaders = [
  "acType",
  "acDocType",
  "adDate",
  "acKey",
  "acDoc1",
  "adDatedoc1",
  "acReceiver",
  "acIssuer",
  "acWarehouse",
  "acStatus",
  "acNote",
  "acLnkKey",
  "anUserIns",
  "adTimeIns",
  "anUserChg",
  "adTimeChg",
];

const orderHeadRows = [
  [
    "P",
    "NAR",
    "2026-04-09",
    "WMS-TEST-ORD-HEAD-001",
    "EXT-DOC-1001",
    "2026-04-09",
    "WMS-TEST-SUBJ-001",
    "WMS-TEST-SUBJ-002",
    "01",
    "N",
    "Test import glava",
    "",
    "1",
    "2026-04-09 10:00:00",
    "",
    "",
  ],
];

const orderPosHeaders = [
  "acKey",
  "anNo",
  "acIdent",
  "acSerialNo",
  "anQty",
  "acNote",
  "anUserIns",
  "adTimeIns",
];

const orderPosRows = [
  [
    "WMS-TEST-ORD-HEAD-001",
    "1",
    "WMS-TEST-ID-001",
    "",
    "10",
    "Pozicija 1",
    "1",
    "2026-04-09 10:05:00",
  ],
  [
    "WMS-TEST-ORD-HEAD-001",
    "2",
    "WMS-TEST-ID-002",
    "",
    "5",
    "",
    "1",
    "2026-04-09 10:05:00",
  ],
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeAoa(filename, sheetName, aoa) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  const fp = path.join(outDir, filename);
  XLSX.writeFile(wb, fp);
  console.log("Wrote", fp);
}

function writeOrdersWorkbook() {
  const wb = XLSX.utils.book_new();
  const wsHead = XLSX.utils.aoa_to_sheet([orderHeadHeaders, ...orderHeadRows]);
  const wsPos = XLSX.utils.aoa_to_sheet([orderPosHeaders, ...orderPosRows]);
  XLSX.utils.book_append_sheet(wb, wsHead, "OrderHead");
  XLSX.utils.book_append_sheet(wb, wsPos, "OrderPositions");
  const fp = path.join(outDir, "import-test-orders.xlsx");
  XLSX.writeFile(wb, fp);
  console.log("Wrote", fp, "(sheets: OrderHead, OrderPositions)");
}

function main() {
  ensureDir(outDir);
  writeAoa("import-test-idents.xlsx", "Idents", [identsHeaders, ...identsRows]);
  writeAoa(
    "import-test-subjects.xlsx",
    "Subjects",
    [subjectsHeaders, ...subjectsRows],
  );
  writeOrdersWorkbook();
  console.log("\nUse /import-idents with import-test-idents.xlsx");
  console.log("Use /import-subjects with import-test-subjects.xlsx");
  console.log(
    "Use /import-orders: choose Glava → sheet OrderHead; choose Pozicije → sheet OrderPositions",
  );
}

main();
