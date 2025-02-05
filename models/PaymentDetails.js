const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentDetailsSchema = new Schema({
  payment_id: { type: Number, required: true, unique: true },
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BookingDetails', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: mongoose.Types.Decimal128, required: true },
  payment_status: { type: String, enum: ['Pending', 'Completed'], required: true },
  transaction_id: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PaymentDetails', paymentDetailsSchema);