const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const paymentDetailsSchema = new Schema({
  payment_id: { type: Number, unique: true },
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BookingDetails', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  payment_status: { type: String, required: true, enum: ['Pending', 'Completed', 'Failed'] },
  transaction_id: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now }
});


paymentDetailsSchema.plugin(AutoIncrement, { inc_field: 'payment_id' });

module.exports = mongoose.model('PaymentDetails', paymentDetailsSchema);
