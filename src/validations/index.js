export const validateName = (name) => {
  if (name.length === 0) {
    return "Username không được để trống!";
  } else if (name.length < 4) {
    return "Username phải từ 4 kí tự";
  }
  return "";
};

export const validateEmail = (email) => {
  const emailVali =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.length === 0) {
    return "Email không được để trống!";
  } else if (!emailVali.test(String(email).toLowerCase())) {
    return "Email sai định dạng";
  }
  return "";
};
export const validatePassword = (password) => {
  if (password.length === 0) {
    return "Password không được để trống";
  } else if (password.length < 6) {
    return "Password phải từ 6 kí tự";
  }
  return "";
};
export const equalPassword = (password, confirmPassword) => {
  if (password.length === 0) {
    return "Confirm password không được để trống";
  } else if (password != confirmPassword) {
    return "Confirm password không khớp";
  }
  return "";
};
