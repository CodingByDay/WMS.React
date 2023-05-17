import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function TransactionPositionsButtons(props) { 

    let navigate = useNavigate();
    return ( 
        
        <div>

        <div className='buttonsPositionsOuter'>

        <div className='buttonsPositions'>
             <button className="btn btn-primary">Dodaj</button>
             <button className="btn btn-primary">Ključ transakcije</button>
             <button className="btn btn-primary">Izbriši</button>
             <button className="btn btn-primary">Serijske številke</button>
             <button className="btn btn-primary">Menjave ser.</button>
        </div>


        </div>
       </div>
    ); 

} 