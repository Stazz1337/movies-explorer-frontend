import './Register.css';
import AuthForm from '../AuthForm/AuthForm';

function Register({
  handleRegister,
  apiError,
  isSubmitButtonDisabled,
  setIsSubmitButtonDisabled,
}) {
  return (
    <main>
      <section className='register'>
        <AuthForm
          handleAuth={handleRegister}
          apiError={apiError}
          isSubmitButtonDisabled={isSubmitButtonDisabled}
          setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
          welcomeText={'Добро пожаловать!'}
          buttonText={'Зарегистрироваться'}
          link={'/signin'}
          linkTitle={'Уже зарегистрированы?'}
          linkText={'Войти'}
        />
      </section>
    </main>
  );
}

export default Register;
