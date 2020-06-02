const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');

const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }));
app.use('/auth', require('./routes/auth.router'));
app.use('/api', require('./routes/frontend.router'));
app.use('/tech/sensor', require('./routes/sensor.router'));

(async function() {
  try {
    mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has been srarted on ${PORT} ...`));
  } catch (e) {
    console.log('Server error:', e.message);
    process.exit(1);
  }
})();
