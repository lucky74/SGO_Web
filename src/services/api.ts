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
    console.log(`Fetching hotels for ${city}...`);
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Try to call the API
    let response;
    try {
      response = await axios.get('/api/hotels', {
        params: { city },
        timeout: 15000 // Increased timeout to 15s for SerpApi
      });
    } catch (apiError) {
      console.warn('API call failed:', apiError);
      // Return empty array if API fails, NO MOCK DATA fallback
      return [];
    }

    if (response && response.data && Array.isArray(response.data.properties)) {
      // Limit to 20 items as requested by user
      const data = response.data.properties.slice(0, 20).map((item: any) => {
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
      
      // If API returns empty, return empty array, NO MOCK DATA fallback
      if (data.length === 0) {
        console.log('API returned empty data.');
        return [];
      }
      
      return data;
    }
    
    // Fallback if structure is invalid
    console.warn('Invalid API response structure.');
    return [];

  } catch (error) {
    console.error('Error fetching hotel data:', error);
    // Final fallback
    return [];
  }
};
