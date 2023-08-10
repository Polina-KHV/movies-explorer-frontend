import { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { handleFormValidity } from '../../utils/FormValidation';
import './EnterForm.css';

function EnterForm({
  name,
  title,
  buttonText,
  captureText,
  navLink,
  linkText,
  isRegister,
  onFormSubmit,
  submitError
}) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleFormChange(evt) {
    const {name, value, validationMessage } = evt.target;
    handleFormValidity(evt);
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: validationMessage});
    setIsValid(evt.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    onFormSubmit(values);
    resetForm();
  };

  return(
    <>
      <form
        className='enter-form form'
        name={`${name}`}
        onSubmit={handleSubmit}
      >
        <div>
          <NavLink
            className='enter-form__logo logo'
            to='/'
          />
          <h3 className='enter-form__title title_type_form'>{title}</h3>
          {isRegister &&
            <label className='enter-form__input-label'>Имя
              <input
                type='text'
                className='enter-form__input'
                name='name'
                id='name-input'
                required
                onChange={handleFormChange}
              />
              {!isValid &&
              <span className='enter-form__input-error input-error'>
                {errors.name}
              </span>}
            </label>
          }
          <label className='enter-form__input-label'>E-mail
            <input
              type='email'
              className='enter-form__input'
              name='email' id='email-input'
              required
              autoComplete='email'
              onChange={handleFormChange}
            />
            {!isValid &&
            <span className='enter-form__input-error input-error'>
              {errors.email}
            </span>}
          </label>
          <label className='enter-form__input-label'>Пароль
            <input
              type='password'
              className='enter-form__input'
              name='password'
              id='password-input'
              required
              autoComplete='current-password'
              onChange={handleFormChange}
            />
            {!isValid &&
            <span className='enter-form__input-error input-error'>
              {errors.password}
            </span>}
          </label>
        </div>
        <div className='form__bottom'>
          <span className='submit-error'>
            {submitError}
          </span>
          <button
            type='submit'
            className='enter-form__submit-button form__submit-button button_type_main'
            disabled={!isValid}
          >{buttonText}</button>
          <p className='enter-form__capture'>{captureText}&nbsp;
          <NavLink
          to={`${navLink}`}
          className='enter-form__link link'>
            {linkText}
          </NavLink>
          </p>
        </div>
      </form>
    </>
  )
}

export default EnterForm;