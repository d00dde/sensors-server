export default {
  validateEmail: (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  },
  validateName: (name) => {
    return name.trim().length;
  },
  validatePassword: (password) => {
    return password.trim().length > 5;
  },
  passwordsIsEqual: (password, confirmPassword) => {
    return password.trim() === confirmPassword.trim();
  },
};
