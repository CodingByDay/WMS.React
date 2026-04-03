import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { MdLogout, MdHome, MdArrowBackIos } from 'react-icons/md'
import VersionInfo from '../versioning/VersionInfo'
import LanguageSwitcher from '../components/LanguageSwitcher'
import Cookies from 'universal-cookie'

export default function Header(props) {
  const { t } = useTranslation()
  function handleLogout() {
    const cookies = new Cookies()
    cookies.remove('uid', { path: '/' })
    navigate('/')
  }

  let navigate = useNavigate()

  const pathname = window.location.pathname

  var button
  var returnButton

  if (pathname !== '/dashboard') {
    button = (
      <span className='actions' onClick={() => navigate('/dashboard')}>
        {t('nav.home')}
        <MdHome />
      </span>
    )

    returnButton = (
      <span className='actions' onClick={() => navigate(-1)}>
        {t('nav.back')}
        <MdArrowBackIos />
      </span>
    )
  }

  function goBack() {}

  return (
    <div className='navbar'>
      <div className='logo navbar wms-navbar-logo' id='back-button'>
        <img
          src='logo-wms.png'
          className='logo'
          alt='Riko WMS'
          height={30}
          draggable='false'
        />
      </div>

      <div className='logout'>
        <LanguageSwitcher variant="header" />
        <VersionInfo />
        {button}
        {returnButton}
        <span className='actions' onClick={() => handleLogout()}>
          {t('nav.logout')}
          <MdLogout />
        </span>
      </div>
    </div>
  )
}
