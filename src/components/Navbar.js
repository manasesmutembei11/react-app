// src/components/Navbar.js
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
            <ul style={{ display: 'flex', gap: '10px' }}>
                <li><Link to="/" style={{ color: '#fff' }}>Home</Link></li>
                <li><Link to="/add" style={{ color: '#fff' }}>Add User</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
