let {  max_user_id, max_sensor_id, users, sensors } = require('./dummyData');

module.exports = {
  init: () => {
    return Promise.resolve();
  },
  findUser: (email) => {
    const user = users.find((user) => {
      return user.email === email;
    });
    // throw new Error('ups');
    return Promise.resolve(user);
  },
  createUser: (email, name, hashedPassword, role) => {
    const user = {
      id: ++max_user_id,
      email,
      name,
      role,
      password: hashedPassword,
      sensors: [],
    };
    users.push(user);
  },
  getSensor: async (id) => {
    const find = sensors.find((sensor) => {
      return +sensor._id === +id;
    });
    return Promise.resolve(find);
  },
  getAllSensors: (userID) => {
    const find = sensors.filter((sensor) => {
      return +sensor.owner === +userID;
    });
    return Promise.resolve(find);
  },
  addSensor: async (description, channels, userID, systemID, secret) => {
    const sensor = {
      _id: ++max_sensor_id,
      description,
      channels,
      systemID, 
      secret,
      owner: +userID,
    };
    sensors.push(sensor);
    return sensor;
  },
  updateSensor: async (id, description, channels, systemID, secret) => {
    const sensor = sensors.find((sensor) => {
      return +sensor._id === +id;
    });
    if (!sensor) return false;
    sensor.description = description;
    sensor.channels = channels;
    if(systemID && secret){
      sensor.systemID = systemID;
      sensor.secret = secret;
    }
    return true;
  },
  deleteSensor: async (_id) => {
    const filtred = sensors.filter((sensor) => {
      return sensor._id != _id;
    });
    if (filtred.length === sensors.length) return false;
    sensors = filtred;
    return true;
  },
  isAdmin: async (userID) => {
    const user = users.find((user) => userID === user.id);
    if (!user) return false;
    if (user.role === 'admin' || user.role === 'master') return true;
    return false;
  },
  isMaster: async (userID) => {
    const user = users.find((user) => userID === user.id);
    if (!user) return false;
    if (user.role === 'master') return true;
    return false;
  },
  getUsers: async () => {
    return users;
  },
  deleteUser: async (id) => {
    const user = users.find((user) => +user.id === +id)
    if(user.role === 'master')
      return false;
    const filtred = users.filter((user) => {
      return +user.id !== +id;
    });
    if (filtred.length === users.length) return false;
    users = filtred;
    sensors = sensors.filter((sensor) => {
      return +sensor.owner !== +id;
    });
    return true;
  },
  getUser: async (id) => {
    return users.find((user) => +user.id === +id) 
  },
  changeRole: (id, role) => {
    const user = users.find((user) => +user.id === +id);
    if(!user)
      return false;
    user.role = role;
    return true;
  },
  getSensorBySystemId: async (systemID) => {
    const find = sensors.find((sensor) => {
      return sensor.systemID === systemID;
    });
    return Promise.resolve(find);
  },
  addEvent: (sensorId, code, message) => {
    const sensor = sensors.find((sensor) => sensor.systemID === sensorId);
    if(!sensor)
      return false;
    sensor.events.push({
      code,
      message,
      date: +new Date(),
    });
    return true;
  },
};
