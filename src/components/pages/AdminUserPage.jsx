import { useEffect, useState } from "react";

function AdminUserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8086/api/admin/users", {
      credentials: "include",
    })
     .then((res) => {
      if (!res.ok) {
        throw new Error("請先登入");
      }
      return res.json();
    })
    .then((data) => {
      console.log("✅ 載入會員成功", data);
      setUsers(data);
    })
    .catch((err) => {
      console.error("❌ 載入會員失敗", err.message);
    });
}, []);


  const handleDelete = (id) => {
    if (!window.confirm("確定要刪除此會員嗎？")) return;

    fetch(`http://localhost:8086/api/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        setUsers((prev) => prev.filter((u) => u.id !== id));
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>會員管理</h2>
      <table 
        border="1" 
        cellPadding="8" 
        style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>帳號</th>
            <th>信箱</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== "ADMIN" && (
                  <button onClick={() => handleDelete(u.id)}>刪除</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserPage;
