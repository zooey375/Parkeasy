import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // 共用元件
import MapPage from './components/MapPage';
import FavoritesPage from './components/FavoritesPage';
import ParkingListPage from './components/ParkingListPage';
import AdminPage from './components/AdminPage';
import LogoutPage from './components/LogoutPage';


function App() {
  return (
    <Router> {/* 開啟 React Router 的功能範圍 */}
     
      <Navbar /> {/* 導覽列會一直固定在上方 */}

      {/* 每個頁面都會顯示在導覽列下方 */}
      <div style={{ marginTop: '60px', height: 'calc(100vh - 60px)', width: '100%' }}>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/list" element={<ParkingListPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        
        </Routes>
        
      </div>
      
    </Router>
  );
}

export default App;
