import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const isAuthenticated = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('jwtToken');
      navigate('/login');
    };
  return (
    <div className="navbar">
      {!isAuthenticated && (
        <div className="nav-item login">
          <NavLink to="/login" className="nav-link" activeClassName="active">
            Login/Register
          </NavLink>
        </div>
      )}
      {isAuthenticated && (
        <div className="nav-item login">
          <NavLink
            to="/login"
            className="nav-link"
            activeClassName="active"
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </div>
      )}
      <nav>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link" activeClassName="active" exact>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tutorials" className="nav-link" activeClassName="active">
              Tutorials
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/request" className="nav-link" activeClassName="active">
              Requests
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/community" className="nav-link" activeClassName="active">
              Community
            </NavLink>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
            <NavLink to="/profile" className="nav-link" activeClassName="active">
                Profile
            </NavLink>
     </li>
      )}
        </ul>
      </nav>
      <NavLink to="/" className="navbar-brand">
        LEARNHUB
      </NavLink>
    </div>
  );
};

export default Navbar;
