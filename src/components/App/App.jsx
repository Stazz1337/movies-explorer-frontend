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
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from '../../utils/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [apiError, setApiError] = useState('');

  const [currentUser, setCurrentUser] = useState({});

  const [savedMovies, setSavedMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShortFilm, setIsShortFilm] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [token, setToken] = useState(null);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);

        setToken(data.token);

        setCurrentUser(data);

        setIsLoggedIn(true);

        setApiError('');

        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);

        let errorMessage;
        // Here you need to adapt the error codes according to your api or library
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

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        setApiError('');

        navigate('/movies');
      })
      .catch((err) => {
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
            navigate('/');
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

  // searchQuery in SearchForm rerender

  useEffect(
    () => {
      setSearchQuery(localStorage.getItem('searchQuery') || '');
      setIsShortFilm(localStorage.getItem('isShortFilm') === 'true');
      setCards(JSON.parse(localStorage.getItem('results')) || []);

      //Также не забудьте при выходе пользователя с сайта вызывать очистку хранилища,
      // иначе другой пользователь зайдёт на сайт и увидит запрос предыдущего пользователя, что не всегда допустимо. !!!!!!!!!!

      if (isSubmitted) {
        moviesApi
          .getMovies()
          .then((data) => {
            console.log(data);
            if (Object.entries(data).length === 0) {
              setNotFound(true);
            } else {
              let filteredMovies = data.filter(
                (item) =>
                  item.nameRU
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  item.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
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
                console.log(results);
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
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSubmitted, isShortFilm]
  );

  useEffect(
    () => {
      if (isSubmitted) {
        let filteredMovies = savedMovies.filter(
          (item) =>
            item.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
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
 
          savedMovies(results);
          console.log(results);
          setNotFound(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSubmitted, isShortFilm]
  );

  // switcher checkbox rerender existing short films

  useEffect(() => {
    setCards((prevCards) => {
      let newCards;
      if (isShortFilm) {
        newCards = prevCards.filter((item) => item.duration <= 40);
        localStorage.setItem('isShortFilm', isShortFilm);
      } else {
        newCards = prevCards;
      }
      return newCards;
    });
  }, [isShortFilm]);

  // function saveMovie(cardData) {
  //   mainApi
  //     .saveMovie(cardData, token)
  //     .then((res) => {
  //       setSavedMovies((prevMovies) => [...prevMovies, res]);
  //       console.log(savedMovies);
  //     })
  //     .catch((err) => console.error(err));
  // }

  // function deleteMovie(_id) {
  //   mainApi
  //     .deleteMovie(_id, token)
  //     .then((res) => {
  //       setSavedMovies(res);
  //     })
  //     .catch((err) => console.error(err));
  // }

  const saveMovie = (movie) => {
    mainApi
      .saveMovie(movie, token)
      .then((data) => {
        setSavedMovies((prev) => [...prev, data]);  
        console.log(savedMovies);
      })
      .catch((err) => console.log(`Error: ${err}`));
  };


  const deleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId, token)
      .then(() => {
        setSavedMovies(savedMovies.filter((movie) => {
          return movie._id !== movieId;
        }));
      })
      .catch((err) => console.log(`Error: ${err}`));
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery === '') {
      setErrorMessage('Нужно ввести ключевое слово');
      return;
    }
    setIsSubmitted(true);
  };

  const handleChange = (value) => {
    setSearchQuery(value);
    setErrorMessage('');
  };

  const handleSwitcher = () => {
    setIsShortFilm(!isShortFilm);
    localStorage.setItem('isShortFilm', !isShortFilm);
  };

  function handleUpdateUser(name, email) {
    mainApi
      .setUserInfo(name, email, token)
      .then((res) => {
        setCurrentUser(res);
        setApiError('');
      })
      .catch((err) => {
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
                isLoggedIn={isLoggedIn}
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
                isLoggedIn={isLoggedIn}
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <SavedMovies
                      savedMovies={savedMovies}
                      deleteMovie={deleteMovie}

                      searchQuery={searchQuery}
                      isLoading={isSubmitted}
                      notFound={notFound}
                      handleSwitcher={handleSwitcher}
                      isShortFilm={isShortFilm}
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
                isLoggedIn={isLoggedIn}
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Profile
                      handleUpdateUser={handleUpdateUser}
                      setIsLoggedIn={setIsLoggedIn}
                      apiError={apiError}
                    />
                  </>
                }
              />
            }
          />

          <Route
            path='/signup'
            element={
              <Register handleRegister={handleRegister} apiError={apiError} />
            }
          />

          <Route
            path='/signin'
            element={<Login handleLogin={handleLogin} apiError={apiError} />}
          />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
