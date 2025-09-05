import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  function register(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === email)) {
      alert("User already exists");
      return false;
    }
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    const publicUser = { email };
    setUser(publicUser);
    localStorage.setItem("user", JSON.stringify(publicUser));
    return true;
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      alert("Invalid credentials");
      return false;
    }
    const publicUser = { email };
    setUser(publicUser);
    localStorage.setItem("user", JSON.stringify(publicUser));
    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

