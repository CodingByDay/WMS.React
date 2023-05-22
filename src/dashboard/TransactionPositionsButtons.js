import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { MdDownload, MdOutlineCancel, MdDeleteOutline, MdEdit, MdAdd, MdOutlineMerge, MdOutlineKey, MdOutlineQrCode} from "react-icons/md";


export default function TransactionPositionsButtons(props) { 

    let navigate = useNavigate();




    

    function toggleAddPosition() {
        props.reactToFront({type: 'transaction', action: 'add', table: 'positions'});
    }


    return ( 
        
        <div>

        <div className='buttonsPositionsOuter'>

        <div className='buttonsPositions'>



             <button className="btn btn-primary" onClick={toggleAddPosition}>Dodaj
             
                       
             <MdAdd />


             </button>


             <button className="btn btn-primary">Ključ
             
             <MdOutlineMerge />
             
             </button>



             <button className="btn btn-primary">Izbriši
             
             <MdOutlineQrCode />
             
             </button>
             <button className="btn btn-primary">Serijske
             
             <MdOutlineQrCode />
             
             </button>
             <button className="btn btn-primary">Menjave ser.
             
             <MdEdit />
             
             </button>
        </div>


        </div>
       </div>
    ); 

} 