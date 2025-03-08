import React, { useState } from 'react';
import '../App.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
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
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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