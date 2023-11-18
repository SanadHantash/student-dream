const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
  created_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default:"pending", required: true },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
