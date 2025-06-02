
import './Sidebar.css';

function Sidebar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

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

      {/* 收費範圍 */}
      <div className="filter-group">
        <label>收費範圍</label>
        <select
          value={filters.maxprice}
          onChange={(e) => setFilters({ ...filters, maxprice: e.target.value })}
          className="select-box"
        >
          <option value="">全部</option>
          {[...Array(11)].map((_, i) => {
            const value = i * 10;
            return (
              <option key={value} value={value}>
                {`0 ~ ${value} 元`}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Sidebar;
