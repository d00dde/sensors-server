const express = require('express');
const app = express();
const config = require('config');
const db = require('./database/mongoDB');

const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.router'));
// app.use('/api', require('./routes/frontend.router'));
// app.use('/tech/sensor', require('./routes/sensor.router'));

db.init().then(() => {
  app.listen(PORT, () => console.log(`App has been srarted on ${PORT} ...`));
});
