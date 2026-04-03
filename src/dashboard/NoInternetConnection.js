import React from 'react'
import { useTranslation } from 'react-i18next'
import { MdKeyboardReturn } from 'react-icons/md'

const NoInternetConnection = (props) => {
  const { t } = useTranslation()

  function returnState() {
    window.history.back()
  }

  return (
    <div id='internet'>
      <h1>{t('errors.noInternet')}</h1>
      <span className='actions smallerr' onClick={returnState}>
        <p>{t('errors.back')}</p>
        <MdKeyboardReturn />
      </span>
    </div>
  )
}

export default NoInternetConnection
