import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // 本來一連上後端畫面就會閃白，結果加了Marker, Popup 畫面就成功了!
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


function MapPage() {
  const [filters, setFilters] = useState({ type: '', friendly: '', price: '' });
  const [parkingLots, setParkingLots] = useState([]);

 // 自訂地圖圖示放在這裡
  const customIcon = new L.Icon({
    iconUrl: '/images/parking-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });


  useEffect(() => {
    // 抓資料...
    const query = new URLSearchParams();
    if (filters.type) query.append('type', filters.type);
    if (filters.friendly) query.append('friendly', filters.friendly);
    if (filters.price) query.append('price', filters.price);

    const url = query.toString() === ''
      ? 'http://localhost:8086/parking-lots'
      : `http://localhost:8086/parking-lots/search?${query.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setParkingLots(data))
      .catch((err) => console.error('資料仔入失敗:', err)); //即使資料庫斷線也不會報錯

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

          {parkingLots.map(lot => (
            <Marker key={lot.id} 
            position={[lot.latitude, lot.longitude]}  // 使用經緯度來設定標記位置
            icon={ customIcon } // 使用自訂圖示(map 圖示)
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
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
