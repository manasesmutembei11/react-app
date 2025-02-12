// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddUser = () => {
    setShowForm(true);
  };

  const handleSaveUser = (user) => {
    setUsers([...users, user]);
    setShowForm(false);
  };

  return (
    <div>
      <Navbar onAddUser={handleAddUser} />
      {showForm ? (
        <UserForm onSave={handleSaveUser} />
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
};

export default App;