import { createContext, useState } from 'react';

// 建立 Context 物件
const AuthContext = createContext();

// 建立 Provider 元件
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

