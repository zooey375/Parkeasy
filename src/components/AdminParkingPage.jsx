import React, { useEffect, useState } from "react";
import "./AdminParkingPage.css";

function AdminParkingPage() {
  const [parkingLots, setParkingLots] = useState([]);

  // 載入停車場資料
  useEffect(() => {
    fetch("http://localhost:8086/api/parkinglots")
      .then((res) => res.json())
      .then((data) => {
        setParkingLots(data);
      })
      .catch((err) => {
        console.error("❌ 載入失敗:", err);
        setParkingLots([]);
      });
  }, []);

  // 刪除停車場
  const handleDelete = (id) => {
    if (!window.confirm("確定要刪除這筆停車場資料嗎？")) return;

    fetch(`http://localhost:8086/api/parkinglots/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setParkingLots(parkingLots.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error("❌ 刪除失敗:", err);
      });
  };

  return (
    <div className="admin-container">
      <h2>停車場管理</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>名稱</th>
            <th>類型</th>
            <th>友善</th>
            <th>價格</th>
            <th>地址</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {parkingLots.map((lot) => (
            <tr key={lot.id}>
              <td>{lot.id}</td>
              <td>{lot.name}</td>
              <td>{lot.type}</td>
              <td>{lot.friendly ? "✅" : "❌"}</td>
              <td>{lot.price} 元</td>
              <td>{lot.address}</td>
              <td>
                <button onClick={() => handleDelete(lot.id)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminParkingPage;
