const API_CONFIG = {
  geonames: {
    username: process.env.GEONAMES_USERNAME,
    url: "http://api.geonames.org/searchJSON",
  },
  weatherbit: {
    key: process.env.WEATHERBIT_API_KEY,
    url: "https://api.weatherbit.io/v2.0",
  },
  pixabay: {
    key: process.env.PIXABAY_API_KEY,
    url: "https://pixabay.com/api/",
  },
};
async function fetchLocation(locationName) {
  try {
    const response = await fetch(
      `${API_CONFIG.geonames.url}?q=${locationName}&maxRows=10&username=${API_CONFIG.geonames.username}`
    );
    const data = await response.json();
    if (data.geonames && data.geonames.length > 0) {
      return data.geonames[0];
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
}

async function fetchWeather(lat, lon, tripDate) {
  const currentDate = new Date();
  const selectedDate = new Date(tripDate);

  const diffInDays = (selectedDate - currentDate) / (1000 * 3600 * 24);
  let weatherUrl;

  if (diffInDays <= 7) {
    // Current weather
    weatherUrl = `${API_CONFIG.weatherbit.url}/current?lat=${lat}&lon=${lon}&key=${API_CONFIG.weatherbit.key}`;
  } else {
    // 16-day forecast
    weatherUrl = `${API_CONFIG.weatherbit.url}/forecast/daily?lat=${lat}&lon=${lon}&key=${API_CONFIG.weatherbit.key}`;
  }

  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();

    if (diffInDays > 7) {
      // Look for the weather on the selected trip date
      const forecastForSelectedDate = data.data.find(
        (item) => item.datetime === tripDate
      );
      return forecastForSelectedDate || data.data[0];
    } else {
      return data.data[0];
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
async function fetchImages(keyword) {
  try {
    const response = await fetch(
      `${API_CONFIG.pixabay.url}?key=${API_CONFIG.pixabay.key}&q=${encodeURIComponent(keyword)}&image_type=photo`
    );
    const data = await response.json();
    if (data.hits && data.hits.length > 0) {
      return data.hits[0].webformatURL;
    } else {
      throw new Error("No images found");
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    return null;
  }
}
export async function performSearch(locationName, tripDate) {
  try {
    const locationData = await fetchLocation(locationName);
    if (!locationData) {
      alert("Location not found.");
      return;
    }

    const { lat, lng } = locationData;
    const weatherData = await fetchWeather(lat, lng, tripDate);
    const imageData = await fetchImages(locationName);

    if (weatherData && imageData) {
      updateUI({
        location: locationName,
        weather: weatherData,
        image: imageData,
      });
    } else {
      alert("Unable to fetch data.");
    }
  } catch (error) {
    console.error("Error performing search:", error);
    alert("An error occurred while fetching data.");
  }
}

function updateUI(data) {
  // Update location
  document.getElementById("locationResult").innerText = `Location: ${data.location}`;

  // Update weather
  if (data.weather) {
    document.getElementById("weatherResult").innerText = `Weather: ${data.weather.temp}°C, ${data.weather.weather.description}`;
  } else {
    document.getElementById("weatherResult").innerText = "Weather data not available";
  }

  // Update image
  const imageElement = document.getElementById("imageResult");
  if (data.image) {
    imageElement.src = data.image;
    imageElement.alt = data.location;
  } else {
    imageElement.src = "";
    imageElement.alt = "No image available";
  }
}
      