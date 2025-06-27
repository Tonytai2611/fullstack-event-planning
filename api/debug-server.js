import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Test email URL generation
app.get('/test-email-url/:eventId', (req, res) => {
  const { eventId } = req.params;
  const generatedURL = `${process.env.CLIENT_URL}/event/${eventId}`;
  
  res.json({
    message: 'Email URL Test',
    CLIENT_URL: process.env.CLIENT_URL,
    eventId: eventId,
    generatedURL: generatedURL,
    testInstructions: [
      'Copy the generatedURL below',
      'Paste it in your browser',
      'Check if it opens the event details page',
      'If it shows 404, check if frontend is running',
      'If frontend is running on different port, update CLIENT_URL in .env'
    ]
  });
});

// Test if frontend is accessible
app.get('/test-frontend', async (req, res) => {
  try {
    const response = await fetch(process.env.CLIENT_URL);
    res.json({
      message: 'Frontend accessibility test',
      CLIENT_URL: process.env.CLIENT_URL,
      status: response.status,
      accessible: response.ok
    });
  } catch (error) {
    res.json({
      message: 'Frontend accessibility test',
      CLIENT_URL: process.env.CLIENT_URL,
      error: error.message,
      accessible: false,
      suggestion: 'Make sure frontend is running on the configured CLIENT_URL'
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Email debug server running on port ${PORT}`);
  console.log(`Test email URL: http://localhost:${PORT}/test-email-url/670c9c8a123456789abcdef0`);
  console.log(`Test frontend: http://localhost:${PORT}/test-frontend`);
});
