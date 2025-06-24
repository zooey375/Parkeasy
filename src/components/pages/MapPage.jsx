import { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';  //設定 icon、地圖圖層的核心
import 'leaflet/dist/leaflet.css';
import Sidebar from '../layout/Sidebar'; // 左側篩選欄元件
import axios from 'axios'; //npm install axios(負責與後端溝通的套件（GET/POST/DELETE))
import AuthContext from '../../contexts/AuthContext';

// Leaflet 預設圖示設定修正（讓 Marker 正常顯示 Leaflet 的預設圖示，否則會顯示錯誤的問號）
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
  iconAnchor: [16, 32], // 圖示的「底部中央」會貼在座標點上。
  popupAnchor: [0, -32],  //定義「彈出視窗」與圖示之間的相對位置。
});

// 不可停車圖示-不友善（friendly = false）
const cannotParkIcon = new L.Icon({
  iconUrl: '/images/noparking-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});


function MapPage() {
  const [filters, setFilters] = useState({ type: '', 
    friendly: '', 
    minprice: '', 
    maxprice: '' 
  });

  const [parkingLots, setParkingLots] = useState([]);
  const [favorites, setFavorites] = useState([]); // 收藏的停車場列表
  const { user } = useContext(AuthContext); // 從 context 取得使用者
  const userId = user?.id;

  // 載入使用者收藏清單（只有登入才執行）
  useEffect(() => {
    if (!user) return;

    axios.get("http://localhost:8086/api/favorites/favorites", {
      withCredentials: true
    })
      .then((res) => {
        const ids = res.data.map(fav => fav.parkingLotId); // 取得收藏ID清單
        setFavorites(ids);
      })
      .catch((err) => {
        console.error("❌ 載入收藏失敗:", err);
      });
  }, [user]);

  // 收藏／取消收藏
  const toggleFavorite = (parkingLotId) => {
    if (!userId) {
      alert('請先登入後再使用收藏功能');
      return;
    }

    if (favorites.includes(parkingLotId)) {
      axios.delete(`http://localhost:8086/api/favorites/${parkingLotId}`, {
        withCredentials: true
      })
        .then(() => {
          setFavorites(prev => prev.filter(id => id !== parkingLotId));
        })
        .catch(err => {
          console.error('❌ 取消收藏失敗:', err);
        });
    } else {
      axios.post(`http://localhost:8086/api/favorites/${parkingLotId}`, null, {
        withCredentials: true
      })
        .then(() => {
          setFavorites(prev => [...prev, parkingLotId]);
        })
        .catch(err => {
          console.error('❌ 加入收藏失敗:', err);
        });
    }
  };

  // 抓取停車場資料（不論是否登入）
  useEffect(() => {
    const query = new URLSearchParams();
    if (filters.type) query.append('type', filters.type);
    if (filters.friendly) query.append('friendly', filters.friendly);
    if (filters.minprice) query.append('minprice', filters.minprice);
    if (filters.maxprice) query.append('maxprice', filters.maxprice);

    const url = `http://localhost:8086/api/parkinglots/search?${query.toString()}`;
    console.log('傳送查詢網址:', url);

    fetch(url, {
      credentials: 'include' // 若登入則附帶 cookie
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setParkingLots(data);
        } else {
          console.warn('⚠️ 回傳非陣列:', data);
          setParkingLots([]);
        }
      })
      .catch((err) => {
        console.error('❌ 抓取停車場失敗:', err);
        alert('無法連線到後端，請確認 Spring Boot 是否啟動');
      });
  }, [filters]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', margin: 0 }}>
      <Sidebar filters={filters} setFilters={setFilters} />
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

          {Array.isArray(parkingLots) && parkingLots.map((lot) => {
            if (!lot.latitude || !lot.longitude) return null;
            const iconToUse = lot.friendly ? canParkIcon : cannotParkIcon;
            const isFavorited = favorites.includes(lot.id);

            return (
              <Marker key={lot.id} position={[lot.latitude, lot.longitude]} icon={iconToUse}>
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
                    {isFavorited ? '💔 取消收藏' : '❤️ 加入收藏'}
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

