import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormInvoice from './pages/form'
import Dashboard from './pages/dashboard'


function App() {

  return (
    <>
      <Router>
      <div className="flex w-screen">
        <Sidebar />
        <div className="flex w-full bg-orange-700 mx-5 overflow-hidden">
          <Routes>
            <Route path="/form" element={<FormInvoice />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
