const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  code: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },

});

module.exports = {
  model: model('Event', schema),
  schema,
};
