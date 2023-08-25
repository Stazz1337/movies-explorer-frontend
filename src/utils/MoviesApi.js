import { BASE_URL_MOVIES } from './Consts';

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  getMovies() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: BASE_URL_MOVIES,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
