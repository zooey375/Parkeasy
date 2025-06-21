import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; // 共用元件
import MapPage from './components/MapPage';
import FavoritesPage from './components/FavoritesPage';
import ParkingListPage from './components/ParkingListPage';
import AdminPage from './components/AdminPage';
import RegisterPage from './components/RegisterPage';
import EmailConfirmSuccess from "./components/EmailConfirmSuccess";
import LoginPage from './components/LoginPage';
import { AuthProvider } from './components/AuthContext'; // 要加大括號，表示「指定」來引入原本export出來的變數。

import ScrollToTop from './components/ScrollToTop';  // 自動捲到頂部的功能

function App() {


  return (
    <AuthProvider> {/* 包住整個 App，提供登入狀態 */}
      <Router> {/* 開啟 React Router 的功能範圍 */}
        <ScrollToTop /> {/* 每次切換頁面時自動捲到頂部 */}
        <Navbar /> {/* 導覽列會一直固定在上方 */}

        {/* 每個頁面都會顯示在導覽列下方 */}
        <div style={{ marginTop: '60px', height: 'calc(100vh - 60px)', width: '100%' }}>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/list" element={<ParkingListPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/EmailConfirmSuccess" element={<EmailConfirmSuccess />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>

  );
}

export default App;
