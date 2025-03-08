import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './Login.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<App />} /> {/* Assuming App is currently your signup page */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
