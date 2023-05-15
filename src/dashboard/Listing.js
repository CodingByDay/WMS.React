import { useNavigate  } from 'react-router-dom';
import HeaderOrderListing from './HeaderOrderListing';
import OrderHeadsListing from './OrderHeadsListing';
import OrderPositions from './OrderPositions';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import ListingService from '../services/ListingService';


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
  
    // orders
    const [orders, setOrders] = useState([]);

    // positions
    const [positions, setPositions] = useState([]);

    useEffect(() => {
              var data =  ListingService.getAllListings().then(response => { 
              setOrders(response);
           }); 
    }, []);

  async function getPositions(order) {
    var data =  ListingService.getAllPositions(order).then(response => { 
      console.log(response.data);
      setPositions(response);
    });
  }
  const [data, setData] = useState([]);

  const  childToParent = (data) => {
    console.log(data)
    

    getPositions(data.childNodes[4].innerHTML)
  }




    return ( 

        <div>
     
        <Header/>   
        <HeaderOrderListing />
        <OrderHeadsListing data = {orders} childToParent = {childToParent} />
        <OrderPositions childToParent = {childToParent} />     
        <Footer />

        </div>

    ); 
} 