// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import DepartmentForm from './components/departmentForm';
import DepartmentList from './components/departmentList';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/add-department" element={<DepartmentForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/" element={<UserList />} />

        </Routes>

      </BrowserRouter>


    </div>
  );
};

export default App;