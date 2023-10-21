import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';


import Navbar from './Navbar';
import SignUp from './SignUp';
import LogIn from './LogIn';
import LogOut from './LogOut';
import Dashboard from './Dashboard';

import HomePage from './HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<HomePage />} />
        
      </Routes>
    </div>
  );
}


export default App;
