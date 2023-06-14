import { useNavigate  } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Cookies from 'universal-cookie';
import $ from 'jquery'; 


export default function Settings() { 

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

         <button className="btn btn-primary dashboard" >
           Sistem
           <img alt={""} src='settings-icon.png' width={50}/>
         </button>

         <button className="btn btn-primary dashboard" >
           Vrste dokumentov
           <img alt={""} src='format-icon.png' width={50} />
         </button>

         <button className="btn btn-primary dashboard" >
           Skladišča
           <img alt={""} src='warehouse-icon.png' width={50} />
         </button>

         
         <button className="btn btn-primary dashboard" id='settings-hover' >
           Čitalci
           <img alt={""} src='rfid-icon.png' width={50} />
         </button>

         <button className="btn btn-primary dashboard" id='settings-hover' >
           Tiskalniki
           <img alt={""} src='print-icon.png' width={50} />
         </button>
         <button className="btn btn-primary dashboard" id='settings-hover' >
           Uporabniki
           <img alt={""} src='user-icon.png' width={50} />
         </button>
         <button className="btn btn-primary dashboard" id='settings-hover' >
           Analitika
           <img alt={""} src='monitor-icon.png' width={50} />
         </button>
         </div>

       
   
   </div> 
      <Footer />
      </div> 
    
    ); 
} 