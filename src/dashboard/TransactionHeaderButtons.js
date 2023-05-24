import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { MdDownload, MdOutlineCancel, MdDeleteOutline, MdEdit, MdAdd, MdOutlineMerge, MdOutlineKey, MdOutlineQrCode} from "react-icons/md";

export default function TransactionHeaderButtons(props) { 

    
    function toggleAddPosition() {
        props.reactToFront({type: 'transaction', action: 'add', table: 'header'});
    }



    let navigate = useNavigate();
    return ( 
        <div>

        <div className='buttonsHeaderOuter'>
        <div className='buttonsHeader'>
             <button className="btn btn-primary">Prenesi
             
             
             
             <MdDownload />
             </button>
             <button className="btn btn-primary">Storniraj
             
             
             <MdOutlineCancel />

             </button>
             <button className="btn btn-primary">Izbriši
             
             <MdDeleteOutline />

             </button>
             <button className="btn btn-primary">Popravi
             
             <MdEdit />

             </button>
             <button className="btn btn-primary" onClick={toggleAddPosition} id=''>Dodaj
             
             
             <MdAdd />

             </button>

        </div>
        </div>

       </div>
    ); 

} 