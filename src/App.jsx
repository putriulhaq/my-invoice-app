import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormInvoice from './pages/form'


function App() {

  return (
    <>
      <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10">
          <Routes>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/form" element={<FormInvoice />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
