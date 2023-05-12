import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function OrderHeadsListing() { 

  let navigate = useNavigate();

  
    return ( 
        <div>
         <Table className="orders_table" type = "order" class = "table_responsive_order"/> 

       </div>
    ); 
} 