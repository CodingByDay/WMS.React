import DataAccess from '../utility/DataAccess'

import $ from 'jquery'
import Select from 'react-select'
import PopupService from '../services/PopupService'
import { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import ListingService from '../services/ListingService'
import TransactionService from '../services/TransactionService'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PopupCloseButton from '../components/PopupCloseButton'

export default function StatusChange(props) {
  const { t } = useTranslation()
  const [statusList, setStatusList] = useState([])
  const [status, setStatus] = useState('')

  const [orderKey, setOrderKey] = useState()
  const order = useSelector((state) => state.data.orderKey)
  const userId = useSelector((state) => state.user.userId)

  useEffect(() => {
    setOrderKey(order)
    setStatusList([
      { value: '1', label: t('orderStatus.entered') },
      { value: '2', label: t('orderStatus.confirmed') },
      { value: '3', label: t('orderStatus.partialIssued') },
      { value: 'Z', label: t('orderStatus.completed') },
      { value: 'X', label: t('orderStatus.storno') },
    ])
  }, [t])

  function onChangeStatus(e) {
    setStatus(e.value)
  }

  function closeWindow() {
    $('.chooseStatus').css('display', 'none')
  }

  function changeStatus() {
    ListingService.changeStatus(order, status, userId).then((response) => {})
  }

  return (
    <div className='chooseStatus'>
      <div className='header_part wms-popup-header-row'>
        <PopupCloseButton onClick={closeWindow} />
      </div>

      <div className='changeStatusOuter'>
        <div className='main-part'>
          <Select
            className='select-filterss'
            placeholder={t('common.selectStatus')}
            onChange={(e) => onChangeStatus(e)}
            options={statusList}
            id='statusChange'
          />
        </div>

        <center>
          <span
            className='actions smallerr status'
            onClick={changeStatus}
            id='createDocument'
          >
            <p>{t('common.confirmBtn')}</p>
            <MdAdd />
          </span>
        </center>
      </div>
    </div>
  )
}
