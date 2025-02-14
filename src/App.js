// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import DepartmentForm from './components/departmentForm';
import DepartmentList from './components/departmentList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowForm] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);

  const handleAddUser = () => {
    setShowForm(true);
    setShowDepartmentForm(false);
  };

  const handleAddDepartment = () => {
    setShowForm(false);
    setShowDepartmentForm(true);
  };

  const handleSaveUser = (user) => {
    setUsers([...users, user]);
    setShowForm(false);
  };

  const handleSaveDepartment = (department) => {
    setDepartments([...departments, department]);
    setShowForm(false);
  };

  return (
    <div>
      <Navbar onAddUser={handleAddUser} onAddDepartment={handleAddDepartment} />
      {showUserForm && <UserForm onSave={handleSaveUser} />}
      {showDepartmentForm && <DepartmentForm onSave={handleSaveDepartment} />}
      {!showUserForm && !showDepartmentForm && (
        <div>
          <UserList users={users} />
          <DepartmentList departments={departments} />
        </div>
      )}
    </div>
  );
};

export default App;