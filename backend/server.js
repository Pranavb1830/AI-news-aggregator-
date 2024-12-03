require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const Sentiment = require('sentiment');

const app = express();
const PORT = 5000;
const sentiment = new Sentiment();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/news', async(req, res) => {
    const category = req.query.category || 'general';
    const API_KEY = process.env.NEWS_API_KEY;

    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`);
        res.json(response.data.articles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching news' });
    }
});

app.post('/analyze', (req, res) => {
    const headlines = req.body.headlines;

    const analysis = headlines.map((headline) => ({
        headline,
        sentiment: sentiment.analyze(headline).score,
    }));

    res.json(analysis);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));