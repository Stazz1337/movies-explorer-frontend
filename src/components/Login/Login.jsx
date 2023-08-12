import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

function Login({ handleLogin }) {
  return (
    <main>
      <section className='login'>
        <AuthForm
          handleAuth={handleLogin}
          welcomeText={'Рады видеть!'}
          buttonText={'Войти'}
          link={'/signup'}
          linkTitle={'Ещё не зарегистрированы?'}
          linkText={'Регистрация'}
        />
      </section>
    </main>
  );
}

export default Login;
