const PaymentDetails = require('../models/PaymentDetails');

exports.createPayment = async (req, res) => {
  try {
    const { booking_id, amount, payment_status, transaction_id } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    const payment = new PaymentDetails({
      booking_id,
      user_id: req.user.id, 
      amount,
      payment_status,
      transaction_id,
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await PaymentDetails.find()
      .populate('booking_id')
      .populate('user_id', 'name email');

    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
