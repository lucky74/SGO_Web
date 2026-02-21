import axios from 'axios';

const BASE_URL = 'https://serpapi.com/search.json';

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  const apiKey = process.env.SGO_SERP_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'SerpApi key is not configured' });
  }

  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 2);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const response = await axios.get(BASE_URL, {
      params: {
        engine: 'google_hotels',
        q: `Hotels in ${city}`,
        api_key: apiKey,
        gl: 'id',
        hl: 'id',
        currency: 'IDR',
        check_in_date: formatDate(tomorrow),
        check_out_date: formatDate(nextDay),
      }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('SerpApi Error:', error.message);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
