import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MemberListPage() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 畫面載入時，確認是否為 admin
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');

    if (user !== 'admin') {
      alert('❌ 此頁僅限管理員使用');
      navigate('/');
      return;
    }

    // 抓取所有會員資料
    axios.get('http://localhost:8086/api/members')
      .then((res) => {
        console.log('⭕ 成功取得會員資料:', res.data);
        setMembers(res.data);
      })
      .catch((err) => {
        console.error('❌ 取得會員失敗:', err);
        setError('無法載入會員資料，請稍後再試');
      });
  }, []);

  return (
    <Container className="my-4">
      <h2 className="mb-4">會員管理（僅限管理者）</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* 顯示所有會員資料 */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {members.map((member) => (
          <Col key={member.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{member.username}</Card.Title>
                <Card.Text>
                  📧 {member.email}<br />
                  🆔 ID：{member.id}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MemberListPage;
