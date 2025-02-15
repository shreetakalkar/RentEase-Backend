const Rooms = require('../models/Rooms');

exports.createRoom = async (req, res) => {
  try {
    const { room_type, price, capacity, availability_status, images } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authorized, owner not found' });
    }

    const room = new Rooms({
      owner_id: req.user.id,
      room_type,
      price,
      capacity,
      availability_status,
      images
    });

    await room.save();
    res.status(201).json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find().populate('owner_id', 'name email');
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
