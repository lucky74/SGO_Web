import { Hotel } from '../services/api';

const CITIES = ['Jakarta', 'Bali', 'Bandung', 'Surabaya', 'Yogyakarta', 'Medan', 'Makassar'];
const HOTEL_TYPES = ['Grand', 'Luxury', 'Resort', 'Boutique', 'City', 'Budget', 'Inn', 'Suites'];
const IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-6e53ce416862?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"
];

// Generate 50+ mock hotels
const generateMockHotels = (): Hotel[] => {
  const hotels: Hotel[] = [];
  
  CITIES.forEach(city => {
    // Create 8-12 hotels per city
    const count = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < count; i++) {
      const stars = 2 + Math.floor(Math.random() * 4); // 2-5 stars
      const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
      const priceBase = stars * 300000;
      const price = priceBase + Math.floor(Math.random() * 500000);
      
      hotels.push({
        name: `${city} ${type} Hotel ${i + 1}`,
        price: `IDR ${price.toLocaleString('id-ID')}`,
        rating: 3.5 + Math.random() * 1.5,
        reviews: 50 + Math.floor(Math.random() * 2000),
        stars: stars,
        hotelClass: `Bintang ${stars}`,
        description: `Experience the best of ${city} at our ${type} hotel. Perfect for business and leisure.`,
        image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        link: "#",
        location: city
      });
    }
  });

  return hotels;
};

export const MOCK_HOTELS: Hotel[] = generateMockHotels();
