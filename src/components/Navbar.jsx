import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="top-navbar">
      <div className="logo">PARKEASY</div>
      <ul className="nav-links">
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorites">💜收藏頁面</Link></li>
        <li><Link to="/list">停車場清單</Link></li>
        <li><Link to="/admin">後台管理</Link></li>
        <li><Link to="/logout">登出</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
