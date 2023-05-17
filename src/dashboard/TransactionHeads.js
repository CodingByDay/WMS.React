import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function TransactionHeads(props) { 


  let navigate = useNavigate();

    return ( 
        <div>
                  <Table className="orders_table" sort = {props.sort} type = "transaction" class = "table_responsive_transaction" passID = "transactions-table" data = {props.data} /> 

       </div>
    ); 

} 