import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from './apiService';
import './SignUp.css'; 

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    }, [successMessage, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await signUp(username, password);
            if (res.status === 201) {
                setSuccessMessage('User created successfully! Please proceed to login.');
            } else {
                setErrorMessage(res.message || 'Error during sign up. Please try again.');
            }
        } catch (error) {
            console.error("Error signing up:", error);
            setErrorMessage('Error during sign up. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {successMessage && 
                <p style={{ color: 'green', border: '1px solid green', padding: '10px', borderRadius: '5px' }}>
                    {successMessage}
                </p>
            }
            {errorMessage && 
                <p style={{ color: 'red', border: '1px solid red', padding: '10px', borderRadius: '5px' }}>
                    {errorMessage}
                </p>
            }
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
