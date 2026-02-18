import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  _id: string; // Mongoose ID
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.warn("⚠️ No token found in localStorage, skipping auto-login.");
        setLoading(false);
        return;
      }

      try {
        console.log("📩 Checking session with token:", token);
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("✅ Authenticated user:", data.user);
          setUser(data.user);
        } else {
          console.warn("⚠️ Auth check failed:", res.status);
          setToken(null);
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("❌ Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("📩 Login request:", { email });
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        console.log("✅ Login successful, token:", data.token);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        return true;
      }

      console.warn("⚠️ Login failed:", data);
      return false;
    } catch (err) {
      console.error("❌ Login failed", err);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      console.log("📩 Register request:", { username, email });
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        console.log("✅ Registration successful, token:", data.token);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        return true;
      }

      console.warn("⚠️ Registration failed:", data);
      return false;
    } catch (err) {
      console.error("❌ Registration failed", err);
      return false;
    }
  };

  const logout = async () => {
    console.log("👋 Logging out user");
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};