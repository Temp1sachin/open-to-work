const express = require('express');
const Summary = require('../models/summary'); // Import the Summary model
const router = express.Router();

// Handle GET requests to /api/history
router.get('/', async (req, res) => {
  try {
    // Fetch all summaries from the database
    // Sort them by creation date in descending order (newest first)
    // Limit to the 20 most recent summaries to avoid sending too much data
    const summaries = await Summary.find({})
      .sort({ createdAt: -1 })
      .limit(20);

    // Send the summaries back to the frontend
    res.json(summaries);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'An internal server error occurred while fetching history.' });
  }
});

module.exports = router;