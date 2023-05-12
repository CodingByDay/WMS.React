import { useNavigate  } from 'react-router-dom';
import Select from 'react-select'
import { MdLogout, MdHome } from "react-icons/md";
import Cookies from 'universal-cookie';


export default function Header() { 

    function handleLogout() { 
        const cookies = new Cookies();
        cookies.remove('uid', { path: '/' });
        navigate('/');
    }

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      

  let navigate = useNavigate();

  const pathname = window.location.pathname;


  var button;

  if(pathname != '/dashboard') {

    button =  <button className="btn btn-primary navbar-internal home" onClick={() => navigate('/dashboard')}>Domov  

    <MdHome />

    </button>
  }
  
    return ( 


        <div className="navbar">
            <div className='logo'></div>
            <div className='menu'></div>
            <div className='logout'>

                {button}

                <button className="btn btn-primary navbar-internal logout" onClick={() => handleLogout()}>Odjava             
                <MdLogout />
                </button>
            </div>
        </div>


    ); 
} 