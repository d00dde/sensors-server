const mongoose = require('mongoose');
const config = require('config');

const User = require('./models/User');

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
};
