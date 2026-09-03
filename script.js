const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const isRequired = checkRequired([username, email, password, confirmPassword]);

  let isFormValid = isRequired;

  if (isRequired) {
    const isUsernameValid = checkUsername(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkPassword(password, 8, 21);
    const isConfirmPasswordValid = checkConfirmPassword(password, confirmPassword);

    isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
  }
  if (isFormValid) {
    setTimeout(() => {
      alert('Registration completed');
    }, 400);
  }
});


function checkUsername(input, min, max) {
  if (input.value.length < min) {
    showError(input, `The ${input.id} must be at least ${min} character`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `The ${input.id} must be less than ${max} characters`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkPassword(input, min, max) {
  if (input.value.length < min) {
    showError(input, `The ${input.id} must be at least ${min} character`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `The ${input.id} must be less than ${max} character`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkConfirmPassword(password, confirmPassword) {
  if (password.value.trim() === confirmPassword.value.trim()) {
    showSuccess(confirmPassword);
    return true;
  } else {
    showError(confirmPassword, 'The password doesn\'t match');
    return false;
  }
}

function checkEmail(input) {
  const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (emailRegix.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, 'Enter valid email');
    return false;
  }
}

function checkRequired(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    if (input.value.trim() === '') {
      const message = `${input.id} is required`;
      showError(input, message);
      isValid = false;
    }
  });

  return isValid;
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error'
  const small = formGroup.querySelector('small');
  small.textContent = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success'
}