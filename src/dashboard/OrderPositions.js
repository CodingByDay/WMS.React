import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function OrderPositions() { 



  let navigate = useNavigate();

    return ( 
        <div>
            <Table className="positions-table" type="position" class = "table_responsive_positions"/>
       </div>
    ); 

} 