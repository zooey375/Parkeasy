import Navbar from './components/Navbar';
import MapPage from './components/MapPage';

function App() {
  return (
    <>
      {/* 上方導覽列 */}
      <Navbar />

      {/* 下方地圖主畫面，留 marginTop 避開固定導覽列 */}
      <div style={{ marginTop: '60px', height: 'calc(100vh - 60px)', width: '100%' }}>
        <MapPage />
      </div>
    </>
  );
}

export default App;
