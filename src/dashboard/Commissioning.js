import { useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

export default function Commissioning() {
  let navigate = useNavigate()

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
