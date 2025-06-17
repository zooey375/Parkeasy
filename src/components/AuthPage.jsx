import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  const navigate = useNavigate();

  // 處理表單輸入變動
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 處理登入
  const handleLogin = () => {
    axios.post('http://localhost:8086/api/members/login', formData)
      .then((res) => {
        const result = res.data;

        if (result.message === '登入成功') {
            localStorage.setItem('loggedInUser', result.username);
            localStorage.setItem('isAdmin', result.isAdmin);
            localStorage.setItem('userId', result.id);  // result.id 是後端回傳的使用者 ID。
            setMessage('登入成功');
            setIsSuccess(true);
            setTimeout(() => {
              window.location.href = "/"; // 強制瀏覽器重新載入頁面，Navbar 也會馬上顯示登入狀態!
            }, 1000); 
        } else {
            setMessage(result.message);
            setIsSuccess(false);
        }
    })

    .catch((err) => {
      console.error('登入失敗:', err);
      setMessage('登入失敗，請稍後再試');
      setIsSuccess(false);
    });

  }

  // 處理註冊
  const handleRegister = () => {
    axios.post('http://localhost:8086/api/members/register', formData)
      .then((res) => {
        const result = res.data;
        setMessage(result);
        setIsSuccess(result === '註冊成功');
      })
      .catch(() => {
        setMessage('註冊失敗，請檢查伺服器');
        setIsSuccess(false);
      });

    };

  return (
    <Container style={{ maxWidth: '500px', marginTop: '80px' }}>
      <h2 className="mb-4 text-center">註冊及登入</h2>

      {/* 顯示提示訊息 */}
      {message && (
        <Alert variant={isSuccess ? 'success' : 'danger'}>
          {message}
        </Alert>
      )}

      {/* 使用 Card 讓區塊有邊框和陰影 */}
      <Card className="p-4 shadow-sm border rounded">
        <Form>
          {/* 帳號輸入 */}
          <Form.Group className="mb-3">
            <Form.Label>使用者名稱</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="請輸入帳號"
              required
            />
          </Form.Group>

          {/* 密碼輸入 */}
          <Form.Group className="mb-3">
            <Form.Label>使用者密碼</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="請輸入密碼"
              required
            />
          </Form.Group>

          {/* 按鈕群組：登入與註冊 */}
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleLogin}>
              登入
            </Button>
            <Button variant="primary" onClick={handleRegister}>
              註冊
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default AuthPage;
