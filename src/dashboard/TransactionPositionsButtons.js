import { useNavigate } from 'react-router-dom'
import Table from '../table/Table'
import {
  MdDownload,
  MdOutlineCancel,
  MdDeleteOutline,
  MdEdit,
  MdAdd,
  MdOutlineMerge,
  MdOutlineKey,
  MdOutlineQrCode,
} from 'react-icons/md'

export default function TransactionPositionsButtons(props) {
  let navigate = useNavigate()

  function toggleAddPosition() {
    props.communicate({
      type: 'transaction',
      action: 'add',
      table: 'positions',
    })
  }

  function deletePosition() {
    props.communicate({
      type: 'transaction',
      action: 'delete',
      table: 'positions',
    })
  }

  function editPosition() {
    props.communicate({
      type: 'transaction',
      action: 'edit',
      table: 'positions',
    })
  }

  return (
    <div>
      <div className='buttonsPositionsOuter'>
        <div className='buttons-positions-bottom'>
          {/* <span className='actions smallerr' onClick={toggleAddPosition}>
             <p>Dodaj</p>              
             <MdAdd />
             </span> 


             <span className='actions smallerr' onClick={editPosition}>
             <p>Popravi</p>                   
             <MdEdit />
          </span> */}

          <span className='actions smallerr' onClick={deletePosition}>
            <p>Izbriši</p>
            <MdDeleteOutline />
          </span>
        </div>
      </div>
    </div>
  )
}
