// 側邊欄
import './Sidebar.css';


function Sidebar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // 預設價格選項(調整為兩個下拉式選單，讓使用者自由選擇價錢)
  const priceOptions = Array.from({ length: 11 }, (_, i) => i *10);  

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">設定</h2>

      {/* 格位種類 */}
      <div className="filter-group">
        <label>格位種類</label>
        <select name="type" value={filters.type} onChange={handleChange} className="select-box">
          <option value="">全部</option>
          <option value="機車格">機車格</option>
          <option value="汽車格">汽車格</option>
        </select>
      </div>

      {/* 是否友善 */}
      <div className="filter-group">
        <label>友善程度</label>
        <select name="friendly" value={filters.friendly} onChange={handleChange} className="select-box">
          <option value="">全部</option>
          <option value="true">是</option>
          <option value="false">否</option>
        </select>
      </div>

      {/* 收費範圍:調整成下拉式自由選單 */}
      <div className="filter-group">
        <label className="price-range-label">收費範圍(元)</label>
        <div className="price-select-row"> {/* 選單橫向排版 */}
          <select
            name="minprice"
            value={filters.minprice}
            onChange={(e) =>setFilters({ ... filters, minprice: e.target.value })}
            className="select-box">
            {[0, 10, 20, 30, 40, 50].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>

          <span className="price-separator"> ~ </span> {/* 選單橫向排版 */}
          <select
            name="maxprice" 
            value={filters.maxprice} 
            onChange={(e) => setFilters({ ...filters, maxprice: e.target.value })} 
            className="select-box">
            {[50, 60, 70, 80, 90, 100].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 圖示說明框 */}
      <div className="legend-box">
        <h3 className="legend-title">圖示說明</h3>
        <div className="legend-item">
          <img src="/images/parking-icon.png" alt="友善圖示" className="legend-icon" />
          <span>友善停車場</span>
        </div>
        <div className="legend-item">
          <img src="/images/noparking-icon.png" alt="不友善圖示" className="legend-icon" />
          <span>不友善停車場</span>
        </div>
      </div>
      
    </div>
  );
}

export default Sidebar;
