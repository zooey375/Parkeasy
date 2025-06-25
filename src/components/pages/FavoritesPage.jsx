import { useEffect, useState, useContext } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import useAuthGuard from '../../hooks/useAuthGuard'; 
import AuthContext from '../../contexts/AuthContext';

function FavoritesPage() {
  useAuthGuard();

  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);
  //const navigate = useNavigate();

  // 載入收藏
  useEffect(() => {
    fetch(`http://localhost:8086/api/favorites/favorites`, {
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
  }, []);

  // 移除收藏
  const removeFavorite = (parkingLotId) => {
    fetch(`http://localhost:8086/api/favorites/${parkingLotId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('刪除失敗');
        setFavorites((prev) =>
          prev.filter((fav) => fav.id !== parkingLotId)
        );
      })
      .catch((err) => {
        console.error('❌ 刪除錯誤:', err);
        alert('刪除收藏失敗，請稍後再試');
      });

  };

  return (
     <Container className="my-4">
      <h2 className="mb-4">我的收藏</h2>

      {favorites.length === 0 ? (
        <p>目前尚未收藏任何停車場。</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {favorites.map((fav) => (
              <Col key={fav.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{fav.name}</Card.Title>
                    <Card.Text>
                      📍 類型 : {fav.type} <br />
                      😺 友善 : {fav.friendly ? '😻 是' : '😿 否'} <br />
                      💰 收費 : {fav.price} 元<br />
                      🏠 地址 :
                      <a href={fav.mapUrl} target="_blank" rel="noreferrer">
                        🗺️ GoogleMap
                      </a>
                      <br />
                      📝 備註 : {fav.description}
                    </Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => removeFavorite(fav.id)}
                    >
                      💔 移除收藏
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default FavoritesPage;

