// Users.js
import React, { useState, useEffect } from 'react';
import SettingsService from '../services/SettingsService';
import UserTable from './UserTable'; // Import the UserTable component
import Header from '../dashboard/Header';
import Footer from '../dashboard/Footer';
import TableForge from './TableForge';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import {store} from '../store/store'

function Devices() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      
      try {
        SettingsService.executeSQLQuery("SELECT * FROM uWMSOrderItemByKeyOut;", [])
        .then(result => {
          setData(result)
        })
        .catch(error => {
          console.error("Error:", error);
        });

      } catch (error) {
      }
    };
    fetchData();
  }, []);

  
  var users = [];

  const tableName = 'users';
  const urlParam = "/getUsers";


  return (
    <div>

    <Header />

    <div className="Users">
   
      <div className="users-container-table">
         <TableForge name={tableName} url={urlParam}  tableData = {data} />
      </div>
      
    </div>

    <Footer />
    
    </div>
  );
}

export default Devices;
