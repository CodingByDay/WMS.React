import { useNavigate  } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';


export function Dashboard() { 



  let navigate = useNavigate();

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
       <div className = "menu"> 
             <button className="btn btn-primary dashboard" onClick = {()=>routeChange("listing")}>
              Pregled naročila
            </button>
            <button className="btn btn-primary dashboard" onClick = {()=>routeChange("transactions")}>
              Transakcije
            </button>
            <button className="btn btn-primary dashboard" onClick = {()=>routeChange("stock")}>
              Zaloga
            </button>
            <button className="btn btn-primary dashboard" onClick = {()=>routeChange("settings")}>
              Nastavitve
            </button>
      
      </div> 
      <Footer />
      </div> 

    ); 
} 