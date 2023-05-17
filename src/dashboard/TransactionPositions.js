import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function TransactionPositions(props) { 


  let navigate = useNavigate();

    return ( 
        <div>
            <Table className="positions-table" type="positionsTransaction" class = "table_responsive_positions"  />

       </div>
    ); 

} 