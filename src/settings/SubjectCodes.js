// Users.js
import React, { useState, useEffect } from 'react';
import SettingsService from '../services/SettingsService';
import UserTable from './UserTable'; // Import the UserTable component
import Header from '../dashboard/Header';
import Footer from '../dashboard/Footer';
import TableForge from './TableForge';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import {store} from '../store/store'

function SubjectCodes() {

  const [data, setData] = useState([]);
  const [refreshTrigger, setRefresh] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      
  
        SettingsService.executeSQLQuery("SELECT * FROM uWMSSetting;", [])
        .then(result => {
          setData(result)
        })
       

     
    };
    fetchData();
  }, []);

  
  var users = [];

  const tableName = 'system';



  const refresh = () => {

    SettingsService.executeSQLQuery("SELECT * FROM uWMSSetting;", [])
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

export default SubjectCodes;
