/* -----左側功能列----- */

function Sidebar() {
    const styles = {
        sidebar: {
            width:'240px',
            backgroundColor: '#eaddcf', // 我選的側邊欄背景色
            color: '#eaddcf',
            padding: '24px',
            height: 'calc(100vh - 60px)',// Sidebar 高度扣掉 Header，不然會超出頁面

            boxSizing: 'border-box',// 加這行確保 padding 不會把寬度撐爆
        },

        section: {
            marginBottom: '20px',
        },

        label: {
            display: 'block',
            marginBottom: '6px',
            fontWeight: 'bold',
            color: '#eaddcf',
        },

        select: {
            width: '100%',
            padding: '6px',
            backgroundColor: '#8c7851',
            color: '#ffffff',
            border: '1px solid #eaddcf',
            borderRadius: '4px',
           // fontSize: '14px',
        },
        title: { 
            fontSize: '18px',
            fontWeight:'bold',
            marginBottom: '16px',
            color: '#020826', // 我選的標題顏色
        }

    };

    return (
    <aside style={styles.sidebar}>
      <div style={styles.title}>設定</div>

      <div style={styles.section}>
        <label style={styles.label}>格位種類</label>
        <select style={styles.select}>
          <option>全部</option>
          <option>機車</option>
          <option>汽車</option>
        </select>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>友善程度</label>
        <select style={styles.select}>
          <option>全部</option>
          <option>友善</option>
          <option>不友善</option>
        </select>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>收費範圍</label>
        <select style={styles.select}>
          <option>全部</option>
          <option>免費</option>
          <option>小時</option>
          <option>每日</option>
        </select>
      </div>
    </aside>
  );
}

export default Sidebar;