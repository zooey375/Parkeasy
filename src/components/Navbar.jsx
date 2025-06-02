import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="top-navbar">
      <div className="logo">PARKEASY</div>
      <ul className="nav-links">
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/profile">個人頁面</Link></li>
        <li><Link to="/list">清單</Link></li>
        <li><Link to="/admin">管理</Link></li>
        <li><Link to="/logout">登出</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
