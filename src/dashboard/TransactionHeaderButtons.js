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

/** Set to `true` when storno behaviour is implemented; UI hidden until then. */
const SHOW_STORNO_BUTTON = false

export default function TransactionHeaderButtons(props) {
  const { t } = useTranslation()
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
              <span className='wms-action-label'>{t('common.finish')}</span>
              <MdDownload />
            </span>

            {/* [Discusion needed] Stornation — hidden until wired (see SHOW_STORNO_BUTTON). */}
            {SHOW_STORNO_BUTTON ? (
              <span className='actions smallerr'>
                <span className='wms-action-label'>{t('common.storno')}</span>
                <MdOutlineCancel />
              </span>
            ) : null}

            <span className='actions smallerr' onClick={deleteHeadDocument}>
              <span className='wms-action-label'>{t('common.remove')}</span>
              <MdDeleteOutline />
            </span>

            {props.appendActions}
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
