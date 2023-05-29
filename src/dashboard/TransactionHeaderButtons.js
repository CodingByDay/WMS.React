import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { MdDownload, MdOutlineCancel, MdDeleteOutline, MdEdit, MdAdd, MdOutlineMerge, MdOutlineKey, MdOutlineQrCode} from "react-icons/md";

export default function TransactionHeaderButtons(props) { 

    
    function toggleAddPosition() {
        props.reactToFront({type: 'transaction', action: 'add', table: 'header'});
    }

    function deleteHeadDocument() {
        props.reactToFront({type: 'transaction', action: 'delete', table: 'header'});
    }

    function finishDocument() {
        props.reactToFront({type: 'transaction', action: 'finish', table: 'header'});
    }

    let navigate = useNavigate();
    return ( 
        <div>

        <div className='buttonsHeaderOuter'>
        <div className='buttonsHeader'>
             <button className="btn btn-primary" onClick={finishDocument}>Prenesi
             
             
             
             <MdDownload />
             </button>
             <button className="btn btn-primary">Storniraj
             
             
             <MdOutlineCancel />

             </button>
             <button className="btn btn-primary" onClick={deleteHeadDocument}>Izbriši
             
             <MdDeleteOutline />

             </button>

             <button className="btn btn-primary" onClick={toggleAddPosition} id=''>Dodaj
             
             
             <MdAdd />

             </button>

        </div>
        </div>

       </div>
    ); 

} 