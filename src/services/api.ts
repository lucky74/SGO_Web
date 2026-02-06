import axios from 'axios';
import { MOCK_HOTELS } from '../data/mockHotels';

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
        timeout: 3000 // 3s timeout
      });
    } catch (apiError) {
      console.warn('API call failed, falling back to mock data:', apiError);
      // Return mock data properly filtered using getMockData
      return getMockData(city);
    }

    if (response && response.data && Array.isArray(response.data.properties)) {
      const data = response.data.properties.slice(0, 60).map((item: any) => {
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
      
      // If API returns empty, use mock data for demonstration
      if (data.length === 0) {
        console.log('API returned empty data, using mock data.');
        return getMockData(city);
      }
      
      return data;
    }
    
    // Fallback if structure is invalid
    console.warn('Invalid API response structure, using mock data.');
    return getMockData(city);

  } catch (error) {
    console.error('Error fetching hotel data:', error);
    // Final fallback
    return getMockData(city);
  }
};

const getMockData = (city: string): Hotel[] => {
  const searchCity = city.toLowerCase().trim();
  
  // If searching for "Indonesia" or "All", return ALL mock data
  if (searchCity === 'indonesia' || searchCity === 'all' || searchCity === '') {
    return MOCK_HOTELS;
  }

  // Filter mock data by city
  const filtered = MOCK_HOTELS.filter(h => 
    (h.location?.toLowerCase().includes(searchCity)) || 
    (h.name.toLowerCase().includes(searchCity))
  );

  // If we found matching hotels in our expanded mock DB, return them
  if (filtered.length > 0) {
    return filtered;
  }

    // If no specific city found in mock DB, return a generic set with the searched city name
    // This ensures the user always sees "results" for their demo
    // Limit to 20 to prevent "double-double" issues as requested
    const genericHotels = MOCK_HOTELS.slice(0, 20).map(h => ({
      ...h,
      // Create a neutral hotel name by removing the original city prefix
      // e.g., "Jakarta Grand Hotel 1" -> "Grand Hotel 1"
      name: h.name.replace(/Jakarta|Bali|Bandung|Surabaya|Yogyakarta|Medan|Makassar/g, '').trim(),
      location: city
    }));

    // Ensure uniqueness by name to avoid duplicates
    const uniqueHotels = genericHotels.filter((hotel, index, self) =>
      index === self.findIndex((t) => (
        t.name === hotel.name
      ))
    );

    return uniqueHotels;
  };
