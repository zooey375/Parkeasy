import { useEffect, useState } from "react";
import "./AdminParkingPage.css";

function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    username: "",
    password: "",
    email: "",
    role: "USER",
  });

  const isEditing = form.id !== null;

  // 取得會員列表
  const fetchUsers = () => {
    fetch("http://localhost:8086/api/admin/users", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("請先登入");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error("❌ 載入會員失敗", err.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 表單變更處理
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 表單送出：新增或修改
  const handleSubmit = () => {
    if (!form.username || !form.email || (!isEditing && !form.password)) {
      alert("請填寫完整欄位（密碼僅新增時必填）");
      return;
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:8086/api/admin/users/${form.id}`
      : "http://localhost:8086/api/admin/users";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    })
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        fetchUsers(); // 重新載入
        setForm({ id: null, username: "", password: "", email: "", role: "USER" });
      });
  };

  // 刪除會員
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

  // 編輯會員
  const handleEdit = (user) => {
    setForm({
      id: user.id,
      username: user.username,
      password: "", // 密碼不顯示
      email: user.email,
      role: user.role,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>會員管理</h2>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="admin-form">
        <input name="username" placeholder="帳號" value={form.username} onChange={handleChange} required />
        <input name="email" placeholder="信箱" value={form.email} onChange={handleChange} required />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="密碼（新增時填）"
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <div className="form-buttons">
          <button type="submit">{isEditing ? "更新" : "新增"}</button>
          <button type="button" onClick={() => setForm({ id: null, username: "", password: "", email: "", role: "USER" })}>
            清除
          </button>
        </div>
      </form>

        <table className="admin-table">
        <thead>
          <tr>
            <th>帳號</th>
            <th>信箱</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="action-buttons">
              {u.role !== "ADMIN" && (
                <>
                  <button onClick={() => handleEdit(u)}>編輯</button>
                  <button onClick={() => handleDelete(u.id)}>刪除</button>
                </>
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

