const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomsSchema = new Schema({
  room_id: { type: Number, required: true, unique: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  room_type: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  capacity: { type: Number, required: true },
  availability_status: { type: String, enum: ['Available', 'Booked'], required: true },
  images: { type: [String], required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rooms', roomsSchema);