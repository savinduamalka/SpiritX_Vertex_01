import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import natureImage from "../assets/images/nature.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
        setErrors({ ...errors, username: error.response.data.message });
      } else {
        console.error("Error logging in:", error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <div className="bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-lg border border-white border-opacity-20">
        <h2 className="text-white text-2xl font-semibold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none text-white placeholder-white placeholder-opacity-70"
              required
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none text-white placeholder-white placeholder-opacity-70"
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <FaEye className="text-white" size={20} />
              ) : (
                <FaEyeSlash className="text-white" size={20} />
              )}
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-white">Remember Me</label>
            </div>
          </div>
          
          <button type="submit" className="w-full p-3 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none text-white placeholder-white placeholder-opacity-70 transition-all duration-200 ease-in-out transform active:scale-95 hover:bg-gray-300 hover:bg-opacity-50">Login</button>
        </form>
        
        <div className="text-center text-white mt-4">
          <p>Don't have an account? <a href="/signup" className="underline">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
