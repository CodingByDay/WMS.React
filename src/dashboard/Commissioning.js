import { useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Cookies from 'universal-cookie'

export default function Commissioning() {
  let navigate = useNavigate()

  checkUID()

  function isUUID(uuid) {
    let s = '' + uuid
    s = s.match(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
    )
    if (s === null) {
      return false
    }
    return true
  }

  function checkUID() {
    const cookies = new Cookies()
    var cookie = cookies.get('uid')
    if (typeof cookie !== 'undefined') {
      if (isUUID(cookie)) {
        return
      }
    } else {
      window.location.href = '/'
    }
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
     
       
      <Footer />
    </div>
  )
}
