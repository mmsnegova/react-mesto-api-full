class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  handleError(err) {
    console.log(err);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._handleResponse(res));
  }

  setUserInfo({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    }).then((res) => this._handleResponse(res));
  }

  setUserAvatar({ avatar }, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    }).then((res) => this._handleResponse(res));
  }

  getCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._handleResponse(res));
  }

  addCard({ name, link }, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => this._handleResponse(res));
  }

  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id} `, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(id, like, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://api.mesto.mmsnegova.nomoredomains.icu"
});
export default api;
