import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Bir, Himachal Pradesh, India, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, HotelAddress, price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, place details, place image url, geo coordinates, ticket pricing, time travel each of the location for 3 days with each day plan with best time to visit in JSON format.  ",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotels": [\n    {\n      "hotelName": "Hotel Snow Valley",\n      "hotelAddress": "Near Old Bus Stand, Bir, Himachal Pradesh 176077",\n      "price": "₹800-₹1500 per night",\n      "hotelImageUrl": "https://example.com/snowvalley.jpg",\n      "geoCoordinates": "31.7261, 77.0671",\n      "rating": "3.8 stars",\n      "description": "A budget-friendly hotel with basic amenities. Offers mountain views."\n    },\n    {\n      "hotelName": "Zostel Bir Billing",\n      "hotelAddress": "Gohar, Himachal Pradesh 176077",\n      "price": "₹600-₹1200 per night",\n      "hotelImageUrl": "https://example.com/zostelbir.jpg",\n      "geoCoordinates": "31.7145, 77.0786",\n      "rating": "4.2 stars",\n      "description": "A hostel with dorm and private rooms, popular among backpackers. Social atmosphere.  May offer cheaper options for couples than private hotel rooms."\n    },\n    {\n      "hotelName": "Hotel Hillock (Budget Room)",\n      "hotelAddress": "Bir, Himachal Pradesh 176077",\n      "price": "₹1000-₹1500 per night",  //Adjusted price range to reflect budget option\n      "hotelImageUrl": "https://example.com/hillock.jpg",\n      "geoCoordinates": "31.7261, 77.0671",\n      "rating": "3.5 stars",\n      "description": "Mid-range hotel;  look for their budget rooms for better price fit. Offers some amenities."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": "Day 1",\n      "plan": [\n        {\n          "time": "9:00 AM - 12:00 PM",\n          "placeName": "Bir Monastery",\n          "placeDetails": "A beautiful and serene Tibetan monastery known for its architecture and peaceful atmosphere.",\n          "placeImageUrl": "https://example.com/birmonastery.jpg",\n          "geoCoordinates": "31.7298, 77.0739",\n          "placeAddress": "Bir, Himachal Pradesh 176077",\n          "ticketPricing": "Free",\n          "timeToTravel": "15 minutes"\n        },\n        {\n          "time": "12:00 PM - 1:00 PM",\n          "placeName": "Lunch at a local eatery",\n          "placeDetails": "Enjoy delicious and affordable Himachali cuisine at one of the many local eateries.",\n          "placeImageUrl": "https://example.com/localfoodbir.jpg",\n          "geoCoordinates": "31.7261, 77.0671",\n          "placeAddress": "Various locations in Bir",\n          "ticketPricing": "₹100-₹200 per person", // Added estimated pricing\n          "timeToTravel": "10 minutes"\n        },\n        {\n          "time": "1:00 PM - 4:00 PM",\n          "placeName": "Bir Landing Site",\n          "placeDetails": "Watch paragliders landing, or if you are adventurous, try paragliding yourself.  Consider shared paragliding for a more budget-friendly experience.",\n          "placeImageUrl": "https://example.com/birlanding.jpg",\n          "geoCoordinates": "31.7205, 77.0875",\n          "placeAddress": "Bir Billing, Himachal Pradesh 176077",\n          "ticketPricing": "Paragliding varies greatly (consider shared flight)",\n          "timeToTravel": "30 minutes"\n        },\n        {\n          "time": "4:00 PM - 6:00 PM",\n          "placeName": "Palpung Sherabling Monastery",\n          "placeDetails": "Another important Tibetan monastery, known for its peaceful ambiance and beautiful architecture.",\n          "placeImageUrl": "https://example.com/palpungmonastery.jpg",\n          "geoCoordinates": "31.7324, 77.0709",\n          "placeAddress": "Bir, Himachal Pradesh 176077",\n          "ticketPricing": "Free",\n          "timeToTravel": "20 minutes"\n        },\n        {\n          "time": "6:00PM Onwards",\n          "placeName": "Sunset and Dinner",\n          "placeDetails": "Enjoy the sunset and have dinner at a budget-friendly restaurant.",\n          "placeImageUrl": "https://example.com/birsunset.jpg",\n          "geoCoordinates": "31.7261, 77.0671",\n          "placeAddress": "Various locations in Bir",\n          "ticketPricing": "₹200-₹400 per person", // Added estimated pricing\n          "timeToTravel": "N/A"\n        }\n      ]\n    },\n    {\n      "day": "Day 2",\n      "plan": [\n        {\n          "time": "9:00 AM - 12:00 PM",\n          "placeName": "Short trek to a nearby viewpoint",\n          "placeDetails": "Explore the hills surrounding Bir with a short, easy trek. Enjoy the stunning views and fresh air.  Choose a shorter, easier trail to manage time and energy.",\n          "placeImageUrl": "https://example.com/birtrek.jpg",\n          "geoCoordinates": "31.7261, 77.0671",\n          "placeAddress": "Various trails near Bir",\n          "ticketPricing": "Free",\n          "timeToTravel": "Varies - allow 2-3 hours including travel time to trailhead"\n        },\n        {\n          "time": "12:00 PM - 1:00 PM",\n          "placeName": "Packed Lunch",\n          "placeDetails": "Enjoy a packed lunch to save money.",\n          "placeImageUrl": "https://example.com/packedlunch.jpg", // Placeholder image\n          "geoCoordinates": "31.7261, 77.0671",\n          "placeAddress": "Enjoy your lunch at a scenic viewpoint from your trek.",\n          "ticketPricing": "Cost of preparing your lunch.",\n          "timeToTravel": "N/A"\n        },\n        {\n          "time": "1:00 PM - 4:00 PM",\n          "placeName": "Explore the local market",\n          "placeDetails": "Find local handicrafts, clothes, and souvenirs.  Bargaining is often expected.",\n          "placeImageUrl": "https://example.com/birmarket.jpg",\n          "geoCoordinates": "31.7261, 77.0671",\n          "placeAddress": "Bir Market",\n          "ticketPricing": "Varies depending on purchases",\n          "timeToTravel": "10 minutes"\n        },\n        {\n          "time": "4:00 PM Onwards",\n          "placeName": "Relaxation and Dinner",\n          "placeDetails": "Relax at your hotel or a cafe and enjoy a final dinner in Bir.",\n          "placeImageUrl": "https://example.com/birrelax.jpg", // Placeholder image\n          "geoCoordinates": "31.7261, 77.0671",\n          "placeAddress": "Various locations in Bir",\n          "ticketPricing": "₹200-₹400 per person", // Added estimated pricing\n          "timeToTravel": "N/A"\n        }\n      ]\n    },\n    {\n      "day": "Day 3",\n      "plan": [\n        {\n          "time": "Morning",\n          "placeName": "Optional:  Early morning walk/yoga",\n          "placeDetails": "Enjoy a peaceful walk or yoga session amidst the natural beauty of Bir.",\n          "placeImageUrl": "https://example.com/birmorning.jpg", // Placeholder image\n          "geoCoordinates": "31.7261, 77.0671",\n          "placeAddress": "Various locations in Bir",\n          "ticketPricing": "Free",\n          "timeToTravel": "N/A"\n        },\n        {\n          "time": "Late Morning",\n          "placeName": "Breakfast and Departure",\n          "placeDetails": "Have a final breakfast and depart from Bir.",\n          "placeImageUrl": "https://example.com/birbreakfast.jpg", // Placeholder image\n          "geoCoordinates": "31.7261, 77.0671",\n          "placeAddress": "Various cafes in Bir",\n          "ticketPricing": "₹100-₹200 per person", // Added estimated pricing\n          "timeToTravel": "Varies depending on transport"\n        }\n      ]\n    }\n  ],\n  "bestTimeToVisit": "March to June and September to November"\n}\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());