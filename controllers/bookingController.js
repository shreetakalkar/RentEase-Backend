const BookingDetails = require('../models/BookingDetails');

exports.createBooking = async (req, res) => {
  const { room_id, check_in_date, check_out_date, total_guests, guest_details } = req.body;

  if (!room_id || !check_in_date || !check_out_date || !total_guests || !guest_details) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const booking = new BookingDetails({
      user_id: req.user._id, 
      room_id,
      check_in_date,
      check_out_date,
      total_guests,
      guest_details,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await BookingDetails.find({ user_id: req.user._id })
      .populate('user_id', 'name email')
      .populate('room_id', 'hotel_name address');

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
