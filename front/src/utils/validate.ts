type UserInformation = {
  email: string;
  password: string;
};

function validateUser(value: UserInformation) {
  const error = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
    error.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!(value.password.length >= 8 && value.password.length < 20)) {
    error.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return error;
}
function validateLogin(value: UserInformation) {
  return validateUser(value);
}

function validateSignup(value: UserInformation & {passwordConfirm: string}) {
  const error = validateUser(value);
  const signupError = {...error, passwordConfirm: ''};

  if (value.password != value.passwordConfirm) {
    signupError.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }
  return signupError;
}

export {validateLogin, validateSignup};
