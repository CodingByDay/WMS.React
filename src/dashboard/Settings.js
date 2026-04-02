import { useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import $ from 'jquery'

export default function Settings() {
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
    <div>
      <Header />
      <div className='main-menu-design'>
        <div className='settings menu'>
          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('subjects')}
          >
            Subjekti
            <img alt={''} src='rating.png' width={50} />
          </button>

          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('subject-codes')}
          >
            Kode subjektov
            <img alt={''} src='source-code.png' width={50} />
          </button>

          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('documents')}
          >
            Vrste dokumentov
            <img alt={''} src='format-icon.png' width={50} />
          </button>

          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('status')}
          >
            Statusi dokumentov
            <img alt={''} src='document-status.png' width={50} />
          </button>

          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('system')}
          >
            Sistem
            <img alt={''} src='settings-icon.png' width={50} />
          </button>

          <button
            className='btn btn-primary settingsButton dashboard'
            onClick={() => routeChange('idents')}
          >
            Identi
            <img alt={''} src='boxes.png' width={50} />
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
