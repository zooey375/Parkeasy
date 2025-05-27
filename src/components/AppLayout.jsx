/* -----負責上下左右分區(結構)----- */

import Header from './Header';  // 匯入上方導覽列
import Sidebar from './Sidebar'; // 匯入左側功能選單
import MapPage from './MapPage';// 匯入右側主內容(設定地圖)


/* function AppLayout({ children }) { 是整個葉面框架的外殼，
{ children } 是React 特別的語法，代表可以把其他內容崁近來
 */
function AppLayout({ children }) {
    const layoutStyle = {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // 讓整個頁面佔滿視窗高度
    };
    
    const contentStyle = {
      display: 'flex',
      flex: 1,
      width: '100vw',
      marginTop: '60px', // 留出 Header 的高度
    }

    const mainStyle = {
        flex: 1,
        backgroundColor: '#f9f4ef', // 我選的背景色
        overflow:'hidden',
      };
    
   

      
    /* ------排版結構 render 區域------ */
    return (
        <>
            <Header />
            <div style= {{
                display: 'flex', 
                marginTop: '60px',
                width: '100vw',
                marginLeft: '0px',
                }}>
                <Sidebar />
                <main style={{ flex: 1}}>
                    {children}
                </main>
                <MapPage />
            </div>
        </>
    );


}

export default AppLayout;