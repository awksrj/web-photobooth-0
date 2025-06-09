const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountName: { type: String, required: true, unique: true },
  birthYear: { type: Number, required: false }
});

export default mongoose.model('User', UserSchema);
