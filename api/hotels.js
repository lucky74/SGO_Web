import axios from 'axios';

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  const SGO_KEY = 'd58fcad894baf2a956b0f68ce6073fcf588e2a3b899498051d5a553524f38e7a';
  const BASE_URL = 'https://serpapi.com/search.json';

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
        api_key: SGO_KEY,
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