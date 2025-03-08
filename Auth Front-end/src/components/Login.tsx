import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login Successful:", response.data);
      sessionStorage.setItem('username', username); // Store username in session
      navigate("/landing"); // Navigate to landing page on success
    } catch (error: any) {
      if (error.response) {
        console.error("Error:", error.response.data.message);
      } else {
        console.error("Error logging in:", error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type={passwordVisible ? 'text' : 'password'} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              <i className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i> 
            </span>
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <a href="#" className="forgot-password">Forgot Your Password?</a>
          </div>
          
          <button type="submit" className="auth-submit-btn">Login</button>
        </form>
        
        <div className="auth-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>

      </div>
    </div>
  );
};

export default Login;
