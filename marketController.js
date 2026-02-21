// Logika pengambilan data dari SerpApi
const getMarketAnalysis = async (req, res) => {
  const apiKey = "d58fcad894baf2a956b0f68ce6073fcf588e2a3b899498051d5a553524f38e7a";
  const hotelQuery = "Hotel Nexa Bandung";

  try {
    // 1. Ambil Review Terbaru
    const reviewRes = await axios.get(`https://serpapi.com/search.json?engine=google_hotels_reviews&q=${hotelQuery}&api_key=${apiKey}&sort_by=newest`);

    // 2. Ambil Harga OTA & Kompetitor
    const priceRes = await axios.get(`https://serpapi.com/search.json?engine=google_hotels&q=hotel+bintang+4+Bandung&api_key=${apiKey}`);

    res.json({
      rating: reviewRes.data.rating_overview,
      latest_reviews: reviewRes.data.reviews.slice(0, 3),
      ota_prices: priceRes.data.properties[0].offers,
      competitors: priceRes.data.properties.slice(1, 4)
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};