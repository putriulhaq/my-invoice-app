// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link to="/form" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Form Invoice
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;