import EnterForm from '../EnterForm/EnterForm.js';

function Register() {
  return (
    <EnterForm
      name='registration'
      title='Добро пожаловать!'
      buttonText='Зарегистрироваться'
      captureText='Уже зарегистрированы?'
      navLink='/signin'
      linkText='Войти'
    >
      <label className='enter-form__input-label'>Имя
        <input type='text' className='enter-form__input' name='name' id='name-input' required />
        <span className='enter-form__input-error name-input-error'></span>
      </label>
    </EnterForm>
  );
}

export default Register;
