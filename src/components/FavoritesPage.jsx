import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; //使用navigate
import axios from 'axios'; // 用來發送 HTTP 請求的套件(類似fetch但更方便)
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function FavoritesPage() {  
  // 加入收藏
  const [favorites, setFavorites] = useState([]);
  const userId = 1;
  const navigate = useNavigate(); // 導頁功能，可以在程式裡用程式碼切換頁面，不需要使用者點選<link>才跳轉。

  // 載入使用者收藏的資料
  useEffect(() => {
    axios.get(`http://localhost:8086/api/favorites/${userId}`)
    //axios.get(`/api/favorites/${userId}`) <-錯誤，會打到 React 自己
      .then((res) => {
        console.log('🪄 成功載入收藏清單:', res.data);
        setFavorites(res.data);
      })
      .catch((err) => {
        console.error('😿 載入收藏清單失敗:', err);
      });
  }, [navigate]);

  // 取消收藏
  const removeFavorite = (parkingLotId) => {
    axios.delete(`http://localhost:8086/api/favorites/${userId}/${parkingLotId}`)
    .then(() => {
      // 用 id 判斷是否移除成功(不是 parkingLotId)
      setFavorites(prev => prev.filter(fav=> fav.id !== parkingLotId));
    })
    .catch(err => {
      console.error('😿 移除收藏失敗:', err);
    });
  };
    
  return (
    <Container className="my-4">
      <h2 className="mb-4">💜 我的收藏清單</h2>
      {favorites.length === 0 ? (
        <p>目前沒有收藏任何停車場。</p>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {favorites.map((fav) => (
            <Col key={fav.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{fav.name}</Card.Title>
                  <Card.Text>
                    📍 類型 : {fav.type} <br />
                    😺友善 : {fav.friendly ? '😻 是' : '😿 否'} <br />
                    💰 收費 : {fav.price} 元<br />
                    🏠 地址 : 
                    <a href={fav.mapUrl} target="_blank" rel="noreferrer">🗺️GoogleMap
                    </a><br />
                    📝 備註 : {fav.description}

                  </Card.Text>
                  <Button variant="danger" onClick={() => removeFavorite(fav.id)}>
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
