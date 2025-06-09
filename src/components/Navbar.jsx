// Navbar as BsNavbar : 將 react-bootstrap 的 Navbar 取別名，避免與自訂的 Navbar 名稱打架。
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
<BsNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
          {/* 左上角 Logo，可點回首頁 */}
        <BsNavbar.Brand as={Link} to="/">PARKEASY</BsNavbar.Brand>
          {/* 手機版的展開按鈕 */}
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
          {/* 導覽列內容（右側連結） */}
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* ms-auto：往右靠齊 */}
            <Nav.Link as={Link} to="/">首頁</Nav.Link>
            <Nav.Link as={Link} to="/favorites">💜收藏頁面</Nav.Link>
            <Nav.Link as={Link} to="/list">停車場清單</Nav.Link>
            <Nav.Link as={Link} to="/admin">後台管理</Nav.Link>
            <Nav.Link as={Link} to="/logout">登出</Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;

    /*--- 自己刻的樣式 ---
      <nav className="top-navbar">
      <div className="logo">PARKEASY</div>
      <ul className="nav-links">
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorites">💜收藏頁面</Link></li>
        <li><Link to="/list">停車場清單</Link></li>
        <li><Link to="/admin">後台管理</Link></li>
        <li><Link to="/logout">登出</Link></li>
      </ul>
    </nav> */
 

