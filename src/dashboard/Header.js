import { useNavigate  } from 'react-router-dom';

import { MdLogout, MdHome } from "react-icons/md";
import Cookies from 'universal-cookie';


export default function Header() { 

    function handleLogout() { 
        const cookies = new Cookies();
        cookies.remove('uid', { path: '/' });
        navigate('/');
    }


      

  let navigate = useNavigate();

  const pathname = window.location.pathname;


  var button;

  if(pathname !== '/dashboard') {

    button =  <span className='actions' onClick={() => navigate('/dashboard')}>Domov  

    <MdHome />

    </span>
  }
  
    return ( 


        <div className="navbar">
            <div className='logo navbar'>
                <center><img src='logo-wms.png'  className='logo' alt='Riko WMS' height={30} /></center>
            </div>
            <div className='menu'></div>
            <div className='logout'>
                {button}
                <span className='actions' onClick={() => handleLogout()}>Odjava             
                <MdLogout />
                </span>
            </div>
        </div>


    ); 
} 