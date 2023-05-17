import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';


export default function TransactionHeaderButtons(props) { 

    let navigate = useNavigate();
    return ( 
        <div>

        <div className='buttonsHeaderOuter'>
        <div className='buttonsHeader'>
             <button className="btn btn-primary">Prenesi</button>
             <button className="btn btn-primary">Storniraj</button>
             <button className="btn btn-primary">Izbriši</button>
             <button className="btn btn-primary">Popravi</button>
             <button className="btn btn-primary">Dodaj</button>
             <button className="btn btn-primary">Združi transakciju</button>
        </div>
        </div>

       </div>
    ); 

} 