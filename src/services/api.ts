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
      return response.data.properties.slice(0, 60).map((item: any) => {
        if (!item) return null;
        const starMatch = String(item.hotel_class || '').match(/(\d+)/);
        const stars = starMatch ? parseInt(starMatch[0]) : 0;
        
        return {
        name: item.name || 'Unknown Hotel',
        price: item.rate_per_night && item.rate_per_night.lowest ? String(item.rate_per_night.lowest) : 'N/A',
        rating: item.overall_rating || 0,
        reviews: item.reviews || 0,
        stars: stars,
        hotelClass: item.hotel_class ? (String(item.hotel_class).includes('Star') || String(item.hotel_class).includes('Bintang') ? String(item.hotel_class) : `Bintang ${item.hotel_class}`) : 'Tidak Ada Data',
        description: item.description || '',
        image: (item.images && item.images[0] && item.images[0].original_image) || '',
        link: item.link || '#',
        deal: item.deal_description || undefined,
        location: item.location || undefined
      }}).filter((item: any) => item !== null);
    }
    return [];
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    return [];
  }
};
