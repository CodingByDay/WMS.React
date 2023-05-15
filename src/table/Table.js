import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useState } from "react";
import tableData1 from "./tableData1.json";
const Table = (props) => {

  const [tableData, setTableData] = useState(tableData1);




 const columnsOrder = [
  { label: "Sladišče", accessor: "Warehouse", type: "string", id: 1},
  { label: "Prejemnik", accessor: "Consignee", type: "string", id: 0},
  { label: "Rok dobave", accessor: "DeliveryDeadline", type: "date", id: 6},
  { label: "Tip dokumenta", accessor: "DocumentType", type: "string", id: 7},
  { label: "Ključ", accessor: "Key", type: "string", id: 8},
  { label: "Sprejemnik", accessor: "Receiver", type: "string", id: 14}
 ];



const columnsPositions = [
    { label: "Ident", accessor: "Ident", type: "string", id: 2 },
    { label: "Alt", accessor: "alt", type: "string", id: 1 },
    { label: "Opis", accessor: "description", type: "string", id: 1 },
    { label: "U/M", accessor: "um", type: "string", id: 1 },
    { label: "Količina", accessor: "quantity", type: "string", id: 1 },
    { label: "Cena za enoto", accessor: "priceunit", type: "string", id: 1 },
    { label: "D1 %", accessor: "d1", type: "string", id: 1 },
    { label: "D2 %", accessor: "d2", type: "string", id: 1 },
    { label: "SD %", accessor: "d3", type: "string", id: 1 },
    { label: "Popust", accessor: "discount", type: "string", id: 1 },
    { label: "Vrednost", accessor: "value", type: "string", id: 1 },
    { label: "VAT", accessor: "vat", type: "string", id: 1 },
    { label: "Dolgovani znesek", accessor: "dueamount", type: "string", id: 1 },
    { label: "Odposlano", accessor: "sent", type: "string", id: 1 },
    { label: "Paketi", accessor: "packages", type: "string", id: 1 },
]


    let columns;

    if (props.type === "order") {

      columns = columnsOrder;

    } else {

      columns = columnsPositions;

    }
    

 return (

    <div className={props.class}>

    <table className="table" id={props.passID}>
    <TableHead className="orders" columns={columns} />
    <TableBody returnRow = {props.childToParent} className = "positions" columns={columns} tableData={props.data}  />
   </table>
   </div>

 );
};

export default Table;