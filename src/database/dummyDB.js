let max_user_id = 2;
let max_sensor_id = 3;
const users = [
  {
    id: 1,
    email: 'd48564@gmail.com',
    name: 'John',
    role: 'master',
    password: '$2a$10$DhQAmnU6E4RcwgB/LkN3f.yBdaFZCsOEcl.SIjZnxiDhP5dHib/zK',
  },
    {
    id: 2,
    email: 'd48564@gmail.con',
    name: 'Bob',
    role: 'user',
    password: '$2a$10$DhQAmnU6E4RcwgB/LkN3f.yBdaFZCsOEcl.SIjZnxiDhP5dHib/zK',
  },
];
let sensors = [
  {
    _id: 1,
    description: 'TELEG_SENSOR',
    channels: [
      {channel: 'telegram', address: '@D00dde1'}
    ],
    systemID: '42',
    secret: '42',
    owner: 1,
    events: [ 'lol', 'pop', 'tic'],
  },
  {
    _id: 2,
    description: 'VIBER_SENSOR',
    channels: [
      {channel: 'viber', address: '+380972074557'}
    ],
    systemID: '42',
    secret: '42',
    owner: 1,
  },
  {
    _id: 3,
    description: 'LOL_SENSOR',
    channels: [],
    systemID: '42',
    secret: '42',
    owner: 2,
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
  }
};
