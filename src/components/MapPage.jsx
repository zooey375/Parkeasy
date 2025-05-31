import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
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
      .then((data) => setParkingLots(data));
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
            <Marker key={lot.id} position={[lot.latitude, lot.longitude]}>
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
