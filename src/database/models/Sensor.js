const { Schema, model, Types } = require('mongoose');
const Event = require('./Event').schema;

const schema = new Schema({
  description: { type: String, required: true },
  channels: [
    {
      channel: { type: String, required: true },
      address: { type: String, required: true },
    },
  ],
  systemID: { type: String, required: true, unique: true },
  secret: { type: String, required: true },
  events: [Event],
  owner: { type: Types.ObjectId, ref: 'User' },
});

module.exports = model('Sensor', schema);
