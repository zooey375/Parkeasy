import { useEffect, useState, useContext } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import useAuthGuard from '../hooks/useAuthGuard'; 
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

function FavoritesPage() {
  useAuthGuard();

  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8086/api/favorites`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error("未登入或無法取得資料");
        return res.json();
      })
      .then((data) => {
        console.log('🪄 收藏載入成功:', data);
        setFavorites(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('❌ 載入收藏失敗:', err);
        setFavorites([]);
      });
  }, [user, navigate]);

  const removeFavorite = (parkingLotId) => {
    fetch(`http://localhost:8086/api/favorites/${parkingLotId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('刪除失敗');
        setFavorites((prev) =>
          prev.filter((fav) => fav.parkingLot.id !== parkingLotId)
        );
      })
      .catch((err) => {
        console.error('❌ 刪除錯誤:', err);
      });
  };

  return (
    <Container className="favorites-page mt-4">
      <h2 className="mb-4">我的收藏</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {favorites.map((fav) => (
          <Col key={fav.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{fav.parkingLot.name}</Card.Title>
                <Card.Text>
                  📍 類型 : {fav.parkingLot.type} <br />
                  😺 友善 : {fav.parkingLot.friendly ? '😻 是' : '😿 否'} <br />
                  💰 收費 : {fav.parkingLot.price} 元<br />
                  🏠 地址 :
                  <a href={fav.parkingLot.mapUrl} target="_blank" rel="noreferrer">
                    🗺️ GoogleMap
                  </a>
                  <br />
                  📝 備註 : {fav.parkingLot.description}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => removeFavorite(fav.parkingLot.id)}
                >
                  💔 移除收藏
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FavoritesPage;

