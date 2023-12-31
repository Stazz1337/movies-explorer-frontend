import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

function Login({
  handleLogin,
  apiError,
  isSubmitButtonDisabled,
  setIsSubmitButtonDisabled,
}) {
  return (
    <main>
      <section className='login'>
        <AuthForm
          handleAuth={handleLogin}
          apiError={apiError}
          isSubmitButtonDisabled={isSubmitButtonDisabled}
          setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
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
