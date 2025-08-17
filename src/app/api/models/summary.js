const mongoose = require('mongoose');

// Define the schema for the 'summaries' collection
const SummarySchema = new mongoose.Schema({
  transcript: {
    type: String,
    required: [true, 'Transcript is required.'],
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  summary: {
    type: String,
    required: [true, 'Summary is required.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Mongoose model
module.exports = mongoose.model('Summary', SummarySchema);
