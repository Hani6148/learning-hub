import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const navigate = useNavigate();
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    return token !== null;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return isAuthenticated() ? <Component {...props} /> : null;
};

export default ProtectedRoute;
