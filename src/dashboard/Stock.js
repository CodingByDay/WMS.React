
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import Select from 'react-select'
import StockService  from '../services/StockService';
import $ from 'jquery'; 
import Table from '../table/Table';
import DataAccess from "../utility/DataAccess";
import TableForgeDashboard from './TableForgeDashboard';

export default function Stock() { 

    checkUID () 


    const [warehouses, setWarehouses] = useState([]);
    const [locations, setLocations] = useState([]);
    const [idents, setidents] = useState([]);
    const [ident, setIdent] = useState();
    const [location, setLocation] = useState();
    const [warehouse, setWarehouse] = useState();
    const [data, setData] = useState([]);




    useEffect(() => {

    StockService.getWarehouses().then(response => {  
        var warehouses = onlyWarehouses(response);
        window.warehouses = warehouses;     
        setWarehouses(warehouses);     
    }); 
   
    StockService.getIdents().then(response => {  
        var identsFinal = [];
        identsFinal.push({value: "", label: ""}); 

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
        returnArray.push({value: "", label: ""}); 

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
    

  const fetchData = async () => {
      StockService.executeSQLQuery("select acWarehouse, acIdent, anQty, acLocation from uWMSStock;", [])
      .then(result => {
        setData(result)
      })
  };




    const handleInventory = (e) => {  
      var usedFilters = []
      var params = [];
      var sql = "SELECT acWarehouse, acIdent, anQty, acLocation FROM uWMSStock";
      if(typeof warehouse !== "undefined") {
        usedFilters.push("warehouse");
      }
      if(typeof location !== "undefined") {
        usedFilters.push("location");
      }
      if(typeof ident !== "undefined") {
        usedFilters.push("ident");
      }

      if(usedFilters.length != 0) {
        sql += " WHERE";
      } 

      for(var i = 0; i < usedFilters.length; i++) {
          if(i == 0) {
            if(usedFilters[i] == "warehouse") {
              sql += " acWarehouse = @warehouse";
              var parameter = { Name: "warehouse", Type: "String", Value: warehouse  };
              params.push(parameter);     
            } else if(usedFilters[i] == "location") {
              sql += " acLocation = @location";
              var parameter = { Name: "location", Type: "String", Value: location  };
              params.push(parameter);   
            } else if(usedFilters[i] == "ident") {
              sql += " acIdent = @ident";
              var parameter = { Name: "ident", Type: "String", Value: ident  };
              params.push(parameter);   
            }
          } else {
            if(usedFilters[i] == "warehouse") {
              sql += " AND acWarehouse = @warehouse";
              var parameter = { Name: "warehouse", Type: "String", Value: warehouse  };
              params.push(parameter);   
            } else if(usedFilters[i] == "location") {
              sql += " AND acLocation = @location";
              var parameter = { Name: "location", Type: "String", Value: location  };
              params.push(parameter);   
            } else if(usedFilters[i] == "ident") {
              sql += " AND acIdent = @ident";
              var parameter = { Name: "ident", Type: "String", Value: ident  };
              params.push(parameter);   
            }
          } 
       }


       sql += ";";
       alert(sql);
       console.log(params);
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
        locations.push({value: "", label: ""}); 

            for (var i = 0; i < response.Items.length; i++) {  
                locations.push({value: response.Items[i].Properties.Items[0].StringValue, label: response.Items[i].Properties.Items[0].StringValue});
            }
            setLocations(locations);        
        }); 
    }

    // Set up the value for the back button 
    localStorage.setItem('back', "dashboard")
    const name = "stock"
    
    return ( 

        <div>
     
        <Header />   


        <div className ="stock-container-filters">  

        <Select className='select-filters-stock' placeholder={"Skladišče"} value={warehouse} onChange={handleWarehouseChange} options={warehouses} id='warehouseStock' />
        <Select className='select-filters-stock' placeholder={"Pozicija"} value={location}  onChange={handleLocationChange} options={locations} id='locationStock'/>
        <Select className='select-filters-stock' placeholder={"Ident"} value={ident} onChange={handleIdentChange} options={idents} id='identStock'/>



        <span className='actions smallerr' onClick={handleInventory}>Prikaži</span>

        </div>

        <TableForgeDashboard name={name} tableData = {data} />

      

        <Footer />

        </div>

    ); 
} 