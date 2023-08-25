import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/Auth';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from '../../utils/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState('');

  const [apiError, setApiError] = useState('');

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]); // карточки после запроса

  const [savedMovies, setSavedMovies] = useState([]); // сохраненные карточки

  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]); // сохраненные карточки фильтр

  const [searchQuery, setSearchQuery] = useState(''); // основной запрос

  const [searchQuerySaved, setSearchQuerySaved] = useState(''); // запрос из сохраненных

  const [notFound, setNotFound] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isShortFilm, setIsShortFilm] = useState(false);

  const [isShortFilmSaved, setIsShortFilmSaved] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [token, setToken] = useState(null);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  const [editSuccess, setEditSuccess] = useState(false);

  // login

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        setIsSubmitButtonDisabled(false);

        localStorage.setItem('jwt', data.token);

        setToken(data.token);

        setCurrentUser(data);

        setIsLoggedIn(true);

        setApiError('');

        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitButtonDisabled(false);
        let errorMessage;

        if (err.includes('400')) {
          errorMessage = 'Вы ввели неправильный логин или пароль.';
        } else if (err.includes('401')) {
          errorMessage =
            'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';
        } else if (err.includes('403')) {
          errorMessage =
            'При авторизации произошла ошибка. Переданный токен некорректен.';
        }

        setApiError(errorMessage);

        setTimeout(() => {
          setApiError(null);
        }, 1000);
      });
  }

  // register

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        setIsSubmitButtonDisabled(false);
        setApiError('');

        handleLogin(email, password).then((data) => {
          localStorage.setItem('jwt', data.token);
          setToken(data.token);
          navigate('/movies');
        });
      })
      .catch((err) => {
        setIsSubmitButtonDisabled(false);
        console.log(err);

        let errorMessage;

        if (err.includes('409')) {
          errorMessage = 'Пользователь с таким email уже существует.';
        } else {
          errorMessage = 'При регистрации пользователя произошла ошибка.';
        }

        setApiError(errorMessage);

        setTimeout(() => {
          setApiError(null);
        }, 1000);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    setToken(jwt);
    if (jwt) {
      // проверим токен
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            setIsLoggedIn(true);
            // navigate('/');
            setCurrentUser(res);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // моунт данных при логине

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getUserInfo(token), mainApi.getUserMovies(token)])
        .then(([userData, userCards]) => {
          setCurrentUser(userData);
          setSavedMovies(userCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, token]);

  // запрос на поиск карточек + сохраненных

  useEffect(
    () => {
      setSearchQuery(localStorage.getItem('searchQuery') || '');
      setIsShortFilm(localStorage.getItem('isShortFilm') === 'true');
      setCards(JSON.parse(localStorage.getItem('results')) || []);

      if (isSubmitted) {
        if (location.pathname === '/movies') {
          moviesApi
            .getMovies()
            .then((data) => {
              if (data.length === 0) {
                setNotFound(true);
              } else {
                let filteredMovies = data.filter(
                  (item) =>
                    item.nameRU
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    item.nameEN
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                );

                if (isShortFilm) {
                  filteredMovies = filteredMovies.filter(
                    (item) => item.duration <= 40
                  );
                }

                if (filteredMovies.length === 0) {
                  setNotFound(true);
                } else {
                  const results = filteredMovies.map((item) => ({
                    country: item.country,
                    nameRU: item.nameRU,
                    image: 'https://api.nomoreparties.co' + item.image.url,
                    trailerLink: item.trailerLink,
                    duration: item.duration,

                    director: item.director,
                    year: item.year,
                    description: item.description,
                    thumbnail:
                      'https://api.nomoreparties.co' +
                      item.image.formats.thumbnail.url,
                    movieId: item.id,
                    nameEN: item.nameEN,
                  }));

                  localStorage.setItem('searchQuery', searchQuery);
                  localStorage.setItem('isShortFilm', isShortFilm);
                  localStorage.setItem('results', JSON.stringify(results));

                  setCards(results);
                  // console.log(results);
                  setNotFound(false);
                }
              }
            })
            .catch((err) => {
              console.error(err);
              setErrorMessage(
                'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
              );
            })
            .finally(() => {
              setIsSubmitted(false);
              setSearchQuery('');
            });
        } else {
          //если путь saved-movies

          if (savedMovies.length === 0) {
            setNotFound(true);
          } else {
            let filteredMovies = savedMovies.filter(
              (item) =>
                item.nameRU
                  .toLowerCase()
                  .includes(searchQuerySaved.toLowerCase()) ||
                item.nameEN
                  .toLowerCase()
                  .includes(searchQuerySaved.toLowerCase())
            );

            if (isShortFilmSaved) {
              filteredMovies = filteredMovies.filter(
                (item) => item.duration <= 40
              );
            }

            if (filteredMovies.length === 0) {
              setNotFound(true);
            } else {
              setSavedFilteredMovies(filteredMovies);

              setNotFound(false);
            }
          }

          setIsSubmitted(false);
          setSearchQuerySaved('');
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSubmitted, isShortFilm]
  );

  // рендер сохраненных при смене рута

  useEffect(() => {
    if (
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies'
    ) {
      setSavedFilteredMovies(savedMovies);
      setNotFound(false); // ?
      setIsShortFilmSaved(false); // ?
    }
  }, [savedMovies, location.pathname]);

  // сохранить карточку в апи

  const saveMovie = (movie) => {
    mainApi
      .saveMovie(movie, token)
      .then((data) => {
        setSavedMovies((prev) => [...prev, data]);
        console.log(savedMovies);
      })
      .catch((err) => console.log(err));
  };

  // удалить карточку из апи

  const deleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId, token)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((movie) => {
            return movie._id !== movieId;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  // обработчик формы поиска

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery === '') {
      setErrorMessage('Нужно ввести ключевое слово');
      return;
    }
    setIsSubmitted(true);
  };

  // обработка ввода

  const handleChange = (value) => {
    console.log('handleChange', location.pathname);
    if (location.pathname === '/movies') {
      setSearchQuery(value);
    } else {
      setSearchQuerySaved(value);
    }

    setErrorMessage('');
  };

  // обработчик клика свичтера на главной

  const handleSwitcher = () => {
    setIsShortFilm(!isShortFilm);

    localStorage.setItem('isShortFilm', !isShortFilm);
  };

  const handleSwitcherSaved = () => {
    setIsShortFilmSaved(!isShortFilmSaved);
  };

  // редактировать юзера, сохранить в апи

  function handleUpdateUser(name, email) {
    mainApi
      .setUserInfo(name, email, token)
      .then((res) => {
        setIsSubmitButtonDisabled(false);
        setEditSuccess(true);
        setTimeout(() => {
          setEditSuccess(false);
        }, 1000);
        setCurrentUser(res);
        setApiError('');
      })
      .catch((err) => {
        setIsSubmitButtonDisabled(false);
        console.log(err);
        let errorMessage;

        if (err.includes('409')) {
          errorMessage = 'Пользователь с таким email уже существует.';
        } else {
          errorMessage = 'При обновлении профиля произошла ошибка.';
        }

        setApiError(errorMessage);
        setTimeout(() => {
          setApiError(null);
        }, 1000);
      });
  }

  return (
    <div className='wrapper'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Main />
                <Footer />
              </>
            }
          />

          <Route
            path='/movies'
            element={
              <ProtectedRouteElement
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Movies
                      cards={cards}
                      searchQuery={searchQuery}
                      isLoading={isSubmitted}
                      notFound={notFound}
                      handleSubmit={handleSubmit}
                      handleChange={handleChange}
                      handleSwitcher={handleSwitcher}
                      isShortFilm={isShortFilm}
                      saveMovie={saveMovie}
                      deleteMovie={deleteMovie}
                      errorMessage={errorMessage}
                      savedMovies={savedMovies}
                    />
                    <Footer />
                  </>
                }
              />
            }
          />

          <Route
            path='/saved-movies'
            element={
              <ProtectedRouteElement
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <SavedMovies
                      handleChange={handleChange}
                      savedMovies={savedFilteredMovies}
                      deleteMovie={deleteMovie}
                      searchQuery={searchQuerySaved}
                      notFound={notFound}
                      handleSwitcher={handleSwitcherSaved}
                      isShortFilm={isShortFilmSaved}
                      handleSubmit={handleSubmit}
                    />
                    <Footer />
                  </>
                }
              />
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRouteElement
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Profile
                      handleUpdateUser={handleUpdateUser}
                      setIsLoggedIn={setIsLoggedIn}
                      apiError={apiError}
                      isSubmitButtonDisabled={isSubmitButtonDisabled}
                      setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
                      editSuccess={editSuccess}
                    />
                  </>
                }
              />
            }
          />

          <Route
            path='/signup'
            element={
              <Register
                handleRegister={handleRegister}
                apiError={apiError}
                isSubmitButtonDisabled={isSubmitButtonDisabled}
                setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
              />
            }
          />

          <Route
            path='/signin'
            element={
              <Login
                handleLogin={handleLogin}
                apiError={apiError}
                isSubmitButtonDisabled={isSubmitButtonDisabled}
                setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
              />
            }
          />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
