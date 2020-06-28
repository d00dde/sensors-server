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
    case 'getSensor':
      return {
        method: 'GET',
        url: '/user/sensor/',
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
    case 'getSensorAdmin':
      return {
        method: 'GET',
        url: '/admin/sensor/',
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
    case 'setRights':
      return {
        method: 'PUT',
        url: '/master/setRights/',
      };    
    case 'deleteUser':
      return {
        method: 'DELETE',
        url: '/master/deleteUser/',
      };    
    default:
      return {
        method: 'GET',
        url: '/',
      };
  }
};
