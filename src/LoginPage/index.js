// LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:49273/hub/user/authenticate', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('jwtToken', response.data.jwt);
        window.location.href = '/';
      } else {
        setErrorMessage('Login failed. Please check your email and password.');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
                <div className="mt-3">
                  Don't have an account?{' '}
                  <Link to="/register" className="register-link">
                    Please register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-danger mt-3">{errorMessage}</div>
    </div>
  );
};

export default LoginPage;
