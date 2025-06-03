import { useEffect, useState } from 'react';
import axios from 'axios';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const userId = 1; // 模擬登入使用者 ID

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
  }, []);

  // 取消收藏
  const removeFavorite = (parkingLotId) => {
    axios.delete(`/api/favorites/remove`, {
      params: { userId, parkingLotId }
    }).then(() => {
      setFavorites(prev => prev.filter(f => f.parkingLotId !== parkingLotId));
    }).catch(err => {
      console.error('😿 移除收藏失敗:', err);
    });
  };
    
  return (
    <div style={{ padding: '20px' }}>
      <h2>💜 我的收藏清單</h2>
      {Array.isArray(favorites) && favorites.length ===0 ? (
        <p>目前沒有收藏任何停車場。</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favorites.map(fav => (
            <li key={fav.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>
              <p><strong>停車場編號：</strong>{fav.parkingLotId}</p>
              <button onClick={() => removeFavorite(fav.parkingLotId)}>💔 取消收藏</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
