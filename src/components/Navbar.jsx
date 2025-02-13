// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ onAddUser }) => {
    return (
        <div className="container mt-5">
            <nav>
                <h1>User Management App</h1>
                <button className="btn btn-primary" onClick={onAddUser}>Add New User</button>
            </nav>

        </div>

    );
};

export default Navbar;
