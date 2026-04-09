import { useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import $ from 'jquery'
import { useTranslation } from 'react-i18next'

export default function Settings() {
  const { t } = useTranslation()
  let navigate = useNavigate()

  function handleSettings() {
    $('.settings-divider').toggle()
    // Toggle the visibility
  }

  const routeChange = (option) => {
    let path = '/' + option

    if (option === 'logout') {
      navigate('/')
    } else {
      navigate(path)
    }
  }

  // Set up the value for the back button
  localStorage.setItem('back', 'dashboard')

  return (
    <div className='wms-settings-hub'>
      <Header />
      <div className='main-menu-design'>
        <div className='settings menu'>
          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('subjects')}
          >
            {t('settingsMenu.subjects')}
            <img alt={''} src='rating.png' width={50} />
          </button>

          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('system')}
          >
            {t('settingsMenu.system')}
            <img alt={''} src='settings-icon.png' width={50} />
          </button>

          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('idents')}
          >
            {t('settingsMenu.idents')}
            <img alt={''} src='boxes.png' width={50} />
          </button>

          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('subject-codes')}
          >
            {t('settingsMenu.subjectCodes')}
            <img alt={''} src='source-code.png' width={50} />
          </button>

          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('documents')}
          >
            {t('settingsMenu.documentTypes')}
            <img alt={''} src='format-icon.png' width={50} />
          </button>

          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('status')}
          >
            {t('settingsMenu.documentStatuses')}
            <img alt={''} src='document-status.png' width={50} />
          </button>

          {/*   
         


          For now this is commented out because of time limit.
         
          <button className="btn btn-primary settingsButton  dashboard" onClick = {()=>routeChange("warehouses")}>
           Skladišča
           <img alt={""} src='warehouse-icon.png' width={50} />
         </button>

         
         <button className="btn btn-primary settingsButton dashboard" id='settings-hover' onClick = {()=>routeChange("devices")}>
           Čitalci
           <img alt={""} src='rfid-icon.png' width={50} />
         </button>

         <button className="btn btn-primary settingsButton dashboard" id='settings-hover' onClick = {()=>routeChange("printers")}>
           Tiskalniki
           <img alt={""} src='print-icon.png' width={50} />
         </button>

         <button className="btn btn-primary settingsButton dashboard" id='settings-hover' onClick = {()=>routeChange("users")}>
           Uporabniki
           <img alt={""} src='user-icon.png' width={50} />
         </button>
         
         
         
         */}
        </div>
      </div>
      <Footer />
    </div>
  )
}
