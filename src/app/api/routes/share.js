const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Handle POST requests to /api/share
router.post('/', async (req, res) => {
  const { summary, recipients } = req.body;

  // Basic validation
  if (!summary || !recipients || recipients.length === 0) {
    return res.status(400).json({ error: 'Summary and at least one recipient are required.' });
  }

  // 1. Create a transporter object using SMTP transport
  //    We pull the credentials from the .env file
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"AI Meeting Summarizer" <${process.env.EMAIL_USER}>`, // sender address
    to: recipients.join(', '), // list of receivers
    subject: 'Your AI-Generated Meeting Summary', // Subject line
    text: `Here is your meeting summary:\n\n${summary}`, // plain text body
    // You can also add an HTML version
    html: `<p>Here is your meeting summary:</p><pre>${summary}</pre>`,
  };

  try {
    // 3. Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    
    // If using Ethereal, you can get a preview URL
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log('Preview URL: %s', previewUrl);
    }
    
    res.status(200).json({ message: 'Email sent successfully!', previewUrl: previewUrl || null });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;