// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
