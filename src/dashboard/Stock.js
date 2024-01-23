
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import Select from 'react-select'
import StockService  from '../services/StockService';
import $ from 'jquery'; 
import Table from '../table/Table';
import DataAccess from "../utility/DataAccess";

export default function Stock() { 

    checkUID () 


    const [warehouses, setWarehouses] = useState([]);
    const [locations, setLocations] = useState([]);
    const [idents, setidents] = useState([]);
    const [ident, setIdent] = useState();
    const [location, setLocation] = useState();
    const [warehouse, setWarehouse] = useState();
    // State for the rows
    const [rows, setRows] = useState([]);




    useEffect(() => {

    StockService.getWarehouses().then(response => {  
        var warehouses = onlyWarehouses(response);
        window.warehouses = warehouses;     
        setWarehouses(warehouses);     
    }); 
   
    StockService.getIdents().then(response => {  
        var identsFinal = [];

        for (var i = 0; i < response.length; i++) {  
          try {
              identsFinal.push({value: response[i], label: response[i]}); 
          } catch (e) {
            continue;
          }
        }

        setidents(identsFinal);


    });
      }, []);


    function onlyWarehouses(data) { 
        var returnArray = [];

        for (var i = 0; i < data.Items.length; i++) {  
            returnArray.push({value: data.Items[i].Properties.Items[0].StringValue, label: data.Items[i].Properties.Items[0].StringValue});           
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
    
    const handleInventory = (e) => {  
      var valueIdent = "";
        var valueWarehouse = "";
        var valueLocation = "";

        if(typeof ident === "undefined") {
             valueIdent  = "|";
        } else {
             valueIdent = ident.value;
        }
        if(typeof warehouse === "undefined") {
            valueWarehouse  = "|";
        } else {
            valueWarehouse  = warehouse.value;
        }
        if(typeof location === "undefined") {
            valueLocation  = "|";
        } else {
            valueLocation = location.value;
        }    
        var finalParams = valueWarehouse +  "|" + valueLocation + "|" + valueIdent; 
        StockService.getStock(finalParams).then(response => {
        var stocks = [];
        var stockAmount = 0;

        for(var i = 0; i < response.Items.length; i++) {  
          
            var ident = DataAccess.getData(response.Items[i], "Ident", "StringValue");
            var location = DataAccess.getData(response.Items[i], "Location", "StringValue");
            var qty = DataAccess.getData(response.Items[i], "RealStock", "DoubleValue");
            stocks.push({Ident: ident, RealStock: qty, Location: location});

            // Data access is not defined.
        }
        setRows(stocks);
        }); 

    

  }
    function handleIdentChange(event) { 
      setIdent(event);
    }
    function handleLocationChange(event) {
      setLocation(event);
     }

    function handleWarehouseChange(event) { 
        setWarehouse(event); 
        StockService.getLocations(event.value).then(response => {  
            var locations = [];
            for (var i = 0; i < response.Items.length; i++) {  
                locations.push({value: response.Items[i].Properties.Items[0].StringValue, label: response.Items[i].Properties.Items[0].StringValue});
            }
            setLocations(locations);        
        }); 
    }

    // Set up the value for the back button 
    localStorage.setItem('back', "dashboard")

    
    return ( 

        <div>
     
        <Header />   


        <div className ="stock-container-filters">  

        <Select className='select-filters-stock' placeholder={"Skladišče"} value={warehouse} onChange={handleWarehouseChange} options={warehouses} id='warehouseStock' />
        <Select className='select-filters-stock' placeholder={"Pozicija"} value={location}  onChange={handleLocationChange} options={locations} id='locationStock'/>
        <Select className='select-filters-stock' placeholder={"Ident"} value={ident} onChange={handleIdentChange} options={idents} id='identStock'/>



        <span className='actions smallerr' onClick={handleInventory}>Prikaži</span>

        </div>
        <Table table = "stock" data={rows} className="stock-table" type="stock" class = "table_responsive_stock"  />



      

        <Footer />

        </div>

    ); 
} 