import axios from "@lib/axios.js";

const m_prefix = `${window.location.protocol}//${window.location.hostname}:3000`;

function checkArg(text, name) {
  if (!("string" === typeof text && text.length > 0)) {
    throw new Error({ message: `wrong ${name || "argument"}` });
  }
}

function login(username, password) {
  try {
    checkArg(username, "username");
    checkArg(password, "password");
  } catch (e) {
    return Promise.reject(e);
  }

  return axios(`${m_prefix}/user/login`, { method: "POST", data: { username, password } });
}

function logout() {
  return axios(`${m_prefix}/user/logout`, { method: "POST" });
}

function register(username, password) {
  try {
    checkArg(username, "username");
    checkArg(password, "password");
  } catch (e) {
    return Promise.reject(e);
  }

  return axios(`${m_prefix}/user/register`, { method: "POST", data: { username, password } });
}

function remove(username) {
  try {
    checkArg(username, "username");
  } catch (e) {
    return Promise.reject(e);
  }

  return axios(`${m_prefix}/user/remove`, {
    method: "POST",
    data: { username: username || localStorage.getItem("username") },
  });
}

function check() {
  return axios(`${m_prefix}/user/check`, { method: "POST" });
}

function users() {
  return axios(`${m_prefix}/user/users`, { method: "GET" });
}

export default { login, logout, register, remove, check, users };
