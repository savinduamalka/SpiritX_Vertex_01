
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />

      <Route path="/" element={<Navigate to="/signup" />} /> 
    </Routes>
  );
};

export default App;

