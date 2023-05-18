import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useState } from "react";
import tableData1 from "./tableData1.json";




const Table = (props) => {

 const [tableData, setTableData] = useState(tableData1);

 const columnsOrder = [
  { label: "Skladišče", accessor: "Warehouse", type: "string", id: 1},
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

const columnsTransaction = [
  { label: "ID", accessor: "ID", type: "string", id: 2 },
  { label: "Tip transakcije", accessor: "Tip transakcije", type: "string", id: 3 },
  { label: "Status", accessor: "Status", type: "double", id: 4 },
  { label: "P.D", accessor: "P.D", type: "double", id: 5 },
  { label: "ERP ključ", accessor: "erp", type: "double", id: 5 },
  { label: "Nalog za transakcijo", accessor: "transactionOrder", type: "double", id: 5 },
  { label: "Stranka", accessor: "client", type: "double", id: 5 },
  { label: "Skladišče", accessor: "warehouse", type: "double", id: 5 },
  { label: "Datum", accessor: "date", type: "double", id: 5 },
  { label: "Vnesel", accessor: "person", type: "double", id: 5 },
  { label: "Datum vnosa", accessor: "date", type: "double", id: 5 },
  { label: "Spremenil", accessor: "modified", type: "double", id: 5 },
  { label: "Datum spremembe", accessor: "dateModified", type: "double", id: 5 },

  
]

const columnsTransactionPosition = [
  { label: "ID transakcije", accessor: "ID", type: "string", id: 2 },
  { label: "Ključ transakcije", accessor: "Tip transakcije", type: "string", id: 3 },
  { label: "Pozicija transakcije", accessor: "Status", type: "double", id: 4 },
  { label: "Ident", accessor: "P.D", type: "double", id: 5 },
  { label: "Naziv identa", accessor: "erp", type: "double", id: 5 },
  { label: "WMS količina", accessor: "transactionOrder", type: "double", id: 5 },
  { label: "Odprta količina", accessor: "client", type: "double", id: 5 },
  { label: "Zaloga", accessor: "warehouse", type: "double", id: 5 },
  

  
]

    let columns;

    if (props.type === "order") {

      columns = columnsOrder;

    } else if(props.type === "position") {

      columns = columnsPositions;

    } else if(props.type === "transaction") { 

      columns = columnsTransaction;

    } else if (props.type === "positionsTransaction") {
      
      columns = columnsTransactionPosition;
    }




 return (

    <div className={props.class}>
    <table className="table" id={props.passID}>
    <TableHead className="orders" columns={columns} />
    <TableBody returnRow = {props.childToParent} className = "positions" columns={columns} sort = {props.sort} tableData={props.data}  />
   </table>
   </div>

 );
};

export default Table;