import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">AgriRisk Management</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/scheduler">Scheduler</Link>
                </li>
                <li>
                    <Link to="/chatbot">Chatbot</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
