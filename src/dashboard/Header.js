import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { MdLogout, MdHome, MdArrowBackIos } from 'react-icons/md'
import VersionInfo from '../versioning/VersionInfo'
import LanguageSwitcher from '../components/LanguageSwitcher'
import Cookies from 'universal-cookie'

export default function Header(props) {
  const { trailingSlot, centerSlot } = props
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
      <span
        className='actions'
        onClick={() => navigate('/dashboard')}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            navigate('/dashboard')
          }
        }}
        aria-label={t('nav.home')}
      >
        <span className='wms-nav-text'>{t('nav.home')}</span>
        <MdHome aria-hidden />
      </span>
    )

    returnButton = (
      <span
        className='actions'
        onClick={() => navigate(-1)}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            navigate(-1)
          }
        }}
        aria-label={t('nav.back')}
      >
        <span className='wms-nav-text'>{t('nav.back')}</span>
        <MdArrowBackIos aria-hidden />
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

      <div className='wms-navbar-center'>{centerSlot}</div>

      <div className='logout'>
        <LanguageSwitcher variant="header" />
        <VersionInfo />
        {button}
        {returnButton}
        {trailingSlot}
        <span
          className='actions'
          onClick={() => handleLogout()}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleLogout()
            }
          }}
          aria-label={t('nav.logout')}
        >
          <span className='wms-nav-text'>{t('nav.logout')}</span>
          <MdLogout aria-hidden />
        </span>
      </div>
    </div>
  )
}
