const express = require('express');
const Groq = require('groq-sdk');
const Summary = require('../models/summary');
const router = express.Router();
const multer = require('multer');
const pdf = require('pdf-parse');

// Set up multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Update the POST route to handle a file upload named 'transcriptFile'
router.post('/', upload.single('transcriptFile'), async (req, res) => {
  try {
    const { prompt } = req.body;
    let transcript = req.body.transcript;

    // 1. Check if a file was uploaded
    if (req.file) {
      // If a PDF is uploaded, parse it to extract text
      const data = await pdf(req.file.buffer);
      transcript = data.text;
    }

    // 2. Validate that we have a transcript (either from file or textarea) and a prompt
    if (!transcript || !prompt) {
      return res.status(400).json({ error: 'Transcript (from file or text) and prompt are required.' });
    }

    // 3. Generate summary with Groq AI
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant designed to summarize meeting transcripts...',
        },
        {
          role: 'user',
          content: `Transcript: ---${transcript}--- \n\n Instruction: "${prompt}"`,
        },
      ],
      model: 'llama3-8b-8192',
    });

    const summaryText = chatCompletion.choices[0]?.message?.content || 'Could not generate summary.';

    // 4. Save the result to the database
    const newSummary = new Summary({
      transcript,
      prompt,
      summary: summaryText,
    });
    await newSummary.save();
    console.log('Summary saved to database.');

    // 5. Send the summary back to the frontend
    res.json({ summary: summaryText });

  } catch (error) {
    console.error('Error in summarize route:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

module.exports = router;
