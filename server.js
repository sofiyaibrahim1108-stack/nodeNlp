const express = require('express');
const loadModel = require('./load');

const app = express();
app.use(express.json());

let manager;

// Load model once
(async () => {
    manager = await loadModel();
})();

// API endpoint
app.post('/predict', async (req, res) => {
    try {
        if (!manager) {
            return res.status(503).json({ error: 'Model not loaded yet' });
        }

        const input = req.body.text;

        if (!input) {
            return res.status(400).json({ error: 'Text is required' });
        }

        const result = await manager.process('en', input);

        res.json({
            intent: result.intent,
            score: result.score
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Start server
app.listen(5000, () => {
    console.log('🚀 Server running at http://localhost:5000');
});