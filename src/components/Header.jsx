import { useState } from 'react';

//import '/Header.css'; //若需要樣式可以引入css但我目前寫在下面


function Header() {
  const styles = {
    header: {
      position: 'fixed', // 固定在畫面上(不會跟著滑動)
      top: 0,
      left: 0,
      width: '100%', // 撐滿整個螢幕寬度
      height: '50px',
     /* [ 常見的「固定在最上方的導覽列」寫法 ]*/
      backgroundColor: '#eaddcf', // 背景顏色
      color: '#020826',           // Headline
      display: 'flex',
      justifyContent: 'space-between', // 左右兩側對齊，中間流空；flex-start 靠左
      alignItems: 'center',
      padding: '0 24px',
      zIndex: 1000, // 疊層順序:比其他元件高，避免被擋住
      borderBottom: '1px solid #eaddcf', // 下方加一條淡灰色邊框
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // 下方陰影，讓 header 有立體感
      flexWrap: 'wrap', // 保護在小畫面執行
    },

    /*----網站標題----*/ 
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#020826',
      marginRight: '40px', // 讓標題和導覽列有間距
      whiteSpace: 'nowrap',
      flexShrink: 0,

    },

    /*----右邊導覽選單----*/ 
    nav: {
      display: 'flex',
      gap: '20px', // 項目間距
      marginRight: '24px', //在左邊空出24px，看起來像整列往左推(重要!!)
      flexWrap: 'wrap', // 避免超出換行
      paddingingRight: '20px',
      maxWidth: '80%', // 限制不佔整個 header 寬度 

    },

    link: {
      color: '#020826',
      textDecoration: 'none',
      fontSize: '14px',
      padding: '6px 10px',
      borderRadius: '4px', // 圓角程度
      transition: 'background-color 0.2s',
    },

    /*----滑鼠移到連結上時的樣式----*/ 
    linkHover: {
      backgroundColor: '#8c7851',
      color: '#ffffff',
    }

  };

  return (
    <header style={styles.header}>
      <div style={styles.title}>ParkEasy</div>
      <nav style={styles.nav}>
        {["首頁", "個人頁面", "收藏停車場", "後台管理", "登入"].map((label, i) => {
          const hrefs = ["/", "/profile", "/admin", "/favorites", "/login"];
          return (
            <a key={i} href={hrefs[i]} style={styles.link}>{label}</a>
          );
        })}
      </nav>
    </header>
  );
  
}

export default Header;