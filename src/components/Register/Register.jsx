import './Register.css';
import AuthForm from '../AuthForm/AuthForm';

function Register({ handleRegister }) {
  return (
    <section className='register'>
      <AuthForm
        handleAuth={handleRegister}
        welcomeText={'Добро пожаловать!'}
        buttonText={'Зарегистрироваться'}
        link={'/signin'}
        linkTitle={'Уже зарегистрированы?'}
        linkText={'Войти'}
      />
    </section>
  );
}

export default Register;
