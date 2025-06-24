import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout components
import Navbar from './components/layout/Navbar'; // 共用元件
import Sidebar from "./components/layout/Sidebar";

// Page components
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import MapPage from './components/pages/MapPage';
import FavoritesPage from './components/pages/FavoritesPage';
import ParkingListPage from './components/pages/ParkingListPage';
import AdminPage from './components/pages/AdminPage';
import AdminUserPage from "./components/pages/AdminUserPage";
import AdminParkingPage from './components/pages/AdminParkingPage';
import EmailConfirmSuccess from "./components/pages/EmailConfirmSuccess";

// Common components
import ScrollToTop from './components/common/ScrollToTop';  // 自動捲到頂部的功能

// Contexts
import { AuthProvider } from './contexts/AuthContext'; // 要加大括號，表示「指定」來引入原本export出來的變數。

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
            <Route path="/admin/users" element={<AdminUserPage />} />
            <Route path="/admin/parkinglots" element={<AdminParkingPage />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>

  );
}

export default App;
