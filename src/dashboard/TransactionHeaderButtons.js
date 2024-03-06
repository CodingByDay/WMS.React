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

export default function TransactionHeaderButtons(props) {
  function toggleAddPosition() {
    props.communicate({ type: 'transaction', action: 'add', table: 'header' })
  }

  function deleteHeadDocument() {
    props.communicate({
      type: 'transaction',
      action: 'delete',
      table: 'header',
    })
  }

  function finishDocument() {
    props.communicate({
      type: 'transaction',
      action: 'finish',
      table: 'header',
    })
  }

  let navigate = useNavigate()
  return (
    <div>
      <div className='buttonsHeaderOuter'>
        <div className='buttonsHeader'>
          <div className='header-buttons-div'>
            <span className='actions smallerr' onClick={finishDocument}>
              <p>Zaključi</p>
              <MdDownload />
            </span>

            {/* [Discusion needed] What are we going to do about stornation? 06.03.2024 */}
            <span className='actions smallerr'>
              <p>Storniraj</p>
              <MdOutlineCancel />
            </span>

            <span className='actions smallerr' onClick={deleteHeadDocument}>
              <p>Izbriši</p>
              <MdDeleteOutline />
            </span>
          </div>

          {/* <span className='actions smallerr' onClick={toggleAddPosition} id=''>          
             <p>Dodaj</p>
             <MdAdd />
             </span> */}
        </div>
      </div>
    </div>
  )
}
