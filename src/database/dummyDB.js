let max_user_id = 1;
let max_sensor_id = 1;
const users = [
  {
    id: 1,
    email: 'd48564@gmail.com',
    name: 'John',
    role: 'master',
    password: '$2a$10$DhQAmnU6E4RcwgB/LkN3f.yBdaFZCsOEcl.SIjZnxiDhP5dHib/zK',
    sensors: [], 
  },
];
let sensors = [
  {
    _id: 1,
    description: 'TEST_SENSOR',
    channels: [],
    systemID: 42,
    secret: '42',
    owner: 1,
  },
];

module.exports = {
  init: () => {
    return Promise.resolve();
  },
  findUser: (email) => {
    const user = users.find((user) => {
      return user.email === email;
    });
    return Promise.resolve(user);
  },
  createUser: (email, name, hashedPassword) => {
    const user = {
      id: ++max_user_id,
      email, 
      name, 
      role: 'user',
      password: hashedPassword,
      sensors: [],
    };
    users.push(user);
  },
  getSensor: async (id) => {
    const find = sensors.find((sensor) => {
      return sensor._id === id;
    });
    return Promise.resolve(find);
  },
  getAllSensors: (userID) => {
    const find = sensors.filter((sensor) => {
      return sensor.owner === userID;
    });
    return Promise.resolve(find);
  },
  addSensor: async (description, channels, userID) => {
    const sensor = {
      _id: ++max_sensor_id,
      description,
      channels,
      owner: userID,
    };
    sensors.push(sensor);
    return sensor;
  },
  updateSensor: async (id, description, channels) => {
    /*const sensor = await Sensor.findById(id);
    if (!sensor) return false;
    sensor.description = description;
    sensor.channels = channels;
    await sensor.save();
    return true;*/
  },
  deleteSensor: async (_id) => {
    const filtred = sensors.filter((sensor) => {
      return sensor._id != _id;
    });
    if(filtred.length === sensors.length)
      return false;
    sensors = filtred;
    return true;
  },
  isAdmin: async (userID) => {
    const user = users.find((user) => userID === user.id);
    if(!user)
      return false;
    if(user.role === 'admin' || user.role === 'master')
      return true;
    return false;
  },
  isMaster: async (userID) => {
    const user = users.find((user) => userID === user.id);
    if(!user)
      return false;
    if(user.role === 'master')
      return true;
    return false;
  },
};
