// ---- 頁面切換時自動捲到頂部」的功能 ---

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/**
 * 每次頁面路徑改變（例如從 / 換到 /favorites），
 * 就會觸發 window.scrollTo(0, 0)，讓畫面自動回到最上方
 */
function ScrollToTop() {
  const { pathname } = useLocation();  // 取得目前頁面的路徑（例如："/favorites"）

  useEffect(() => {    // 每當 pathname 改變（也就是跳轉頁面時），就會捲到最上面
    window.scrollTo(0, 0);
  }, [pathname]);  // 依賴項是 pathname，只要網址變了就執行一次

  return null;   // 這個元件不需要回傳畫面內容，只要執行副作用（scroll）即可
}

export default ScrollToTop;