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

    const ownerClass =
      ownerProperty?.extracted_hotel_class !== undefined
        ? ownerProperty.extracted_hotel_class
        : ownerProperty?.hotel_class;

    let otaRaw = Array.isArray(ownerProperty?.prices) ? ownerProperty.prices : [];
    if (!otaRaw.length) {
      const firstWithPrices = properties.find(
        (p) => Array.isArray(p.prices) && p.prices.length > 0
      );
      otaRaw = firstWithPrices?.prices || [];
    }

    const ota_prices = otaRaw.map((item) => {
      const source = item.source || 'OTA';
      const rn = item.rate_per_night || {};
      const extracted = rn.extracted_lowest || rn.extracted_before_taxes_fees;
      const base =
        rn.lowest ||
        rn.before_taxes_fees ||
        (typeof extracted === 'number'
          ? `IDR ${extracted.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`
          : undefined);
      const price = base || '-';
      const highlighted =
        typeof source === 'string' &&
        (source.toLowerCase().includes('traveloka') || source.toLowerCase().includes('agoda'));
      return { source, price, highlighted };
    });

    let competitorsRaw = properties.filter((p) => p !== ownerProperty);

    if (ownerClass !== undefined && ownerClass !== null) {
      const sameClass = competitorsRaw.filter((p) => {
        const c =
          p.extracted_hotel_class !== undefined ? p.extracted_hotel_class : p.hotel_class;
        return c === ownerClass;
      });
      if (sameClass.length) {
        competitorsRaw = sameClass;
      }
    }

    const competitors = competitorsRaw.slice(0, 3).map((p) => {
      const name = p.name || 'Competitor';
      const rp = p.rate_per_night || {};
      const extracted = rp.extracted_lowest || rp.extracted_before_taxes_fees;
      const base =
        rp.lowest ||
        rp.before_taxes_fees ||
        (typeof extracted === 'number'
          ? `IDR ${extracted.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`
          : undefined);
      const price = base || '-';
      return { name, price };
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
