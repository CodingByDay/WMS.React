import { useNavigate  } from 'react-router-dom';
import HeaderOrderListing from './HeaderOrderListing';
import OrderHeadsListing from './OrderHeadsListing';
import OrderPositions from './OrderPositions';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';


export default function Listing() { 
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
   
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // data fetching here
        // http://wms-skisea-test.in-sist.si/Services/Device/?mode=list&table=oodtw&pars=0100|Veleprodajno skladišče|&i=web
        // Continue with this request
        // TODO: implement data fetching here
    }, []);

  
    return ( 

        <div>
        <Header/>   
        <HeaderOrderListing />
        <OrderHeadsListing />
        <OrderPositions />     
        <Footer />

        </div>

    ); 
} 