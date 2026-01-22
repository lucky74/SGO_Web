import axios from 'axios';

export interface Hotel {
  name: string;
  price: string;
  rating: number;
  reviews: number;
  stars: number;
  hotelClass: string;
  description: string;
  image: string;
  link: string;
  deal?: string;
  location?: string;
}

export const fetchHotels = async (city: string): Promise<Hotel[]> => {
  try {
    // Call Vercel Serverless Function to avoid CORS and hide API Key
    const response = await axios.get('/api/hotels', {
      params: { city }
    });

    if (response.data.properties) {
      return response.data.properties.slice(0, 20).map((item: any) => ({
        name: item.name,
        price: (item.rate_per_night && item.rate_per_night.lowest) || 'N/A',
        rating: item.overall_rating || 0,
        reviews: item.reviews || 0,
        stars: (item.hotel_class ? parseInt(String(item.hotel_class)) : 0) || Math.round(item.overall_rating || 0) || 3,
        hotelClass: String(item.hotel_class || Math.round(item.overall_rating || 0) || 'N/A'),
        description: item.description || '',
        image: (item.images && item.images[0] && item.images[0].original_image) || '',
        link: item.link || '#',
        deal: item.deal_description || undefined,
        location: item.location || undefined
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    return [];
  }
};
