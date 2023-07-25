import HeaderOrderListing from './HeaderOrderListing';
import OrderHeadsListing from './OrderHeadsListing';
import OrderPositions from './OrderPositions';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import ListingService from '../services/ListingService';
import Loader from '../loader/Loader';
import $ from 'jquery'; 
import ListingPositionsButtons from './ListingPositionsButtons';

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
      var loader = document.getElementById("loader");

              loader.style.display = "block";
              $(".main-container").css ("display", "none");
              ListingService.getAllListings().then(response => { 
              setOrders(response);
              loader.style.display = "none";
              $(".main-container").css ("display", "block");
           }); 
    }, []);

  async function getPositions(order) {
    ListingService.getAllPositions(order).then(response => { 
      setPositions(response);  
    });
  }

  const [sort, setSort] = useState();


  const  childToParent = (data) => {

      getPositions(data.childNodes[4].innerHTML)
      orders.selector = data.childNodes[4].innerHTML;
  }


  const getSortingObject = (sorting) => {
    setSort(sorting);
  }


    return ( 

        <div>


        <Loader />

            <div className='main-container'>

            <Header/>

            <div className='listing-bg' >

            <HeaderOrderListing getSortingObject = {getSortingObject} />
            <OrderHeadsListing data = {orders} childToParent = {childToParent} sort={sort} />
            <ListingPositionsButtons />
            <OrderPositions data = {positions} childToParent = {childToParent} />     
            <Footer />


        </div>
        



        </div>

        </div>

        

    ); 
} 