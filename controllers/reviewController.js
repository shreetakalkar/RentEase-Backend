const Reviews = require('../models/Reviews');

exports.createReview = async (req, res) => {
  try {
    const { room_id, rating, review_text } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    const review = new Reviews({
      user_id: req.user.id,
      room_id,
      rating,
      review_text,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find()
      .populate('user_id', 'name email')
      .populate('room_id', 'room_name location');

    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
