import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { useEffect, useState, useMemo } from "react";


export default function TransactionHeads(props) { 


  let navigate = useNavigate();


  

    return ( 
        <div>
            <Table  className="orders_table" type = "transaction" class = "table_responsive_transaction" data = {props.data} childToParent = {props.childToParent} sort = {props.filters} passID = "transactions-table" table = "heads"/> 
        </div>
    ); 

} 