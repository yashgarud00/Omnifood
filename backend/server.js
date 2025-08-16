const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// In-memory storage for sign-ups (for demo purposes)
const signups = [];

// API endpoint to handle sign-up form submission
app.post('/api/signup', (req, res) => {
  const { 'full-name': fullName, email, 'select-where': referral } = req.body;

  if (!fullName || !email || !referral) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Store the sign-up data
  signups.push({ fullName, email, referral, date: new Date() });

  console.log('New signup:', { fullName, email, referral });

  res.json({ message: 'Sign-up successful' });
});

// Fallback to serve index.html for any other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
