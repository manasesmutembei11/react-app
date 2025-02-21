import React from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare, FaList } from "react-icons/fa";

const Offcanvas = () => {
    const handleNavClick = () => {
        const offcanvasElement = document.getElementById("offcanvasNavbar");
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
            offcanvasInstance.hide();
        }
    };
    return (
        <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body">
                <div className="list-group">
                    <Link
                        to="/add-user"
                        className="list-group-item list-group-item-action"
                        onClick={handleNavClick}
                    >
                        <FaPlusSquare className="me-2" /> Add User
                    </Link>
                    <Link
                        to="/users"
                        className="list-group-item list-group-item-action"
                        onClick={handleNavClick}
                    >
                        <FaList className="me-2" /> List Users
                    </Link>
                    <Link
                        to="/add-department"
                        className="list-group-item list-group-item-action"
                        onClick={handleNavClick}
                    >
                        <FaPlusSquare className="me-2" /> Add Department
                    </Link>
                    <Link
                        to="/departments"
                        className="list-group-item list-group-item-action"
                        onClick={handleNavClick}
                    >
                        <FaList className="me-2" /> List Departments
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Offcanvas;