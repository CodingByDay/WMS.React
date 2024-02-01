// Users.js
import React, { useState, useEffect } from 'react';
import SettingsService from '../services/SettingsService';
import UserTable from './UserTable'; // Import the UserTable component
import Header from '../dashboard/Header';
import Footer from '../dashboard/Footer';
import TableForge from './TableForge';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import {store} from '../store/store'

function Printers() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      
      try {
        SettingsService.executeSQLQuery("SELECT * FROM uWMSSetting;", [])
        .then(result => {
          setData(result)
        })
        .catch(error => {
        });

      } catch (error) {
      }
    };
    fetchData();
  }, []);

  
  var users = [];

  const tableName = 'system';



  return (
    <div>

    <Header />

    <div className="Users">
   
      <div className="users-container-table">
         <TableForge name={tableName} tableData = {data} />
      </div>
      
    </div>

    <Footer />
    
    </div>
  );
}

export default Printers;
