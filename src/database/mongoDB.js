const mongoose = require('mongoose');
const config = require('config');

const User = require('./models/User');
const Sensor = require('./models/Sensor');

module.exports = {
  init: () => {
    mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const db = mongoose.connection;
    db.on('error', () => {
      console.error.bind(console, 'connection error:');
      process.exit(1);
    });
    return new Promise((resolve) => {
      db.once('open', () => {
        resolve();
      });
    });
  },
  findUser: async (email) => {
    return await User.findOne({ email });
  },
  createUser: async (email, name, hashedPassword) => {
    const user = new User({ 
      email,
      name,
      role: 'user',
      password: hashedPassword 
    });
    await user.save();
  },
  getSensor: async (id) => {
    return await Sensor.findById(id);
  },
  getAllSensors: async (userID) => {
    return await Sensor.find({ owner: userID });
  },
  addSensor: async (description, channels, userID) => {
    const sensor = new Sensor({
      description,
      channels,
      owner: userID,
    });
    await sensor.save();
    return sensor;
  },
  updateSensor: async (id, description, channels) => {
    const sensor = await Sensor.findById(id);
    if (!sensor) return false;
    sensor.description = description;
    sensor.channels = channels;
    await sensor.save();
    return true;
  },
  deleteSensor: async (_id) => {
    const resp = await Sensor.deleteOne({ _id });
    if (resp.deletedCount) return true;
    return false;
  },
  isAdmin: async (userID) => {
    const user = await User.findById(userID);
    if(!user)
      return false;
    if(user.role === 'admin' || user.role === 'master')
      return true;
    return false;
  },
  isMaster: async (userID) => {
    const user = await User.findById(userID);
    if(!user)
      return false;
    if(user.role === 'master')
      return true;
    return false;
  },
};
