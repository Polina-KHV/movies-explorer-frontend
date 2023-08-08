export const BASE_URL = 'https://api.daechwita.nomoredomains.rocks';

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
    return res.ok ? res : Promise.reject(res)
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