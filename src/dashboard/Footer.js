import { useNavigate  } from 'react-router-dom';
import Header from './Header';



export default function Footer() { 

  let navigate = useNavigate();

  
    return ( 
      <div>
       <div className = "footer"> 
             <h5>All rights reserved 2023 In.Sist d.o.o.</h5>  
       </div> 
      </div> 

    ); 
} 