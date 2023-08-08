import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnterForm from '../EnterForm/EnterForm.js';

function Login({
  onSignin,
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
      name='login'
      title='Рады видеть!'
      buttonText='Войти'
      captureText='Ещё не&nbsp;зарегистрированы?'
      navLink='/signup'
      linkText='Регистрация'
      onFormSubmit={onSignin}
      submitError={submitError}
    />
  );
}

export default Login;
