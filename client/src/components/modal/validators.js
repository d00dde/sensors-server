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
  validateDescription: (description) => {
    return !!description.trim();
  },
  channelsIsNoEmpty: (channels) => {
    return channels.some((channel) => channel.enabled);
  },
  channelValidAddress: (channel) => {
    return !!channel.address.trim();
  }
};
