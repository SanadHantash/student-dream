const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  created_at: { type: Date, default: Date.now },
});

const History = mongoose.model('History', historySchema);

module.exports = History;
