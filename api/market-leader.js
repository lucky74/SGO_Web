import axios from 'axios';

const BASE_URL = 'https://serpapi.com/search.json';

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  const apiKey = process.env.SGO_SERP_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'SerpApi key is not configured' });
  }

  try {
    const reviewPromise = axios.get(BASE_URL, {
      params: {
        engine: 'google_hotels_reviews',
        q,
        api_key: apiKey,
        sort_by: 'newest',
        hl: 'id',
        gl: 'id'
      }
    });

    const pricePromise = axios.get(BASE_URL, {
      params: {
        engine: 'google_hotels',
        q,
        api_key: apiKey,
        gl: 'id',
        hl: 'id',
        currency: 'IDR'
      }
    });

    const [reviewResult, priceResult] = await Promise.allSettled([
      reviewPromise,
      pricePromise
    ]);

    let rating;
    let latest_reviews = [];

    if (reviewResult.status === 'fulfilled') {
      const reviewRes = reviewResult.value;
      const ratingOverview = reviewRes.data?.rating_overview;
      rating = ratingOverview?.rating ? `${ratingOverview.rating} / 5.0` : undefined;

      const reviewsRaw = reviewRes.data?.reviews || [];
      latest_reviews = reviewsRaw.slice(0, 3).map((r) => ({
        snippet: r.snippet || r.summary || '',
        label: r.reviewer ? `- ${r.reviewer}` : '- Guest Review'
      }));
    }

    let properties = [];
    if (priceResult.status === 'fulfilled') {
      const priceRes = priceResult.value;
      properties = priceRes.data?.properties || [];
    }

    const normalizedHotel = String(q).toLowerCase();
    const ownerPropertyExplicit = properties.find(
      (p) => typeof p.name === 'string' && p.name.toLowerCase().includes(normalizedHotel)
    );

    const fallbackOwner = properties[0];
    const ownerProperty = ownerPropertyExplicit || fallbackOwner;
    const ownerClass = ownerProperty?.hotel_class;

    let otaRaw = ownerProperty?.offers || [];
    if (!otaRaw || otaRaw.length === 0) {
      const firstWithOffers = properties.find(
        (p) => Array.isArray(p.offers) && p.offers.length > 0
      );
      otaRaw = firstWithOffers?.offers || [];
    }

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

    let competitorsRaw = properties.filter((p) => {
      if (p === ownerProperty) return false;
      if (!ownerClass) return true;
      return p.hotel_class === ownerClass;
    });

    if (!competitorsRaw.length) {
      competitorsRaw = properties.filter((p) => p !== ownerProperty);
    }

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
    console.error('Market Leader SerpApi Error:', error?.response?.data || error.message);
    return res.status(200).json({
      rating: undefined,
      latest_reviews: [],
      ota_prices: [],
      competitors: [],
      error: error.message || 'SerpApi error'
    });
  }
}
