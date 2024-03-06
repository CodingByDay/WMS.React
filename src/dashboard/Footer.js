import { useNavigate } from 'react-router-dom'
import Header from './Header'

export default function Footer() {
  let navigate = useNavigate()

  return (
    <div>
      <div className='footer'></div>
    </div>
  )
}
