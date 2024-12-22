const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Serve static Web Stories
app.use('/stories', express.static(path.join(__dirname, 'stories')));

// Example API endpoint for dynamic stories
app.get('/api/stories/:id', (req, res) => {
    const storyId = req.params.id;
    const html = `
    <!DOCTYPE html>
    <html ⚡>
    <head>
        <meta charset="utf-8">
        <title>Story ${storyId}</title>
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    </head>
    <body>
        <amp-story standalone
            title="Dynamic Story ${storyId}"
            publisher="Example Publisher"
            publisher-logo-src="https://example.com/logo.png"
            poster-portrait-src="https://example.com/poster.jpg">
            <amp-story-page id="page1">
                <amp-story-grid-layer template="vertical">
                    <h1>Welcome to Story ${storyId}</h1>
                    <p>This is dynamically generated.</p>
                </amp-story-grid-layer>
            </amp-story-page>
        </amp-story>
    </body>
    </html>`;
    res.type('html').send(html);
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
