import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="top-navbar">
  <div className="logo">Parkeasy</div>
  <ul className="nav-links">
    <li><a href="#">首頁</a></li>
    <li><a href="#">個人頁面</a></li>
    <li><a href="#">停車場清單</a></li>
    <li><a href="#">後台管理</a></li>
    <li><a href="#">登出</a></li>
  </ul>
</nav>
  );
}

export default Navbar;
