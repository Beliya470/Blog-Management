// import React, { useEffect } from 'react';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import * as apiService from "./apiService";


const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await apiService.logout();

        // await LogOut();
        localStorage.removeItem("token"); 
        navigate('/'); 
      } catch (err) {
        console.error("Error during logout", err);
        navigate('/login'); 
      }
    };

    handleLogout();
  }, [navigate]);

  return null; 
};

export default LogOut;
