// Users.js
import React, { useState } from 'react';
import UserTable from './UserTable'; // Import the UserTable component
import Header from '../dashboard/Header';
import Footer from '../dashboard/Footer';
import TableForge from './TableForge';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import {store} from '../store/store'
function Users() {

  const currentState = store.getState();


  // Dummy data for users
  const initialUsers = [
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      upName: 'johndoe',
      password: 'secret123',
      active: true,
    },
    {
      id: 2,
      name: 'Jane',
      surname: 'Smith',
      upName: 'janesmith',
      password: 'mypassword',
      active: false,
    },
    // Add more dummy user objects as needed
  ];






  const initialization = () => {


    

  }

  
  const tableName = 'users';
  const urlParam = "/getUsers";





  return (
    <div>
    <Header />
    <div className="Users">
      <h1>Uporabniki</h1>
      <div className="users-container-table">
         <TableForge name={tableName} url={urlParam} init = {initialization} />
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Users;
