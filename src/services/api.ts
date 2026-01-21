import axios from 'axios';

const SGO_KEY = 'd58fcad894baf2a956b0f68ce6073fcf588e2a3b899498051d5a553524f38e7a';
const BASE_URL = 'https://serpapi.com/search.json';

export interface Hotel {
  name: string;
  price: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  link: string;
  deal?: string;
}

export const fetchHotels = async (city: string): Promise<Hotel[]> => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 2);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

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

    if (response.data.properties) {
      return response.data.properties.slice(0, 20).map((item: any) => ({
        name: item.name,
        price: item.rate_per_night?.lowest || 'N/A',
        rating: item.overall_rating || 0,
        reviews: item.reviews || 0,
        description: item.description || '',
        image: item.images?.[0]?.original_image || '',
        link: item.link || '#',
        deal: item.deal_description || undefined
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    return [];
  }
};