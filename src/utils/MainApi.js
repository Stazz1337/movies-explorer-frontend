class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  setUserInfo(name, email, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  getUserMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  saveMovie(newInputValues, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: newInputValues.country,
        nameRU: newInputValues.nameRU,
        image: newInputValues.image,
        trailerLink: newInputValues.trailerLink,
        duration: newInputValues.duration,
        director: newInputValues.director,
        year: newInputValues.year,
        description: newInputValues.description,
        thumbnail: newInputValues.thumbnail,
        movieId: newInputValues.movieId,
        nameEN: newInputValues.nameEN,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(movieId, token) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
