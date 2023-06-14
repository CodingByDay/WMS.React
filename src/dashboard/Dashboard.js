import { useNavigate  } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Cookies from 'universal-cookie';
import $ from 'jquery'; 


export function Dashboard() { 

  let navigate = useNavigate();

  checkUID ()







  function isUUID ( uuid ) {
    let s = "" + uuid;
    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
      return false;
    }
    return true;
   } 



  function checkUID () {
    const cookies = new Cookies();
    var cookie = cookies.get('uid');
    if (typeof cookie !== "undefined") {     
      if(isUUID(cookie)) {     
        return;
      } 
  } else {
    window.location.href = "/";
  }
   
  }
 
  function handleSettings () {
    $(".settings-divider").toggle();
    // Toggle the visibility
  }

  const routeChange = (option) => {
    let path = "/" + option;

    if(option === "logout") { 
      navigate("/");
    } else {
      navigate(path); 
    }
  }
    return ( 
      <div>
          <Header/>
     <div className='main-menu-design'>
    
       <div className = "menu"> 

            <button className="btn btn-primary dashboard" onClick = {()=>routeChange("listing")}>
              Pregled naročila
              <img alt={""} src='shopping-bag.png' width={50}/>
            </button>

            <button className="btn btn-primary dashboard" onClick = {()=>routeChange("transactions")}>
              Transakcije
              <img alt={""} src='transaction.png' width={50} />
            </button>

            <button className="btn btn-primary dashboard" onClick = {()=>routeChange("stock")}>
              Zaloga
              <img alt={""} src='packages.png' width={50} />
            </button>

            
            <button className="btn btn-primary dashboard" id='settings-hover' onClick = { handleSettings }>
              Nastavitve
              <img alt={""} src='settings.png' width={50} />
            </button>
            </div>

            <div className='settings-divider'>
            <div className='settings-divider-context'>
              <button className="btn btn-primary sub" id='1' >
              Sistem
              <img alt={""} src='settings.png' width={50} />
            </button>
            <button className="btn btn-primary sub" id='2' >
              Vrste dokumentov
              <img alt={""} src='settings.png' width={50} />
            </button>
            <button alt={""} className="btn btn-primary sub" id='3' >
              Skladišča
              <img alt={""} src='settings.png' width={50} />
            </button>
            <button className="btn btn-primary sub" id='4' >
              Čitalci
              <img alt={""} src='settings.png' width={50} />
            </button>
            <button alt={""} className="btn btn-primary sub" id='5' >
              Tiskalniki
              <img alt={""} src='settings.png' width={50} />
            </button>
            <button alt={""} className="btn btn-primary sub" id='6' >
              Uporabniki
              <img alt={""} src='settings.png' width={50} />
            </button>
            </div>
            </div>
      
      </div> 
      <Footer />
      </div> 
    
    ); 
} 