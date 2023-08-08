import { useState, useEffect, useContext, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { handleFormValidity } from '../../utils/FormValidation';
import './ProfileForm.css';

function ProfileForm({
  onFormSubmit,
  onSignout,
  submitError,
  onSubmitError
}) {
  const currentUser = useContext(UserContext);
  const [onEdit, setOnEdit] = useState(false);
  const [userData, setUserData] = useState({});
  const [values, setValues] = useState({
    name: userData.name,
    email: userData.email
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setUserData(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if(onSubmitError) {
      setOnEdit(true);
    } else {
      setOnEdit(false);
    }
  }, [onSubmitError]);

  function handleFormActivation() {
    setOnEdit(true);
    setValues({
      name: userData.name,
      email: userData.email
    })
  };

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
    setValues({
      name: userData.name,
      email: userData.email
    })
  };

  return(
    <>
      <form
        className='profile-form form'
        name='profile'
        onSubmit={handleSubmit}
      >
        <div>
          <h3 className='profile-form__title title_type_form'>Привет, {userData.name}!</h3>
          <label className='profile-form__input-label'>Имя
          <input
            type='text'
            className='profile-form__input'
            name='name'
            id='name-input'
            required
            defaultValue={userData.name}
            disabled={!onEdit}
            onChange={handleFormChange}
          />
          {!isValid &&
          <span className='profile-form__input-error input-error'>
            {errors.name}
          </span>}
          </label>
          <label className='profile-form__input-label'>E-mail
            <input
              type='email'
              className='profile-form__input'
              name='email'
              id='email-input'
              required
              autoComplete='email'
              defaultValue={userData.email}
              disabled={!onEdit}
              onChange={handleFormChange}
            />
            {!isValid &&
            <span className='profile-form__input-error input-error'>
            {errors.email}
            </span>}
          </label>
        </div>
        <div className='form__bottom'>
          <div
            className='profile-form__capture'
            style={{display: onEdit ? 'none' : 'flex'}}
          >
            <span className='profile-form__link link' onClick={handleFormActivation}>Редактировать</span>
            <NavLink
              to='/'
              className='profile-form__link link'
              onClick={onSignout}
            >Выйти из аккаунта</NavLink>
          </div>
          {onEdit &&
          <div>
            <span className='submit-error'>
            {submitError}
            </span>
            <button
              type='submit'
              className='profile-form__submit-button form__submit-button button_type_main'
              disabled={!isValid}
              >Сохранить</button>
          </div>}
        </div>
      </form>
    </>
  )
}

export default ProfileForm;