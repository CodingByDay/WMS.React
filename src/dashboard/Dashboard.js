import { useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import $ from 'jquery'

export function Dashboard() {
  let navigate = useNavigate()

  /*
  <button className="btn btn-primary dashboard" id='settings-hover' onClick = { ()=>routeChange("settings") }>
    Nastavitve
    <img alt={""} src='settings.png' width={100} /> 
  </button>
  */

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
  return (
    <div>
      <Header />
      <div className='main-menu-design'>
        <div className='menu'>
          <button
            className='btn btn-primary dashboard'
            onClick={() => routeChange('listing')}
          >
            Naročila
            <img alt={''} src='listing.png' width={100} />
          </button>

          <button
            className='btn btn-primary dashboard'
            onClick={() => routeChange('transactions')}
          >
            Transakcije
            <img alt={''} src='transaction.png' width={100} />
          </button>

          {/* <button
            className='btn btn-primary dashboard'
            onClick={() => routeChange('commissioning')}
          >
            Komisioniranje
            <img alt={''} src='planning.png' width={100} />
          </button>
          */}
          
          <button
            className='btn btn-primary dashboard'
            onClick={() => routeChange('stock')}
          >
            Zaloge
            <img alt={''} src='stock.png' width={100} />
          </button>

          <button
            className='btn btn-primary dashboard'
            onClick={() => routeChange('import')}
          >
            Uvoz
            <img alt={''} src='import.png' width={100} />
          </button>

          <button
            className='btn btn-primary dashboard'
            onClick={() => routeChange('settings')}
          >
            Nastavitve
            <img alt={''} src='settings.png' width={100} />
          </button>

          <button
            className='btn btn-primary dashboard'
            onClick={() => routeChange('analytics')}
            id='settings-hover'
          >
            Analitika
            <img alt={''} src='monitor-icon.png' id='analytics' width={50} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
