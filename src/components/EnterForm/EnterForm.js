import { NavLink } from 'react-router-dom';
import './EnterForm.css';

function EnterForm({name, title, children, buttonText, captureText, navLink, linkText}) {
  return(
    <>
      <form className='enter-form form' name={`${name}`}>
        <div>
          <NavLink
            className='enter-form__logo logo'
            to='/'
          />
          <h3 className='enter-form__title title_type_form'>{title}</h3>
          {children}
          <label className='enter-form__input-label'>E-mail
            <input type='email' className='enter-form__input' name='email' id='email-input' required autoComplete='email' />
            <span className='enter-form__input-error email-input-error'></span>
          </label>
          <label className='enter-form__input-label'>Пароль
            <input type='password' className='enter-form__input' name='password' id='password-input' required autoComplete='current-password' />
            <span className='enter-form__input-error password-input-error'></span>
          </label>
        </div>
        <div className='form__bottom'>
          <button type='submit' className='enter-form__submit-button form__submit-button button_type_main'>{buttonText}</button>
          <p className='enter-form__capture'>{captureText}&nbsp;<NavLink to={`${navLink}`} className='enter-form__link link'>{linkText}</NavLink>
          </p>
        </div>
      </form>
    </>
  )
}

export default EnterForm;