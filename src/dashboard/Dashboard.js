import { useNavigate  } from 'react-router-dom';



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
       <div class = "menu"> 
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
            <button className="btn btn-primary dashboard" onClick = {()=>routeChange("logout")} >
              Odjava
            </button>
      </div> 
    ); 
} 