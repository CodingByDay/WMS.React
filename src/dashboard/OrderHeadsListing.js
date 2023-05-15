import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function OrderHeadsListing(props) { 


  let navigate = useNavigate();
    return ( 
        <div>

         <Table className="orders_table" childToParent = {props.childToParent} type = "order" class = "table_responsive_order" passID = "orders-table" data = {props.data} /> 

       </div>
    ); 
} 