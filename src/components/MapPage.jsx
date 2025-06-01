import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from './Sidebar'; // 左側篩選欄元件

// Leaflet 預設圖示設定修正（不修正會出現圖示不顯示錯誤）
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

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

function MapPage() {
  const [filters, setFilters] = useState({ type: '', friendly: '', price: '' });
  const [parkingLots, setParkingLots] = useState([]);

  // 當 filters 改變時，重新向後端抓資料
  useEffect(() => {
    const query = new URLSearchParams();
    if (filters.type) query.append('type', filters.type);
    if (filters.friendly) query.append('friendly', filters.friendly);
    if (filters.price) query.append('price', filters.price);

    const url = query.toString() === ''
      ? 'http://localhost:8086/parking-lots'
      : `http://localhost:8086/parking-lots/search?${query.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ 成功抓到資料:', data);
        setParkingLots(data);
      })
      .catch((err) => {
        console.error('❌ 抓資料失敗:', err);
        alert('無法連線到後端，請確認 Spring Boot 是否啟動');
      });
  }, [filters]);

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
          {parkingLots.map((lot) => {
            // debug Log
            console.log(' friendly 值:' , lot.friendly, '類別:',typeof lot.friendly);

            // 防呆：無經緯度就不畫
            if (!lot.latitude || !lot.longitude) return null;

            // 根據是否友善決定圖示
            const iconToUse = lot.friendly ? canParkIcon : cannotParkIcon;

            return (
              <Marker
                key={lot.id}
                position={[lot.latitude, lot.longitude]}
                icon={iconToUse}
              >
                <Popup>
                  <strong>{lot.name}</strong><br />
                  類型：{lot.type}<br />
                  友善：{lot.friendly ? '✅ 是' : '❌ 否'}<br />
                  收費：{lot.price}<br />
                  地址：<a href={lot.mapUrl} target="_blank" rel="noreferrer">查看地圖</a><br />
                  備註：{lot.description}
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

