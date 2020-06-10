export default (requestName) => {
  switch (requestName) {
    case 'registerUser':
      return {
        method: 'POST',
        path: '/auth/register',
      };
    case 'loginUser':
      return {
        method: 'POST',
        path: '/auth/login',
      };
  }
};
