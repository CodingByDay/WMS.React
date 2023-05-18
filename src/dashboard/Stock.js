import { useNavigate  } from 'react-router-dom';
import HeaderOrderListing from './HeaderOrderListing';
import OrderHeadsListing from './OrderHeadsListing';
import OrderPositions from './OrderPositions';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import ListingService from '../services/ListingService';
import Select from 'react-select'
import StockService  from '../services/StockService';


export default function Stock() { 
    checkUID ()
 
    const [orders, setOrders] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [locations, setLocations] = useState([]);
    const [idents, setidents] = useState([]);

    useEffect(() => {

      var data =  StockService.getWarehouses().then(response => {  
          var warehouses = onlyWarehouses(response);
          window.warehouses = warehouses;     
          setWarehouses(warehouses);     
      }); 
      }, []);


    function onlyWarehouses(data) { 
        var returnArray = [];
        for (var i = 0; i < data.Items.length; i++) {  
            returnArray.push(data.Items[i].Properties.Items[0].StringValue);           
        }
        return returnArray;
    }

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
  
    return ( 

        <div>
     
        <Header />   


        <div class ="stock-container">
          
        <Select className='select-filters' options={[]} id='warehouseStock'/>
        <Select className='select-filters' options={[]} id='locationStock'/>
        <Select className='select-filters' options={[]} id='identStock'/>


        <div class = 'visualization'>
        <h3 className='information'>Ni zaloge</h3>

        </div>
        <button className="btn btn-primary">Prikaži</button>
        </div>

        <Footer />

        </div>

    ); 
} 