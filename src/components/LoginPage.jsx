import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";


const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8086/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // 若後端用 session，需要帶上 cookie
      });

      const result = await response.json();

      if (response.ok) {
        setUser(result.data); 
        alert(" 登入成功！");
        navigate("/"); // 導向首頁或其他你想導向的頁面
      } else {
        setError(result.message || "登入失敗");
      }
    } catch (error) {
      console.error("錯誤:", error);
      setError("伺服器錯誤，請稍後再試");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>登入帳號</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>帳號:</label><br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>密碼:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>
          登入
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "15px" }}>{error}</p>
      )}
    </div>
  );
};

export default LoginPage;
