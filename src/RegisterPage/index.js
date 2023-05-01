// RegisterPage.js
import React from 'react';
import { useState } from 'react';
import './RegisterPage.css';
import axios from 'axios';
const RegisterPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const registerUser = async (event) => {

        event.preventDefault();
    
        const newUser = {
          email: event.target.email.value,
          fullName: event.target.fullName.value,
          phone: event.target.phone.value,
          password: event.target.password.value,
        };
    
        try {
          const response = await axios.post('http://localhost:49273/hub/user/create', newUser);
          if (response.status === 200) {
            // Display success message and redirect to login page after 1 second
            alert('User created successfully');
            setTimeout(() => {
              window.location.href = '/login';
            }, 1000);
          } else {
            setErrorMessage('Registration failed');
          }
        } catch (error) {
            setErrorMessage('Registration failed');
        }
      };
  return (
    <div className="register-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Register</h3>
                <form onSubmit={registerUser}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input type="email" className="form-control" id="email" name="email" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                        Full Name
                    </label>
                    <input type="text" className="form-control" id="fullName" name="fullName" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone
                    </label>
                    <input type="text" className="form-control" id="phone" name="phone" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input type="password" className="form-control" id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                    Register
                    </button>
                </form>
                <div className="text-danger mt-3">{errorMessage}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default RegisterPage;
