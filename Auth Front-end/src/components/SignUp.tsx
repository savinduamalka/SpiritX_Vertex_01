import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import natureImage from "../assets/images/new.jpg";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' | 'info' | 'warning' } | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setAlert({ message: "Passwords do not match", severity: "error" });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form Data Submitted:", response.data);
      setAlert({ message: "Signup Successful", severity: "success" });
      setTimeout(() => {
        navigate("/login"); // Navigate to login page on success
      }, 2000); // Delay navigation to allow alert to be visible
    } catch (error: any) {
      if (error.response) {
        console.error("Error:", error.response.data.message);
        setAlert({ message: error.response.data.message, severity: "error" });
      } else {
        console.error("Error submitting form data:", error.message);
        setAlert({ message: "Error submitting form data", severity: "error" });
      }
    }
  };

  const handleClose = () => {
    setAlert(null);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <div className="bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-lg border border-white border-opacity-20">
        <h2 className="text-white text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none text-white placeholder-white placeholder-opacity-70"
            required
          />

          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none text-white placeholder-white placeholder-opacity-70"
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <FaEye className="text-white" size={20} />
              ) : (
                <FaEyeSlash className="text-white" size={20} />
              )}
            </div>
          </div>

          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none text-white placeholder-white placeholder-opacity-70"
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <FaEye className="text-white" size={20} />
              ) : (
                <FaEyeSlash className="text-white" size={20} />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none text-white placeholder-white placeholder-opacity-70 transition-all duration-200 ease-in-out transform active:scale-95 hover:bg-gray-300 hover:bg-opacity-50"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-white mt-4">
          Already have an account? <a href="/login" className="underline">Login</a>
        </div>
      </div>
      {alert && (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default SignUp;
