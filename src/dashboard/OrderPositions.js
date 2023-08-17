import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function OrderPositions(props) { 


  let navigate = useNavigate();

    return ( 
        <div>
            <Table table = "positions" className="positions-table" type="position" class = "table_responsive_pos" data = {props.data} childToParent = {props.childToParent} />
       </div>
    ); 

} 