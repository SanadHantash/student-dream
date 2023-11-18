const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  university_id: { type: Number, required: true },
  student_proof: { type: String, required: true },
  fund: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['accepted', 'rejected', 'pending'], required: true },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});


const Request = mongoose.model('Request', requestSchema);

module.exports = Request;