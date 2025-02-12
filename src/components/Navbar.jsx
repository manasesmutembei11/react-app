// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ onAddUser }) => {
    return (
        <nav>
            <h1>User Management App</h1>
            <button onClick={onAddUser}>Add New User</button>
        </nav>
    );
};

export default Navbar;
