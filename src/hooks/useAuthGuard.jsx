// hooks 放「自己寫的邏輯小工具」
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; //使用navigate

/* 自定義的登入檢查函式，只要在頁面中呼叫，就會自動判斷是否登入。 */
function useAuthGuard() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (!user) {
            alert("請先登入!");
            navigate('/auth');  //未登入就會跳轉去登入頁
        }
    }, [navigate]);
}

export default useAuthGuard;