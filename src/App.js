// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import DepartmentForm from './components/departmentForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [departments, setDepartments] = useState([]);

  const handleAddUser = () => {
    setShowForm(true);
  };

  const handleAddDepartment = () => {
    setShowForm(true);
  };

  const handleSaveUser = (user) => {
    setUsers([...users, user]);
    setShowForm(false);
  };

  const handleSaveDepartment = (department) => {
    setUsers([...departments, department]);
    setShowForm(false);
  };

  return (
    <div>
      <Navbar onAddUser={handleAddUser} />
      {showForm ? (
        <UserForm onSave={handleSaveUser} />
      ) : (
        <UserList users={users} />
      )},
      {showForm ? (
        <DepartmentForm onSave={handleSaveDepartment} />
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
};

export default App;