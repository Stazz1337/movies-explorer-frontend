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
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate('/movies');
  }

  function handleRegister() {
    navigate('/signin');
  }
  return (
    <div className='wrapper'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />

        <Route
          path='/movies'
          element={
            <>
              <Header />
              <Movies />
              <Footer />
            </>
          }
        />

        <Route
          path='/saved-movies'
          element={
            <>
              <Header />
              <SavedMovies />
              <Footer />
            </>
          }
        />

        <Route
          path='/signup'
          element={<Register handleRegister={handleRegister} />}
        />

        <Route path='/signin' element={<Login handleLogin={handleLogin} />} />

        <Route
          path='/profile'
          element={
            <>
              <Header />
              <Profile />
            </>
          }
        />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
