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
    case 'addSensor':
      return {
        method: 'POST',
        url: '/user/add/',
      };
    case 'updateSensor':
      return {
        method: 'PUT',
        url: '/user/',
      };
    case 'deleteSensor':
      return {
        method: 'DELETE',
        url: '/user/',
      };
    case 'getUsers':
      return {
        method: 'GET',
        url: '/admin/users/',
      };      
    default:
      return {
        method: 'GET',
        url: '/',
      };
  }
};
