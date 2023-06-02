import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { MdDownload, MdOutlineCancel, MdDeleteOutline, MdEdit, MdAdd, MdOutlineMerge, MdOutlineKey, MdOutlineQrCode} from "react-icons/md";


export default function TransactionPositionsButtons(props) { 

    let navigate = useNavigate();

    function toggleAddPosition() {
        props.reactToFront({type: 'transaction', action: 'add', table: 'positions'});
    }


    function deletePosition() {
        props.reactToFront({type: 'transaction', action: 'delete', table: 'positions'});

    }

    return ( 
        
        <div>

        <div className='buttonsPositionsOuter'>

        <div className='buttonsPositions'>


             <span className='actions smallerr' onClick={toggleAddPosition}>Dodaj
                                   
             <MdAdd />

             </span>


             <span className='actions smallerr'>Ključ
             
             <MdOutlineMerge />
             
             </span>



             <span className='actions smallerr' onClick={deletePosition}>Izbriši
             
             <MdOutlineQrCode />
             
             </span>
            
            
        </div>


        </div>
       </div>
    ); 

} 