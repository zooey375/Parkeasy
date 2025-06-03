import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FavoritesPage from './components/FavoritesPage';
import List from './components/List';
import Admin from './components/Admin';
import Logout from './components/Logout';
import MapPage from './components/MapPage';

function App() {
  return (
    <Router> {/* 開啟 React Router 的功能範圍 */}
     
      <Navbar /> {/* 導覽列會一直固定在上方 */}

      {/* 每個頁面都會顯示在導覽列下方 */}
      <div style={{ marginTop: '60px', height: 'calc(100vh - 60px)', width: '100%' }}>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/list" element={<List />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
