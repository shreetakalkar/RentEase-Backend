const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const reviewsSchema = new Schema({
  review_id: { type: Number, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review_text: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

reviewsSchema.plugin(AutoIncrement, { inc_field: 'review_id' });

module.exports = mongoose.model('Reviews', reviewsSchema);
