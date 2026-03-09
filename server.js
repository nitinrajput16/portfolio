const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact form API endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`New contact: ${name} (${email}): ${message}`);
  res.json({ success: true, message: 'Message received! I will get back to you soon.' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running at http://localhost:${PORT}`);
});
