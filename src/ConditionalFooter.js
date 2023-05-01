import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

const ConditionalFooter = () => {
  const location = useLocation();
  const shouldRenderFooter = !['/createtutorial', '/updatetutorial'].some((path) =>
    location.pathname.startsWith(path)
  );

  return shouldRenderFooter ? <Footer /> : null;
};

export default ConditionalFooter;
