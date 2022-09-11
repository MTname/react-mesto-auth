class Api {
    constructor(url) {
        this._url = url;
        this._headers = {
            authorization: '0b7fb7af-1d7f-4272-ab93-c41201325a22',
            'Content-Type': 'application/json' 
        };
    }
    
    _handleResJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Возникла ошибка: ${res.status}`); // если ошибка, отклоняем промис
    }
    
    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this._handleResJson);
    }
    
    getUser() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._handleResJson);
    }
    
    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        })
        .then(this._handleResJson);
    }
    
    addCard(data) {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(this._handleResJson);
    }
    
    deleteCard(cardId) {
         return fetch(`${this._url}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
        .then(this._handleResJson);
    }
    
    switchLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: isLiked ? 'DELETE' : 'PUT',
        })
        .then(this._handleResJson);
    }
    
    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Возникла ошибка: ${res.message}`);
        });
    }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-45');
export default api;
