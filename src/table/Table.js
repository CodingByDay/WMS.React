import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useState } from "react";
import tableData1 from "./tableData1.json";




const Table = (props) => {

 const [tableData, setTableData] = useState(tableData1);

 const columnsOrder = [
  { label: "Skladišče", accessor: "Warehouse", type: "StringValue"},
  { label: "Prejemnik", accessor: "Consignee", type: "StringValue"},
  { label: "Rok dobave", accessor: "DeliveryDeadline", type: "DateTimeValue"},
  { label: "Tip dokumenta", accessor: "DocumentType", type: "StringValue"},
  { label: "Ključ", accessor: "Key", type: "StringValue"},
  { label: "Sprejemnik", accessor: "Receiver", type: "StringValue"}
 ];



const columnsPositions = [
    { label: "Ident", accessor: "Ident", type: "StringValue"},
    { label: "Naziv", accessor: "Name", type: "StringValue"},
    { label: "Odprto", accessor: "OpenQty", type: "DoubleValue"},
    { label: "Skupna količina", accessor: "FullQty", type: "DoubleValue"},
    
]

const columnsTransaction = [
  { label: "ID", accessor: "HeadID", type: "IntValue"},
  { label: "Tip transakcije", accessor: "DocumentType", type: "StringValue"},
  { label: "Status", accessor: "Status", type: "DoubleValue"},
  { label: "P.D", accessor: "P.D", type: "DoubleValue", id: 5 },
  { label: "ERP ključ", accessor: "erp", type: "DoubleValue"},
  { label: "Nalog za transakcijo", accessor: "transactionOrder", type: "DoubleValue" },
  { label: "Stranka", accessor: "Receiver", type: "StringValue" },
  { label: "Skladišče", accessor: "Wharehouse", type: "StringValue" },
  { label: "Datum", accessor: "date", type: "DoubleValue" },
  { label: "Vnesel", accessor: "ClerkName", type: "StringValue" },
  { label: "Datum vnosa", accessor: "DateInserted", type: "DateTimeValue" },
  { label: "Spremenil", accessor: "modified", type: "DoubleValue" },
  { label: "Datum spremembe", accessor: "dateModified", type: "DoubleValue" },

  
]

const columnsTransactionPosition = [

  { label: "ID transakcije", accessor: "HeadID", type: "StringValue" },
  { label: "Ključ transakcije", accessor: "Tip transakcije", type: "StringValue" },
  { label: "Pozicija transakcije", accessor: "LinkNo", type: "IntValue" },
  { label: "Ident", accessor: "P.D", type: "StringValue" },
  { label: "Naziv identa", accessor: "IdentName", type: "StringValue" },
  { label: "WMS količina", accessor: "Qty", type: "DoubleValue" },
  { label: "Odprta količina", accessor: "Qty", type: "DoubleValue" },
  { label: "Zaloga", accessor: "Qty", type: "DoubleValue" },
  
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