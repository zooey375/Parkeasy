// Navbar as BsNavbar : 將 react-bootstrap 的 Navbar 取別名，避免與自訂的 Navbar 名稱打架。
import { useEffect, useState } from 'react';

import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

   // ✅ 當頁面載入時，檢查 localStorage 裡有沒有登入者
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    const admin = localStorage.getItem('isAdmin'); // "true" or "false"
    if (user) {
      setUsername(user);
      setIsAdmin(admin === "true"); // 字串比對
    }
  }, []);
  
  // 登出功能
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');  
    setUsername(null); // 清空狀態
    setIsAdmin(false);
    navigate('/auth'); // 登出後導去首頁
  };

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
            {username ? (
              <>
                <Nav.Link as={Link} to="/">首頁</Nav.Link>
                <Nav.Link as={Link} to="/favorites">💜收藏頁面</Nav.Link>
                <Nav.Link as={Link} to="/list">停車場清單</Nav.Link>

                {/* 僅 admin 可看到後台功能 */}
                {isAdmin && (
                  <>
                    <Nav.Link as={Link} to="/admin">後台管理</Nav.Link>
                    <Nav.Link as={Link} to="/members">會員管理</Nav.Link>
                  </>
                )}
                {/* 顯示歡迎文字 */}
                <div className="d-flex align-items-center mx-2 text-white">
                  👋 {username} 歡迎回來 !
                </div>
            
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  登出
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/auth">登入/註冊</Nav.Link>
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
 

