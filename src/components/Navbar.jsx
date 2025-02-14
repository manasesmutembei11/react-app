// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import App from '../App';

const Navbar = () => {
    return (
        <div className="container mt-5">
            <nav>
                <h1>User Management App</h1>
                <Link to="/add-user" className="btn btn-primary mr-2">Add New User</Link>
                <Link to="/add-department" className="btn btn-secondary">Add New Department</Link>
            </nav>
        </div>

    );
};

export default Navbar;
