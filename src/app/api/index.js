require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const summarizeRoute = require('./routes/summarize');
const shareRoute = require('./routes/share');
const historyRoute = require('./routes/history'); // <-- Import the new history route

// Connect to the MongoDB database
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/summarize', summarizeRoute);
app.use('/api/share', shareRoute);
app.use('/api/history', historyRoute); // <-- Add the new history route

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
