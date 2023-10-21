import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      display: 'flex', 
      justifyContent: 'space-evenly', 
      padding: '10px 0', 
      background: 'linear-gradient(90deg, rgba(0,150,199,1) 0%, rgba(62,3,123,1) 100%)', // Gradient background
      boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.2)', // Shadow for depth
      borderRadius: '8px' // Rounded corners
    }}>
      <Link to="/" style={{
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        background: '#ffffff33', // Semi-transparent white
        color: 'white',
        transition: 'background 0.3s'
      }} 
      onMouseOver={e => e.target.style.background = "#ffffff88"}
      onMouseOut={e => e.target.style.background = "#ffffff33"}>
        Home
      </Link>
      <Link to="/signup" style={{
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        background: '#ffffff33',
        color: 'white',
        transition: 'background 0.3s'
      }}
      onMouseOver={e => e.target.style.background = "#ffffff88"}
      onMouseOut={e => e.target.style.background = "#ffffff33"}>
        Sign Up
      </Link>
      <Link to="/login" style={{
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        background: '#ffffff33',
        color: 'white',
        transition: 'background 0.3s'
      }}
      onMouseOver={e => e.target.style.background = "#ffffff88"}
      onMouseOut={e => e.target.style.background = "#ffffff33"}>
        Log In
      </Link>
      
      <Link to="/logout" style={{
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        background: '#ffffff33',
        color: 'white',
        transition: 'background 0.3s'
      }}
      onMouseOver={e => e.target.style.background = "#ffffff88"}
      onMouseOut={e => e.target.style.background = "#ffffff33"}>
        Log Out
      </Link>
      
      
    </nav>   
  );
}

export default Navbar;
