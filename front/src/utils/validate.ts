type UserInformation = {
  email: string;
  password: string;
};

function validateLogin(value: UserInformation) {
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

export {validateLogin};
