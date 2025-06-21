// Navbar as BsNavbar : 將 react-bootstrap 的 Navbar 取別名，避免與自訂的 Navbar 名稱打架。
import { useContext } from 'react';
import { Navbar as BsNavbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import './Navbar.css';



function Navbar() {
  const { user, setUser } = useContext(AuthContext);  // 取得登入狀態
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:8086/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUser(null); // 清除登入狀態
      navigate("/login"); // 導回登入頁
    });
  };


  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
          {/* 左上角 Logo，可點回首頁 */}
        <BsNavbar.Brand as={Link} to="/">PARKEASY</BsNavbar.Brand>

          {/* 手機版展開按鈕 */}
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

          {/* 導覽列內容（右側連結） */}
        <BsNavbar.Collapse id="basic-navbar-nav">
          {/* ms-auto：往右靠齊 */}
          <Nav className="ms-auto"> 

             {/* 共用頁面連結 */}
              <Nav.Link as={Link} to="/">首頁</Nav.Link>
              <Nav.Link as={Link} to="/favorites">💜收藏頁面</Nav.Link>
              <Nav.Link as={Link} to="/list">停車場清單</Nav.Link>
          
          {/* 管理員限定功能（只有 ADMIN 看得到) */}
            {user?.role === "ADMIN" && (
                <NavDropdown title="後台管理" id="admin-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/admin/users">會員管理</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/parkinglots">停車場管理</NavDropdown.Item>
                </NavDropdown>
              )}
              
          {/* 根據登入狀態顯示內容 */}
            {user ? (
              <>
                <span style={{ 
                  color: "white", 
                  marginLeft: "1rem",
                  marginTop: "6px",
                  display: "inline-block",
                  }}>
                  👋 歡迎，{user.username}
                  </span>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={handleLogout} 
                  style={{ marginLeft: "10px" }}>
                  登出
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={() => 
                  navigate("/login")} 
                  style={{ marginLeft: "10px" }}>
                  登入
                </Button>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={() => 
                  navigate("/register")} 
                  style={{ marginLeft: "10px" }}>
                  註冊
                </Button>
              </>
            )}

          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

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
 

