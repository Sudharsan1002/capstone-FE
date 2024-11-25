import {  createContext, useContext, useEffect, useState } from "react";
import { useApi } from "./Apicontext";
import { useNavigate } from "react-router-dom";

const Authcontext = createContext()

export const useAuth = ()=> useContext(Authcontext)


export const Authprovider = ({ children }) => {
  const { post, get } = useApi();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await post("auth/login", { email, password });
      const { token, id, email:userEmail, role,name:userName } = response.data;
      setToken(token);
      setUser({ id, email:userEmail, role ,name:userName});

      localStorage.setItem("token", token);

      if (role === "client") {
        navigate("/client");
      } else if (role === "counselor") {
        navigate("/counselor");
      } else {
        console.error("Invalid user role");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Auto-login using token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // Verify the token on the server
      const verifyToken = async () => {
        try {
          const response = await get("auth/verify");
          setUser(response.user);
          setToken(storedToken);
        } catch (error) {
          console.error("Token verification failed:", error);
          logout(); // If token is invalid, log out the user
        } finally {
          setLoading(false);
        }
      };
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [get]);
    
    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>
}