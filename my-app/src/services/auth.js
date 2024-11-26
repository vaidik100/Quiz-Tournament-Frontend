import API from "./api";

export const login = async (credentials) => {
    const { data } = await API.post("/users/login", credentials);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);
    return data;
  };
  

export const register = async (userDetails) => {
  return API.post("/users/register", userDetails);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const isAuthenticated = () => !!localStorage.getItem("token");

export const getUserRole = () => localStorage.getItem("role");
