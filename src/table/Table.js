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
    { label: "Naziv", accessor: "Name", type: "string", id: 3 },
    { label: "Odprto", accessor: "OpenQty", type: "double", id: 4 },
    { label: "Skupna količina", accessor: "FullQty", type: "double", id: 5 },
    
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