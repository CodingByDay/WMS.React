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
import { useTranslation } from 'react-i18next'

export default function TransactionPositionsButtons(props) {
  const { t } = useTranslation()
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
            <span className='wms-action-label'>{t('common.remove')}</span>
            <MdDeleteOutline />
          </span>

          {props.appendActions}
        </div>
      </div>
    </div>
  )
}
