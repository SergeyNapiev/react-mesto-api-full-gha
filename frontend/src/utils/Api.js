class Api {
  constructor(server) {
    this._server = server;
  }

  // карточки
  getCardList(token) {
    return fetch(`${this._server}/cards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }
  // новая карточка

  addNewCard(item, token) {
    return fetch(`${this._server}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(this._checkResponse)
  }
  // удалить карточку
  removeCardFromServer(id, token) {
    return fetch(`${this._server}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  };


  changeLikeCardStatus(cardId, isLiked, token) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._server}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
  }
  // профиль получаем данные
  getUserInfo(token) {
    return fetch(`${this._server}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._checkResponse)
  }
  // профиль изменить данные
  setUserInfo(item,token) {
    return fetch(`${this._server}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
      .then(this._checkResponse)
  }

  // установить аватар
  setUserAvatar(item, token) {
    return fetch(`${this._server}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

}



const api = new Api(
  'https://api.sergeynapiev.nomoredomainsmonster.ru',
);

export default api;