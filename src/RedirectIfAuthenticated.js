import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ component: Component, ...props }) => {
  const navigate = useNavigate();
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    return token !== null;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return isAuthenticated() ? null : <Component {...props} />;
};

export default RedirectIfAuthenticated;
