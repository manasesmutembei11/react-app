import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaBuilding, FaPlusSquare, FaList, FaBars } from 'react-icons/fa';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import Offcanvas from './offCanvas';

const Navbar = () => {
    return (
        <div className="container mt-5">
            <nav className="navbar" style={{ backgroundColor: '#85c1e9' }}>
                <div className="dropdown mr-3">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                    >
                        <FaBars className="me-2" /> Menu
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/users"><FaUsers /> Users</Link></li>
                        <li><Link className="dropdown-item" to="/departments"> <FaBuilding /> Departments</Link></li>
                        <li><Link className="dropdown-item" to="/subjects"> <FaBuilding /> Subjects</Link></li>
                        <li><Link className="dropdown-item" to="/counties"> <FaBuilding /> Counties</Link></li>
                    </ul>
                </div>


                <h1 className="navbar-brand">User Management App</h1>
                <div className="ml-auto d-flex">
                    <div className="dropdown mr-3">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            <FaUsers className="me-2" /> Users
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/add-user"><FaPlusSquare /> Add</Link></li>
                            <li><Link className="dropdown-item" to="/users"> <FaList /> List</Link></li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            <FaBuilding className="me-2" /> Departments
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/add-department"><FaPlusSquare /> Add</Link></li>
                            <li><Link className="dropdown-item" to="/departments"> <FaList /> List</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    );
};

export default Navbar;
