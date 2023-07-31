import EnterForm from '../EnterForm/EnterForm.js';

function Login() {
  return (
    <EnterForm
      name='login'
      title='Рады видеть!'
      buttonText='Войти'
      captureText='Ещё не&nbsp;зарегистрированы?'
      navLink='/signup'
      linkText='Регистрация'
    />
  );
}

export default Login;
