export default (requestName) => {
  switch (requestName) {
  //Register and auth routes
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
  // User routes
    case 'getSensors':
      return {
        method: 'GET',
        url: '/user/',
      };
    case 'getEvents':
      return {
        method: 'GET',
        url: '/user/events/',
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
    //Admin routes
    case 'getUsers':
      return {
        method: 'GET',
        url: '/admin/users/',
      };
    case 'getSensorsAdmin':
      return {
        method: 'GET',
        url: '/admin/sensors/',
      };
    case 'getEventsAdmin':
      return {
        method: 'GET',
        url: '/admin/events/',
      };
    case 'addSensorAdmin':
      return {
        method: 'POST',
        url: '/admin/addSensor/',
      };
    case 'updateSensorAdmin':
      return {
        method: 'PUT',
        url: '/admin/updateSensor/',
      };
    case 'deleteSensorAdmin':
      return {
        method: 'DELETE',
        url: '/admin/deleteSensor/',
      };        
    default:
      return {
        method: 'GET',
        url: '/',
      };
  }
};
