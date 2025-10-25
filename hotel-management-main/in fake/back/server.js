const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS

const app = express();
app.use(express.json());

// Use CORS middleware to allow requests from your frontend (replace with the correct URL if needed)
app.use(cors({
  origin: 'http://127.0.0.1:5500',  // Allow your frontend to communicate with the backend
  methods: ['GET', 'POST'],  // Allow specific HTTP methods
  credentials: true,  // If your app needs credentials like cookies or authorization headers
}));

// MongoDB connection
mongoose.connect("", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use routes from /routes/rooms.js
app.use('/api', require('./routes/rooms'));

// API for check-in (store check-in data)
app.post('/check-in', async (req, res) => {
  const { guestName, roomNumber, checkInDate, checkOutDate, totalPayment, paymentAmount, paymentStatus } = req.body;

  // Store the check-in details in the database (for now, we're just logging it)
  console.log('Check-In Details:', req.body);

  // Normally, you'd save this to a database, but for now:
  res.json({ message: 'Check-in successful' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
