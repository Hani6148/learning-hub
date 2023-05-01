import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import RedirectIfAuthenticated from './RedirectIfAuthenticated';
import ProtectedRoute from './ProtectedRoute';
import TutorialCreator from './TutorialCreator';
import TutorialReader from './TutorialReader';
import TutorialUpdate from './TutorialUpdate';
import ConditionalFooter from './ConditionalFooter';
import Profile from './Profile';
import Dashboard from './Dashboard';
import TutorialRequestCreate from './TutorialRequestCreate';
import TutorialRequestEdit from './TutorialRequestEdit';
import Tutorials from './Tutorials';
import Requests from './Requests';
import RequestReadPage from './RequestReadPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content-wrapper"> {/* Add this div */}
          <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<RedirectIfAuthenticated component={LoginPage} />} />
          <Route path="/register" element={<RedirectIfAuthenticated component={RegisterPage} />} />
          <Route path="/request" element={<ProtectedRoute component={Requests} />} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/tutorials" element={<ProtectedRoute component={Tutorials} />} />
          <Route path="/createtutorial/:id" element={<ProtectedRoute component={TutorialCreator} />} />
          <Route path="/createtutorial" element={<ProtectedRoute component={TutorialCreator} />} />
          <Route path="/readtutorial/:id" element={<ProtectedRoute component={TutorialReader} />} />
          <Route path="/readrequest/:id" element={<ProtectedRoute component={RequestReadPage} />} />
          <Route path="/createrequest" element={<ProtectedRoute component={TutorialRequestCreate} />} />
          <Route path="/updatetutorial/:id" element={<ProtectedRoute component={TutorialUpdate} />} />
          <Route path="/updaterequest/:id" element={<ProtectedRoute component={TutorialRequestEdit} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
          </Routes>
        </div>
        <ConditionalFooter />
      </Router>
    </div>
  );
}

export default App;
