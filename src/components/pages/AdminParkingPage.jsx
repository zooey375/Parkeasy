import React, { useEffect, useState } from "react";
import "./AdminParkingPage.css";

function AdminParkingPage() {
  const [parkingLots, setParkingLots] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    type: "汽車格",
    friendly: false,
    price: "",
    description: "",
    address: "",
    mapUrl: "",
    latitude: "",
    longitude: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:8086/api/parkinglots/${formData.id}`
      : `http://localhost:8086/api/parkinglots`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isEditing) {
          setParkingLots(
            parkingLots.map((lot) => (lot.id === data.id ? data : lot))
          );
        } else {
          setParkingLots([...parkingLots, data]);
        }
        resetForm();
      })
      .catch((err) => console.error("❌ 儲存失敗:", err));
  };

  const handleEdit = (lot) => {
    setFormData(lot);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("確定要刪除這筆停車場資料嗎？")) return;

    fetch(`http://localhost:8086/api/parkinglots/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.text())
    .then((msg) => {
      alert(msg);
      // 從前端列表移除
      setParkingLots((prev) => prev.filter((lot) => lot.id !== id));
    });
};


  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      type: "汽車格",
      friendly: false,
      price: 0,
      description: "",
      address: "",
      mapUrl: "",
      latitude: "",
      longitude: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="admin-container">
      <h2>停車場管理</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="名稱" required />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="汽車格">汽車格</option>
          <option value="機車格">機車格</option>
        </select>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="friendly"
            checked={formData.friendly}
            onChange={handleChange}
          />
          友善
        </label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="價格" />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="說明" />

        <input name="address" value={formData.address} onChange={handleChange} placeholder="地址" className="span-2" />
        <input name="mapUrl" value={formData.mapUrl} onChange={handleChange} placeholder="Google Map 連結" className="span-2" />

        <input name="latitude" value={formData.latitude} onChange={handleChange} placeholder="緯度" />
        <input name="longitude" value={formData.longitude} onChange={handleChange} placeholder="經度" />

        <div className="form-buttons">
          <button type="submit">{isEditing ? "更新" : "新增"}</button>
          <button type="button" onClick={resetForm}>清除</button>
        </div>
      </form>

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
              <td className="action-buttons">
                <button onClick={() => handleEdit(lot)}>編輯</button>
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
