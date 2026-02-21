import axios from 'axios';

const BASE_URL = 'https://serpapi.com/search.json';

export default async function handler(req, res) {
  const { city, hotel } = req.query;

  if (!city || !hotel) {
    return res.status(400).json({ error: 'City and hotel parameters are required' });
  }

  const apiKey = process.env.SGO_SERP_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'SerpApi key is not configured' });
  }

  try {
    const hotelQuery = hotel;

    const reviewPromise = axios.get(BASE_URL, {
      params: {
        engine: 'google_hotels_reviews',
        q: hotelQuery,
        api_key: apiKey,
        sort_by: 'newest',
        hl: 'id',
        gl: 'id'
      }
    });

    const pricePromise = axios.get(BASE_URL, {
      params: {
        engine: 'google_hotels',
        q: `Hotels in ${city}`,
        api_key: apiKey,
        gl: 'id',
        hl: 'id',
        currency: 'IDR'
      }
    });

    const [reviewRes, priceRes] = await Promise.all([reviewPromise, pricePromise]);

    const ratingOverview = reviewRes.data?.rating_overview;
    const rating = ratingOverview?.rating ? `${ratingOverview.rating} / 5.0` : undefined;

    const reviewsRaw = reviewRes.data?.reviews || [];
    const latest_reviews = reviewsRaw.slice(0, 3).map((r) => ({
      snippet: r.snippet || r.summary || '',
      label: r.reviewer ? `- ${r.reviewer}` : '- Guest Review'
    }));

    const properties = priceRes.data?.properties || [];

    const normalizedHotel = hotel.toLowerCase();
    const ownerProperty =
      properties.find(
        (p) =>
          typeof p.name === 'string' &&
          p.name.toLowerCase().includes(normalizedHotel)
      ) || properties[0];

    const ownerClass = ownerProperty?.hotel_class;

    const otaRaw = ownerProperty?.offers || [];

    const ota_prices = otaRaw.map((offer) => {
      const source = offer.provider || offer.display_name || offer.name || 'OTA';
      const price = offer.rate_per_night_micros
        ? `IDR ${(offer.rate_per_night_micros / 1_000_000).toLocaleString('id-ID', {
            maximumFractionDigits: 0
          })}`
        : offer.price || '-';
      const highlighted =
        typeof source === 'string' &&
        (source.toLowerCase().includes('traveloka') || source.toLowerCase().includes('agoda'));
      return { source, price, highlighted };
    });

    const competitorsRaw = properties.filter((p) => {
      if (p === ownerProperty) return false;
      if (!ownerClass) return true;
      return p.hotel_class === ownerClass;
    });

    const competitors = competitorsRaw.slice(0, 3).map((p) => {
      const name = p.name || 'Competitor';
      const priceMicros = p.rate_per_night_micros;
      const priceFormatted = priceMicros
        ? `IDR ${(priceMicros / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 0 })}`
        : p.display_price || p.price || '-';
      return { name, price: priceFormatted };
    });

    return res.status(200).json({
      rating,
      latest_reviews,
      ota_prices,
      competitors
    });
  } catch (error) {
    console.error('Market Leader SerpApi Error:', error.message);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
