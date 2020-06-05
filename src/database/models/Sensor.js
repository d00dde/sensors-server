const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  id: { type: String, required: true },
  events: [{ type: Types.ObjectId, ref: 'Event' }],
  owner: { type: Types.ObjectId, ref: 'User' },
});

module.exports = model('Sensor', schema);
