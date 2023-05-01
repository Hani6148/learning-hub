// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md">
            <h5 className="text-white">LEARNHUB</h5>
            <p className="text-muted">Explore and create tutorials with ease.</p>
          </div>
          <div className="col-6 col-md">
            <h5 className="text-white">Links</h5>
            <ul className="list-unstyled text-muted">
              <li><a href="/" className="text-muted">Home</a></li>
              <li><a href="/tutorials" className="text-muted">Tutorials</a></li>
              <li><a href="/request" className="text-muted">Request</a></li>
              <li><a href="/profile" className="text-muted">Profile</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5 className="text-white">Contact</h5>
            <ul className="list-unstyled text-muted">
              <li><a href="mailto:info@example.com" className="text-muted">Email</a></li>
              <li><a href="tel:+123456789" className="text-muted">Phone</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="text-center text-muted">&copy; {new Date().getFullYear()} LEARNHUB. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
