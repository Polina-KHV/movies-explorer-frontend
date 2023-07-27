import { NavLink } from 'react-router-dom';
import './ProfileForm.css';

function ProfileForm() {
  return(
    <>
      <form className='profile-form form' name='profile'>
        <div>
          <h3 className='profile-form__title title_type_form'>Привет, Полина!</h3>
          <label className='profile-form__input-label'>Имя
            <input type='text' className='profile-form__input' name='name' id='name-input' required defaultValue='Полина' disabled />
          </label>
          <label className='profile-form__input-label'>E-mail
            <input type='email' className='profile-form__input' name='email' id='email-input' required autoComplete='email' defaultValue='email@yandex.ru' disabled />
          </label>
        </div>
        <div className='form__bottom'>
          <div className='profile-form__capture'>
            <span className='profile-form__link link'>Редактировать</span>
            <NavLink to='/' className='profile-form__link link'>Выйти из аккаунта</NavLink>
          </div>
          <button type='submit' className='profile-form__submit-button form__submit-button button_type_main'>Сохранить</button>
        </div>
      </form>
    </>
  )
}

export default ProfileForm;