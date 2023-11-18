const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  phonenumber: { type: String, required: true, unique: true },
});


userSchema.statics.checkUserExistence = async function (email, username, phonenumber) {
  const existingUser = await this.findOne({
    $or: [{ email: email }, { username: username }, { phonenumber: phonenumber }],
  });

  if (existingUser) {
    throw new Error('User already exists');
  }
};


userSchema.statics.register = async function (username, email, password, role, phonenumber) {
  
  const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = new this({
    username: username,
    email: email,
    password: hashedPassword,
    role: role,
    phonenumber: phonenumber
  });

  
  await newUser.save();
};



userSchema.statics.login = async function (email) {
  return this.findOne({ email: email });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
