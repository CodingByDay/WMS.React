import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function OrderPositions(props) { 



  let navigate = useNavigate();

    return ( 
        <div>
            <Table className="positions-table" type="position" class = "table_responsive_positions" childToParent = {props.childToParent} />
       </div>
    ); 

} 