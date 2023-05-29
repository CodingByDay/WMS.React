import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function TransactionPositions(props) { 


  let navigate = useNavigate();

    return ( 
        <div>
            <Table table = "heads" className="positions-table" childToParent = {props.childToParent} data = {props.data} type="positionsTransaction" class = "table_responsive_positions_transactions"  />

       </div>
    ); 

} 