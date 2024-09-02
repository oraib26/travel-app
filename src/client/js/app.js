// src/client/js/app.js

// Placeholder for actual API keys and URLs
const API_CONFIG = {
  geonames: {
    username: process.env.GEONAMES_USERNAME, 
    url: 'http://api.geonames.org/searchJSON'
  },
  weatherbit: {
    key: process.env.WEATHERBIT_API_KEY, 
    url: 'https://api.weatherbit.io/v2.0/current'
  },
  pixabay: {
    key: process.env.PIXABAY_API_KEY, 
    url: 'https://pixabay.com/api/'
  }
};

const AppData = {
  lastFetched: {},
  searchResults: {},
  fetchWeather: async function(lat, lon) {
    const response = await fetch(`${API_CONFIG.weatherbit.url}?lat=${lat}&lon=${lon}&key=${API_CONFIG.weatherbit.key}`);
    const data = await response.json();
    this.lastFetched.weather = data;
    return data;
  },
  fetchLocation: async function(locationName) {
    const response = await fetch(`${API_CONFIG.geonames.url}?q=${locationName}&maxRows=10&username=${API_CONFIG.geonames.username}`);
    const data = await response.json();
    this.lastFetched.location = data;
    return data;
  },
  fetchImages: async function(keyword) {
    const response = await fetch(`${API_CONFIG.pixabay.url}?key=${API_CONFIG.pixabay.key}&q=${encodeURIComponent(keyword)}&image_type=photo`);
    const data = await response.json();
    this.lastFetched.images = data;
    return data;
  }
};

export async function performSearch(locationName) {
  try {
    const locationData = await AppData.fetchLocation(locationName);
    const { lat, lng } = locationData.geonames[0];

    const weatherData = await AppData.fetchWeather(lat, lng);
    const imageData = await AppData.fetchImages(locationName);

    console.log({
      location: locationData,
      weather: weatherData,
      images: imageData
    });

    return {
      location: locationData,
      weather: weatherData,
      images: imageData
    };
  } catch (error) {
    console.error('Error performing search:', error);
    return null;
  }
}

