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


             <span className='actions smallerr' onClick={finishDocument}>             
             <p>Prenesi</p>            
             <MdDownload />
             </span>


             <span className='actions smallerr'>
             <p>Storniraj</p>      
             <MdOutlineCancel />
             </span>


             <span className='actions smallerr'onClick={deleteHeadDocument}>
             <p>Izbriši</p>
             <MdDeleteOutline />
             </span>


            {/* <span className='actions smallerr' onClick={toggleAddPosition} id=''>          
             <p>Dodaj</p>
             <MdAdd />
             </span> */} 

        </div>
        </div>

       </div>
    ); 

} 