// Import required modules
const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

// Route to fetch room rent based on room number
router.get('/getRoomRent/:roomNumber', async (req, res) => {
    const { roomNumber } = req.params;

    try {
        const room = await Room.findOne({ roomNumber });
        if (room) {
            res.json({ rent: room.rent });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get rooms based on availability status (e.g., available or occupied)
router.get('/rooms', async (req, res) => {
    const { status } = req.query;  // Extract the "status" query parameter from the request

    // Ensure the status is either 'available' or 'occupied'
    if (!status || (status !== 'available' && status !== 'occupied')) {
        return res.status(400).json({ message: 'Invalid status. Please provide either "available" or "occupied".' });
    }

    try {
        // Find rooms that match the provided status
        const rooms = await Room.find({ status });

        if (rooms.length > 0) {
            res.json(rooms);  // Send the available rooms as a JSON response
        } else {
            res.status(404).json({ message: `No ${status} rooms found.` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/rooms', async (req, res) => {
    const { roomNumber, roomType, comfort, size, rent, status } = req.body;

    if (!roomNumber || !roomType || !comfort || !size || !rent || !status) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const newRoom = new Room({ roomNumber, roomType, comfort, size, rent, status });
        await newRoom.save();
        return res.status(201).json({ message: 'Room added successfully', room: newRoom });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Route to fetch room rent based on room number
router.get('/api/getRoomRent/:roomNumber', async (req, res) => {
    const { roomNumber } = req.params;
    console.log('Fetching room rent for room number:', roomNumber);  // Log the room number
    try {
        const room = await Room.findOne({ roomNumber: roomNumber });
        if (room) {
            console.log('Room found:', room);  // Log the room details if found
            return res.json({ rent: room.rent });
        } else {
            console.log('Room not found');
            return res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error('Error fetching room rent:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
