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
    const user = new User({ email, name, password: hashedPassword });
    await user.save();
  },
  getSensor: async (id) => {
    return await Sensor.findById(id);
  },
  getAllSensors: async (userID) => {
    return await Sensor.find({ owner: userID });
  },
  addSensor: async (description, channels, userID) => {
    console.log(channels);
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
    sensor.description = description;
    sensor.channels = channels;
    await sensor.save();
  },
  deleteSensor: async (_id) => {
    await Sensor.deleteOne({ _id });
    console.log(_id, ' deleted');
  },
};
