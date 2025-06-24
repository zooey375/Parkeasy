import React from "react";
import { useNavigate } from "react-router-dom";

const EmailConfirmSuccess = () => {
  const navigate = useNavigate();

  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h2 style={{ color: "green", fontSize: "2rem" }}>✅ 信箱驗證成功！</h2>
      <p style={{ margin: "1rem 0", fontSize: "1.2rem" }}>
        您的信箱已成功驗證，現在可以登入系統。
      </p>
      <button
        onClick={handleGoLogin}
        style={{
          padding: "0.6rem 1.2rem",
          fontSize: "1rem",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        前往登入
      </button>
    </div>
  );
};

export default EmailConfirmSuccess;
