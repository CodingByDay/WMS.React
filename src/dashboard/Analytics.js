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
import DataAccess from "../utility/DataAccess";

export default function Listing() { 



    checkUID ()

    useEffect(() => {


      var loader = document.getElementById("loader");
      loader.style.display = "block";
      $("#analytics-frame").css ("display", "none");
  
      setTimeout(function(){
        loader.style.display = "none";
        $("#analytics-frame").css ("display", "block");
     }, 3000); // Time before execution
      }, []);


    function isUUID ( uuid ) {
      let s = "" + uuid;
      s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
      if (s === null) {
        return false;
      }
      return true;
     } 
  
     function onMyFrameLoad() {
        alert('myframe is loaded');
      };

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
  

    return ( 

      
        <div id="analytics-panel">
                <Loader />
            
                  
                <Header/>

               <iframe src="http://standalone-analytics.in-sist.si" scrolling="no" onload="onMyFrameLoad(this)"  id='analytics-frame'>Your browser doesn't support iFrames.</iframe>

        </div>       
       
    ); 
} 