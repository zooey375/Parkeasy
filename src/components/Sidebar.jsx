
import './Sidebar.css';

function Sidebar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{
      width: '260px',
      padding: '24px',
      backgroundColor: '#D7C4BB',  //側邊欄顏色
      color: '#333', //側邊欄顏色
      fontSize: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
        <h2 style ={{ color: '#5E4C4C', marginBottom: '15px' }}>設定</h2>

        {/* 格位種類 */}
        <div>
            <label>格位種類</label><br />
            <select name="type" value={filters.type} onChange={handleChange} 
                className="select-box"> {/* 美化下拉選單 */}
                {/* 原本的: style={{ width: '100%', padding: '6px', marginTop: '4px'}}> */}
                <option value="">全部</option>
                <option value="機車格">機車格</option>
                <option value="汽車格">汽車格</option>
             </select>
        </div>

      {/* 是否友善 */}
        <div>
            <label>友善程度</label><br />
            <select name="friendly" value={filters.friendly} onChange={handleChange}
                className="select-box">
               {/* style={{ width: '100%', padding: '6px', marginTop: '4px'}}*/}
                <option value="">全部</option>
                <option value="true">是</option>
                <option value="false">否</option>
            </select>
        </div>

      {/* 收費方式 */}
        <div>
            <label>收費範圍</label><br />
            <select name="price" value={filters.price} onChange={handleChange}
                className="select-box">
                {/*style={{ width: '100%', padding: '6px', marginTop: '4px'}} */}
                <option value="">全部</option>
                <option value="免費">免費</option>
                <option value="每小時">每小時</option>
                <option value="每日">每日</option>
            </select>
        </div>

    </div>

  );
}

export default Sidebar;