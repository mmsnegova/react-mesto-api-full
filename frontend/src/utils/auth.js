export const BASE_URL = "https://api.mesto.mmsnegova.nomoredomains.icu";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .then((response) => {
      return response;
    });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .then((response) => {
      if (response.token) {
        localStorage.setItem("token", response.token);
        return response;
      } else {
        return;
      }
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
