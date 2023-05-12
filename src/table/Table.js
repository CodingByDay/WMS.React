import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useState } from "react";
import tableData1 from "./tableData1.json";
const Table = (props) => {





 const [tableData, setTableData] = useState(tableData1);

 const columnsOrder = [
  { label: "Sladišče", accessor: "warehouse" },
  { label: "Prejemnik", accessor: "consignee" },
  { label: "Rok dobave", accessor: "delivery_deadline" },
  { label: "Tip dokumenta", accessor: "document_type" },
  { label: "Ključ", accessor: "erp_key" },
  { label: "Sprejemnik", accessor: "receiver"}
 ];



const columnsPositions = [
    { label: "ID", accessor: "id" },
    { label: "Alt", accessor: "alt" },
    { label: "Opis", accessor: "description" },
    { label: "U/M", accessor: "um" },
    { label: "Količina", accessor: "quantity" },
    { label: "Cena za enoto", accessor: "priceunit" },
    { label: "D1 %", accessor: "d1" },
    { label: "D2 %", accessor: "d2" },
    { label: "SD %", accessor: "d3" },
    { label: "Popust", accessor: "discount" },
    { label: "Vrednost", accessor: "value" },
    { label: "VAT", accessor: "vat" },
    { label: "Dolgovani znesek", accessor: "dueamount" },
    { label: "Odposlano", accessor: "sent" },
    { label: "Paketi", accessor: "packages" },
]


    let columns;

    if (props.type === "order") {

      columns = columnsOrder;

    } else {

      columns = columnsPositions;

    }


 return (
  <>
    <div className={props.class}>
    <table className="table">
    <TableHead className="orders" columns={columns} />
    <TableBody className = "positions" columns={columns} tableData={tableData} />
   </table>
   </div>
  </>
 );
};

export default Table;