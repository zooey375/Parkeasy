import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from './Sidebar'; // 左側篩選欄元件
import axios from 'axios'; //npm install axios

// Leaflet 預設圖示設定修正（不修正會出現圖示不顯示錯誤）
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/*-----自訂圖示設定-----*/
// 可停車圖示-友善（friendly = true）
const canParkIcon = new L.Icon({
  iconUrl: '/images/parking-icon.png', // 放在 public/images/
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// 不可停車圖示-不友善（friendly = false）
const cannotParkIcon = new L.Icon({
  iconUrl: '/images/noparking-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// 調整價錢： minprice 和 maxprice 改成下拉式選單
/*const query = new URLSearchParams();
if(filters.type) query.append('type', filters.friendly);
if(filters.friendly) query.append('friendly', filters.friendly);
if(filters.minprice) query.append('minprice', filters.minprice);
if(filters.maxprice) query.append('maxprice', filters.maxprice);
*/

function MapPage() {
  const [filters, setFilters] = useState({ type: '', 
    friendly: '', 
    minprice: '', 
    maxprice: '' 
  });

  const [parkingLots, setParkingLots] = useState([]);
  const [favorites, setFavorites] = useState([]); // 收藏的停車場列表
  const userId = 1; // ← 之後登入功能完成可改為動態 userId

 // 載入收藏清單
  useEffect(() => {
    axios.get(`http://localhost:8086/api/favorites/${userId}`)
      .then((res) => {
        const data = res.data;
        console.log('✅ 成功收藏清單:', data);

        if(Array.isArray(data)) {
          const favoriteIds = data.map(fav => fav.parkingLotId);
          setFavorites(favoriteIds);
        } else {
          console.warn('⚠️ 後端回傳的收藏資料不是陣列:', data);
          setFavorites([]); // 避免地圖 map 出錯  
        }
      })
      .catch(err => {
        console.error('❌ 載入收藏失敗:', err);
      });

  },[]);

  // 當 filters 改變時，重新向後端抓資料
  useEffect(() => {
    const query = new URLSearchParams();
    if (filters.type) query.append('type', filters.type);
    if (filters.friendly) query.append('friendly', filters.friendly);
    if (filters.minprice) query.append('minprice', filters.minprice);
    if (filters.maxprice) query.append('maxprice', filters.maxprice);

    const url = `http://localhost:8086/parking-lots/search?${query.toString()}`;
    console.log('傳送查詢網址:', url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
      console.log('🎯 成功抓到資料:', data);

        if (Array.isArray(data)) {
          setParkingLots(data);
        }else {
          setParkingLots([]); // 避免地圖 map 出錯
          console.warn('⚠️ 後端回傳的資料不是陣列:', data);
        }
      })
      .catch((err) => {
        console.error('❌ 抓資料失敗:', err);
        alert('無法連線到後端，請確認 Spring Boot 是否啟動');
      });
    },[filters]);

// 切換收藏狀態(重要)
  const toggleFavorite = (parkingLotId) => {
    if (favorites.includes(parkingLotId)) {
      axios.delete(`http://localhost:8086/api/favorites/${userId}/${parkingLotId}`)
        .then(() => {
          setFavorites(prev => prev.filter(id => id !== parkingLotId));
        })
        .catch(err => {
          console.error('❌ 移除收藏失敗:', err);
        });
    } else { //尚未收藏->加入收藏
      axios.post(`http://localhost:8086/api/favorites/add`, null, {
        params: { userId, parkingLotId }
      })
        .then(() => {
          setFavorites(prev => [...prev, parkingLotId]);
        })
        .catch(err => {
          console.error('❌ 加入收藏失敗:', err);
        });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', margin: 0 }}>
      {/* 左側篩選欄位 */}
      <Sidebar filters={filters} setFilters={setFilters} />

      {/* 右側地圖主畫面 */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[25.04, 121.56]}
          zoom={13}
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          />

            {/* 顯示每個停車場地標 */}
            {Array.isArray(parkingLots) && 
              parkingLots.map((lot) => {
               if (!lot.latitude || !lot.longitude) return null; // 防呆：無經緯度就不畫
                const iconToUse = lot.friendly ? canParkIcon : cannotParkIcon;// 根據是否友善決定圖示

                return (
                  <Marker
                    key={lot.id}
                   position={[lot.latitude, lot.longitude]}
                   icon={iconToUse}>
                    <Popup>
                      <strong>{lot.name}</strong><br />
                      類型：{lot.type}<br />
                      友善：{lot.friendly ? '😻 是' : '😿 否'}<br />
                      收費：{lot.price}<br />
                      地址：<a href={lot.mapUrl} target="_blank" rel="noreferrer">GoogleMap</a><br />
                      備註：{lot.description}<br />
                      <button
                        onClick={() => toggleFavorite(lot.id)}
                        style={{ marginTop: '8px', padding: '4px 8px', borderRadius: '6px' }}
                      >
                        {favorites.includes(lot.id) ? '💔 取消收藏' : '❤️ 加入收藏'}
                      </button>
                    </Popup>
                  </Marker>
              );
            })}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;

