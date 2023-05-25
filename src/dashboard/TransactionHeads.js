import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function TransactionHeads(props) { 


  let navigate = useNavigate();


  

    return ( 
        <div>
            <Table className="orders_table" type = "transaction" class = "table_responsive_transaction" data = {props.data} childToParent = {props.childToParent} sort = {props.filters} passID = "transactions-table"  /> 
        </div>
    ); 

} 