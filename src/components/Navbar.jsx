import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav('/login');
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">TaskManager</Link>
        <div className="space-x-3">
          {!user && (
            <>
              <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-blue-600 text-white rounded">Register</Link>
            </>
          )}
          {user && (
            <>
              <span className="mr-4">Hi, <strong>{user.name}</strong></span>
              <button onClick={handleLogout} className="px-3 py-1 border rounded">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
