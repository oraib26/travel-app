import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API keys retrieved from environment variables
const geonamesUsername = process.env.GEONAMES_USERNAME;
const weatherbitApiKey = process.env.WEATHERBIT_API_KEY;
const pixabayApiKey = process.env.PIXABAY_API_KEY;

console.log(process.env.GEONAMES_USERNAME)

app.use(express.json());
app.use(express.static('dist'));

app.get('/location', async (req, res) => {
    const { city } = req.query;
    const geonamesUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${geonamesUsername}`;
    try {
        const response = await fetch(geonamesUrl);
        const data = await response.json();
        if (!data.geonames || data.geonames.length === 0) {
            throw new Error('No data found');
        }
        res.json(data.geonames[0]);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;
    const weatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weatherbitApiKey}`;
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        res.json(data.data ? data.data[0] : null);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/images', async (req, res) => {
    const { keyword } = req.query;
    const pixabayUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(keyword)}&image_type=photo`;
    try {
        const response = await fetch(pixabayUrl);
        const data = await response.json();
        res.json(data.hits || []);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'html', 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
export default app;