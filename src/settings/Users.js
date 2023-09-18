// Users.js
import React, { useState } from 'react';
import UserTable from './UserTable'; // Import the UserTable component
import Header from '../dashboard/Header';
import Footer from '../dashboard/Footer';

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

  // State to hold the user data
  const [users, setUsers] = useState(initialUsers);

  // Callbacks for handling actions
  const handleDelete = (userToDelete) => {
    // Remove the user from the data array
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
  };

  const handleEdit = (editedUser) => {
    // Implement edit logic here (e.g., opening a modal for editing)
    console.log('Editing user:', editedUser);
  };

  const handleInsert = () => {
    // Implement insert logic here (e.g., opening a modal for adding a new user)
    console.log('Inserting a new user');
  };

  return (
    <div>
    <Header />
    <div className="Users">
      <h1>Uporabniki</h1>
      <div className="users-container-table">
         <UserTable data={users} onDelete={handleDelete} onEdit={handleEdit} onInsert={handleInsert} />
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Users;
