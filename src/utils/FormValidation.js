function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9+_.-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email)
};

function isValidName(name) {
  const nameRegex = /^[A-ZА-ЯЁ -]+$/i;
  return nameRegex.test(name)
};

export function handleFormValidity(evt) {
  const {name, value } = evt.target;
  if(name==='email') {
    if(!isValidEmail(value)) {
      evt.target.setCustomValidity('Введите корректный Email')
    } else {
      evt.target.setCustomValidity('')
    }
  } else if(name==='name') {
    if(isValidName(value) && (value.length < 2 || value.length > 30)) {
      evt.target.setCustomValidity('Имя должно содержать от 2 до 30 символов')
    } else if(!isValidName(value) && 2 <= value.length <= 30) {
      evt.target.setCustomValidity('Используйте только латинские буквы, кириллицу, пробел и -')
    } else {
      evt.target.setCustomValidity('')
    }
  } else if(name==='password') {
    if(value.length < 2 || value.length > 30) {
      evt.target.setCustomValidity('Пароль должен содержать от 2 до 30 символов')
    } else {
      evt.target.setCustomValidity('')
    }
  }
};