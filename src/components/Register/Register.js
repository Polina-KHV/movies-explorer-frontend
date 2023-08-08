import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnterForm from '../EnterForm/EnterForm.js';

function Register({
  onSignup,
  isLoggedIn,
  submitError
}) {
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate("/", {replace: true})
    // eslint-disable-next-line
  }, []);

  return (
    <EnterForm
      name='registration'
      title='Добро пожаловать!'
      buttonText='Зарегистрироваться'
      captureText='Уже зарегистрированы?'
      navLink='/signin'
      linkText='Войти'
      isRegister={true}
      onFormSubmit={onSignup}
      submitError={submitError}
    />
  );
}

export default Register;
