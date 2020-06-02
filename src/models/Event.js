const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  code: { type: String, required: true },
  date: { type: Date, default: Date.now },
  sensor: { type: Types.ObjectId, ref: 'Sensor' },
});

module.exports = model('Event', schema);
