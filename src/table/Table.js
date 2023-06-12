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
  { label: "Dokument", accessor: "Type", type: "StringValue"},
  { label: "Status", accessor: "Status", type: "StringValue"},
  { label: "P.D", accessor: "DocumentType", type: "DoubleValue"},
  { label: "ERP ključ", accessor: "Key", type: "StringValue"},
  { label: "Nalog za transakcijo", accessor: "LinkKey", type: "StringValue" },
  { label: "Stranka", accessor: "Receiver", type: "StringValue" },
  { label: "Skladišče", accessor: "WharehouseName", type: "StringValue" },
  { label: "Datum", accessor: "Date", type: "DateTimeValue" },
  { label: "Vnesel", accessor: "ClerkName", type: "StringValue" },
  { label: "Datum vnosa", accessor: "DateInserted", type: "DateTimeValue" },
  { label: "Spremenil", accessor: "ClerkChangedName", type: "StringValue" },
  { label: "Datum spremembe", accessor: "DateChanged", type: "DateTimeValue" },

  
]

const columnsTransactionPosition = [

  { label: "ID transakcije", accessor: "HeadID", type: "IntValue" },
  { label: "Ključ transakcije", accessor: "Key", type: "StringValue" },
  { label: "Pozicija transakcije", accessor: "No", type: "IntValue" },
  { label: "Ident", accessor: "Ident", type: "StringValue" },
  { label: "Naziv identa", accessor: "IdentName", type: "StringValue" },
  { label: "WMS količina", accessor: "Qty", type: "DoubleValue" }, 
]


const columnsLocationComponent = [
  { label: "Lokacija", accessor: "Location", type: "StringValue" },
  { label: "Količina", accessor: "Quantity", type: "DoubleValue" },
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
      
    } else if (props.type === "locationComponent") { 

      columns = columnsLocationComponent;

    }




 return (

    <div className={props.class}>
        <table className="table notStripped" id={props.passID}>
        <TableHead className="orders" columns={columns} />
        <TableBody table = {props.table} returnRow = {props.childToParent} className = "positions" columns={columns} sort = {props.sort} tableData={props.data}  />
      </table>
   </div>

 );
};

export default Table;