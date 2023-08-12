import { BASE_URL } from "../constants/config";

function makeRequest(url, method, body) {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  };

  const config = {
    method,
    headers,
    credentials: 'include',
  };

  if (body) {
    config.body = JSON.stringify(body)
  };

  return fetch(`${BASE_URL + url}`, config)
  .then(((res) => {
    return res.ok ? res.json() : Promise.reject(res)
  }))
};

export function register(name, email, password) {
  return makeRequest('/signup', 'POST', {name, email, password})
};

export function authorize(email, password) {
  return makeRequest('/signin', 'POST', {email, password})
};

export function getContent() {
  return makeRequest('/users/me', 'GET')
};

export function logout() {
  return makeRequest('/signout', 'POST')
};