
function Header() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #ccc',
      fontWeight: 'bold',
      fontSize: '16px'
    }}>
      {/* 左側導覽按鈕 */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <a href="#" style={{ textDecoration: 'none', color: '#333' }}>首頁</a>
        <a href="#" style={{ textDecoration: 'none', color: '#333' }}>個人頁面</a>
        <a href="#" style={{ textDecoration: 'none', color: '#333' }}>停車場清單</a>
        <a href="#" style={{ textDecoration: 'none', color: '#333' }}>後台管理</a>
        <a href="#" style={{ textDecoration: 'none', color: '#333' }}>登出</a>
      </div>

      {/* 右側 LOGO 名稱 */}
      <div style={{ fontSize: '20px', color:rgb(112, 143, 193) }}>
        Parkeasy
      </div>
    </div>
  );
}

export default Header;
