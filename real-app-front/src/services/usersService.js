import httpService from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";

httpService.setDefaultCommonHeaders("x-auth-token", getJwt());

export function createUser(user) {
  return httpService.post(`${config.apiUrl}/users`, user);
}

export async function login(email, password) {
  const { data } = await httpService.post(`${config.apiUrl}/auth`, {
    email,
    password,
  });

  localStorage.setItem(TOKEN_KEY, data.token);
}

export function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function forgotPassword(email) {
  return httpService.post(`${config.apiUrl}/auth/forgot-password`, { email })
}

export function resetPassword(password, confirmPassword, token) {
  return httpService.post(`${config.apiUrl}/auth/reset-password`, { password, confirmPassword, token })
}

const usersService = {
  createUser,
  login,
  getJwt,
  logout,
  getUser,
  forgotPassword,
  resetPassword
};

export default usersService;
