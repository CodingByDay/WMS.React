// Users.js
import React, { useState, useEffect } from 'react';
import SettingsService from '../services/SettingsService';
import UserTable from './UserTable'; // Import the UserTable component
import Header from '../dashboard/Header';
import Footer from '../dashboard/Footer';
import TableForge from './TableForge';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import {store} from '../store/store'

function Subjects() {

  const [data, setData] = useState([]);
  const [refreshTrigger, setRefresh] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      

    const sqlQueryString = `
        SELECT [acSubject] -- šifra subjekta
        ,[acBuyer] -- kupec
        ,[acSupplier] -- dobavitelj
        ,[acWarehouse] -- skladišče
        ,[acName2] -- naziv
        ,[acAddress] -- naslov
        ,[acPost] -- pošta 
        ,[acCountry] -- država
        ,[acVATCodePrefix] -- predpona davčne številke
        ,[acCode] -- davčna številka
        ,[acRegNo] -- matična številka
        ,[acActive] -- aktiven
        ,[uWMSStock] -- vodena zaloga na skladišču
        ,[uWMS] -- viden v WMS
        ,[uWMSSubj] -- prevzem brez naročila
    FROM [dbo].[tHE_SetSubj];
    `;
    

  
        SettingsService.executeSQLQuery(sqlQueryString, [])
        .then(result => {
          setData(result)
        })
       

     
    };
    fetchData();
  }, []);

  
  var users = [];

  const tableName = 'subjects';

  const refresh = () => {

    const sqlQueryString = `
    SELECT [acSubject] -- šifra subjekta
        ,[acBuyer] -- kupec
        ,[acSupplier] -- dobavitelj
        ,[acWarehouse] -- skladišče
        ,[acName2] -- naziv
        ,[acAddress] -- naslov
        ,[acPost] -- pošta 
        ,[acCountry] -- država
        ,[acVATCodePrefix] -- predpona davčne številke
        ,[acCode] -- davčna številka
        ,[acRegNo] -- matična številka
        ,[acActive] -- aktiven
        ,[uWMSStock] -- vodena zaloga na skladišču
        ,[uWMS] -- viden v WMS
        ,[uWMSSubj] -- prevzem brez naročila
    FROM [dbo].[tHE_SetSubj];
  `;
  


      SettingsService.executeSQLQuery(sqlQueryString, [])
      .then(result => {
        setData(result)
      })


  }


  const search = (callbacks) => {



  }

  return (
    <div>

    <Header />

    <div className="Users">
   
      <div className="users-container-table">
         <TableForge search={search} refresh={refresh} name={tableName} tableData = {data} />
      </div>
      
    </div>

    <Footer />
    
    </div>
  );
}

export default Subjects;
