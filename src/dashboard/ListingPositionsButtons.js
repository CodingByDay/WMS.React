import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { addDays, addYears, format, isWeekend } from 'date-fns'
import { useEffect, useState } from 'react'
import {
  MdOutlineSearch,
  MdDateRange,
  MdDownload,
  MdOutlineCancel,
  MdDeleteOutline,
  MdEdit,
  MdAdd,
  MdOutlineMerge,
  MdOutlineKey,
  MdOutlineQrCode,
} from 'react-icons/md'
import SortingService from '../services/SortingService'
import { flushSync } from 'react-dom'
import EditOrderPosition from '../popup/EditOrderPosition'
import { useTranslation } from 'react-i18next'

export default function ListingPositionsButtons(props) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState({})
  const [isEditShow, setEditShown] = useState(false)
  useEffect(() => {
    if (typeof props.selectedElement !== 'undefined') {
      setSelected(props.selectedElement)
    }
  }, [props.selectedElement])

  function deleteOrderHead() {
    props.communicate('position', 'delete')
  }

  function createPosition() {
    props.communicate('position', 'create')
  }

  const showModal = () => {
    setEditShown(true)
  }

  const hideModal = () => {
    setEditShown(false)
  }

  return (
    <div className='filters positions'>
      <span className='actions smallerr' onClick={createPosition} id='addOrder'>
        <span className='wms-action-label'>{t('common.add')}</span>
        <MdAdd />
      </span>

      <span className='actions smallerr' id='editOrder' onClick={showModal}>
        <span className='wms-action-label'>{t('common.edit')}</span>
        <MdEdit />
      </span>

      <span
        className='actions smallerr'
        id='deleteOrder'
        onClick={deleteOrderHead}
      >
        <span className='wms-action-label'>{t('common.delete')}</span>
        <MdDeleteOutline />
      </span>

      <EditOrderPosition
        close={hideModal}
        shown={isEditShow}
        object={selected}
        communicate={props.communicate}
      />
    </div>
  )
}
