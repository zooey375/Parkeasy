/* --- 後台管理頁面 --- */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './AdminPage.css';

function AdminPage() {
  const emptyLot = {
    name: '',
    type: '',
    friendly: '', // 避免 null
    price: '',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    mapUrl: '',
  };
  
  const [parkingLots, setParkingLots ] =useState([]);
  const [newLot, setNewLot] = useState({ ...emptyLot });
  const [editId, setEditId] = useState(null); // 正在編輯哪一筆資料。
  const [editData, setEditData] = useState({}); // 儲存目前正在編輯的內容。

  // ---- 抓取所有停車場資料 ----
  useEffect(() => {
    fetch("http://localhost:8086/api/parkinglots")  // 從後端(spring boot)用 http 去抓資料(GET請求)。
    .then((res) => res.json())  // 從後端回傳的資料格式(通常是)轉成javascript的物件。
    .then((data) => {
      console.log("⭕ 資料載入成功:", data);
      setParkingLots(Array.isArray(data) ? data : []); // 防呆處理
    })
    .catch((err) => {
      console.error("❌ 載入失敗:", err);
      setParkingLots([]); // []依賴陣列，空代表載入時只跑一次。
    });
  }, []);

  // 新增停車場資料
  const handleAdd = () => {
    // 守門員:會檢查newLot物件中，有沒有填寫name、type、price這三個欄位，只要一個沒有填寫就會跳出警告訊息，並用return中斷函式，不會繼續執行「送資料到後端」的動作。
    if (!newLot.name || !newLot.type || !newLot.price) {
        alert("請填寫必要欄位 (名稱、格位種類、價格) ");
        return;
    }
    
    fetch("http://localhost:8086/api/parkinglots", {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(newLot),
    })
    .then((res) =>res.json())
    .then((data) => {
      alert('新增成功');
      setParkingLots([...parkingLots, data]);
      setNewLot({ ...emptyLot });
    });
  };

  // 刪除停車場
    // 使用單引號 + 字串內的 ${id}，這樣不會正確插入變數 id，JavaScript 會把它當成普通文字處理，而不是變數。
    // 需要用 「模板字串（template literals）」，也就是「反引號 」搭配 ${變數}` 才能插值。
  const handleDelete = (id) => {
    fetch(`http://localhost:8086/api/parkinglots/${id}`, {
      method: 'DELETE',
    }).then(() => {
      alert('刪除成功');
      setParkingLots(parkingLots.filter((lot) => lot.id !== id));
    });
  };


  // 編輯資料
  const handleSaveEdit = (id) => {
    // 守門員:會檢查newLot物件中，有沒有填寫name、type、price這三個欄位，只要一個沒有填寫就會跳出警告訊息，並用return中斷函式，不會繼續執行「送資料到後端」的動作。
    if(!editData.name || !editData.type || !editData.price) {
      alert("請填寫必要欄位 (名稱、格位種類、價格) ");
      return;
    }

    fetch(`http://localhost:8086/api/parkinglots/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type' :'application/json' },
      body: JSON.stringify(editData),
    })
    .then((res) => res.json())
    .then((updatedLot) => {
	    alert('修改成功');
      setParkingLots(parkingLots.map((lot) => lot.id === id ? updatedLot : lot));
      setEditId(null);  // 離開編輯模式。
      setEditData({});  // 避免保留舊資料導致錯誤。
    });
  };

  // 通用輸入元件
  const renderInput = (key, value, onChange) => {
    if (key === 'type') {
      return (
        <select value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">請選擇格位種類</option>
          <option value="機車格">機車格</option>
          <option value="汽車格">汽車格</option>
        </select>
      );
    } else if (key === 'friendly') {
      return (
        <select 
        value={value === true ? "true" : value === false ? "false" : ""} 
        onChange={(e) => 
          onChange(e.target.value === "true")}>
          <option value="">請選擇友善程度</option>
          <option value="true">友善</option>
          <option value="false">不友善</option>
        </select>
      );
    } else {
      return (
        <input
          type="text"
          placeholder={key}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }
  };

  return (
    <div className="admin-container">
      <h2>後台管理 - 停車場資料管理</h2>

      {/* 新增會員管理按鈕 */}
      <Link to="/admin/users">
        <button style={{ marginBottom: "20px" }}>👥 會員管理</button>
      </Link>

      {/* 新增停車場表單 */}
      <div className="form-group">
        {Object.keys(newLot).map((key) => (
          <div className="form-field" key={key}>
            {renderInput(key, newLot[key], (val) => setNewLot({ ...newLot, [key]: val }))}
          </div> 
        ))}

        <button onClick={handleAdd}>新增停車場</button>
      </div>

      {/* 停車場列表 */}
      <ul className="lot-list">
        {Array.isArray(parkingLots) && parkingLots.map((lot) => (
          <li key={lot.id}>
            {editId === lot.id ? (
              <>
                {Object.keys(emptyLot).map((key) => (
                  <div className="form-field" key={key}>
                    {/* 可保證每個欄位都有，不會undefined/null */}
                    {renderInput(key, editData[key], (val) => setEditData({ ...emptyLot, ...lot }))}
                   {/*{renderInput(key, editData[key], (val) => setEditData({ ...editData, [key]: val }))} 如果lot中某些欄位是null會導致表單render時出錯*/}
                  </div>
                ))}
                <button onClick={() => handleSaveEdit(lot.id)}>儲存</button>
                <button onClick={() => setEditId(null)}>取消</button>
              </>
              ) : (
              <>
                <strong>{lot.name}</strong> ({lot.type}) - {lot.price}元/小時
                <button onClick={() => handleDelete(lot.id)}>刪除</button>
                <button onClick={() => {
                  setEditId(lot.id);
                  setEditData({ ...lot });
                }}>編輯</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;