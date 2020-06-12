export default (requestName) => {
  switch (requestName) {
    case 'registerUser':
      return {
        method: 'POST',
        url: '/auth/register',
      };
    case 'loginUser':
      return {
        method: 'POST',
        url: '/auth/login',
      };
    case 'getSensors':
      return {
        method: 'GET',
        url: '/user/',
      };
  }
};
