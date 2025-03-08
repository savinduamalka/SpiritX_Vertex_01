import React from 'react';
import { useNavigate } from 'react-router-dom';
import natureImage from "../assets/images/nature.png";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <div className="bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-lg border border-white border-opacity-20 text-center">
        <h1 className="text-white text-2xl font-semibold mb-4">Hello, {username}!</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none text-white placeholder-white placeholder-opacity-70 transition-all duration-200 ease-in-out transform active:scale-95 hover:bg-gray-300 hover:bg-opacity-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Landing;
