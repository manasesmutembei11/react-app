// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import DepartmentForm from './components/departmentForm';
import DepartmentList from './components/departmentList';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/add-user" component={UserForm} />
        <Route path="/add-department" component={DepartmentForm} />
        <Route path="/users" component={UserList} />
        <Route path="/departments" component={DepartmentList} />
        <Route path="/" exact>
          <UserList />
          <DepartmentList />
        </Route>
      </Routes>
    </div>
  );
};

export default App;