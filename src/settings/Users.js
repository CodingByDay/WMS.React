// Users.js
import React, { useState } from 'react';
import UserTable from './UserTable'; // Import the UserTable component
import Header from '../dashboard/Header';
import Footer from '../dashboard/Footer';
import TableForge from './TableForge';
function Users() {
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


  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (userToDelete) => {

    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
  };

  const handleEdit = (editedUser) => {

    console.log('Editing user:', editedUser);
  };

  const handleInsert = () => {

    console.log('Inserting a new user');
  };

  const tableName = 'users';
  const urlParam = "/getUsers";

  return (
    <div>
    <Header />
    <div className="Users">
      <h1>Uporabniki</h1>
      <div className="users-container-table">
         <TableForge name={tableName} url={urlParam} onDelete={handleDelete} onEdit={handleEdit} onInsert={handleInsert} />
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Users;
