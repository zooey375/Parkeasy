//npm install leaflet react-leaflet@4.2.1
/* -----地圖區塊----- */

import React, { useEffect, useState } from 'react';
/*MapContainer 地圖容器；Marker, Popup 是地圖上的圖標與訊息框*/ 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';




// 修正 leaflet 預設 icon 顯示問題
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// 調整圖標的預設樣式(L=Leaflet地圖函式庫)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});



// 自訂圖標（已放到 public/images/parking-icon.png）
const customIcon = new L.Icon({
  iconUrl: '/images/parking-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});


// 暫時靜態資料（可改成從後端 fetch）
const staticSpots = [
  // {
  //   id: 1,
  //   lng: 121.618863,
  //   lat: 25.055327,
  //   name: "(禁止)嘟嘟房停車場捷運南港展覽館站(機車格)",
  //   description: "雙北捷運系統不允許重機停機車格",
  //   address: "115台北市南港區經貿一路1102號"
   
    

  // },
  // {
  //   id: 2,
  //   name: "(30/d)南港展覽館2館機車停車場",
  //   lat: 25.0701,
  //   lng: 121.5191,
  //   type: "黃P"
  // },
  // {
  //   id: 3,
  //   name: "台北市大安區 建國南路高架橋下",
  //   lat: 25.0336,
  //   lng: 121.5432,
  //   type: "綠P"
  // }
];

const MapPage = () => {
  const [spots, setSpots] = useState([]);

  //  預備用來連後端 API（目前用靜態資料）
  useEffect(() => {
    // fetch('/api/parkings')  // ← 若未來有後端可以改這行
    //   .then(res => res.json())
    //   .then(data => setSpots(data))
    //   .catch(err => console.error('載入失敗', err));

    setSpots(staticSpots); // 現階段先顯示假資料
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer
        center={[25.0478, 121.5319]} // 台北市中心
        zoom={15}
        scrollWheelZoom={true}
        className="map-container"
        style={{ height: '100vh', width: '100%' }} //重要 
      >
        
        <TileLayer
          attribution='&copy; Carto'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        />

        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.lat, spot.lng]}
            icon={customIcon}
          >
            <Popup>
              {spot.name}<br />
              類型：{spot.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 地圖圖例 */}
      <div className="map-legend">
        <h4>圖例</h4>
        <div><span className="legend-color green"></span> 綠P</div>
        <div><span className="legend-color yellow"></span> 黃P</div>
      </div>
    </div>
  );
};

export default MapPage;

