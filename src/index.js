const express = require('express');
const app = express();
// const cors = require('cors');
const config = require('config');
const db = require('./database');

const PORT = config.get('port') || 5000;

// app.use(cors());
app.use(express.json({ extended: true }));
app.use('/auth', require('./routes/auth.router'));
app.use('/user', require('./routes/user.router'));
app.use('/admin', require('./routes/admin.router'));
// app.use('/master', require('./routes/master.router'));
// app.use('/tech/sensor', require('./routes/sensor.router'));

db.init().then(() => {
  app.listen(PORT, () => console.log(`App has been srarted on ${PORT} ...`));
});
