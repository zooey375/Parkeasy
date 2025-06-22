import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../components/AuthContext";

function useAuthGuard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      alert("請先登入");
      navigate("/login");
    }
  }, [user, navigate]);
}

export default useAuthGuard;
