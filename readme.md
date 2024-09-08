Travel App

A travel application that allows users to search for a destination, retrieve weather data based on their selected travel date, and view images of the location. The app integrates the Geonames API for location data, the Weatherbit API for weather forecasts, and the Pixabay API for images.

# Table of Contents
1. Installation
2. Usage
3. Updating API Keys
4. Features
5. Technologies
6. Future Improvements
7. License

# Installation 

To set up and run this project locally, follow these steps:
1. Clone the repository:

git clone https://github.com/your-username/travel-app.git
cd travel-app

2. Install dependencies:

npm install

3. Create an .env file in the root directory to store API keys (see the Updating API Keys section below for more details).

4. Build the project:
npm run build

5. Start the development server:
npm start

# Usage
1. Enter a location in the input field and select the date of your trip.
2. If your trip is within the next 7 days, the current weather forecast will be displayed.
3. For trips planned more than 7 days ahead, a future forecast will be retrieved.
4. An image of the selected location will also be displayed.

# Updating API Keys
This application relies on external APIs, so you will need to add your own API keys. The API keys are managed using a .env file.

To set this up:
1. Create a .env file in the root of your project:
touch .env

2. Add the following variables to your .env file, replacing the placeholder values with your actual API keys:

GEONAMES_USERNAME=your_geonames_username
WEATHERBIT_API_KEY=your_weatherbit_api_key
PIXABAY_API_KEY=your_pixabay_api_key
 
- Geonames API: Sign up at Geonames and get a username.
- Weatherbit API: Sign up at Weatherbit and get an API key.
- Pixabay API: Sign up at Pixabay and get an API key.

# Features
- Search for weather data based on a selected location and date.
- Display the current weather forecast for trips within the next 7 days.
- Retrieve future weather forecasts for trips more than a week ahead.
- Display images of the location retrieved from Pixabay.
- Offline capabilities using Service Workers.


# Technologies
- Frontend: HTML, SCSS, JavaScript, Webpack
- Backend: Node.js, Express.js
- APIs: Geonames, Weatherbit, Pixabay
- Testing: Jest for unit testing
- Service Workers: Workbox for offline functionality

# Future Improvements
- Allow users to add multiple destinations on the same trip.
- Include additional APIs for hotel and flight data integration.
- Add a feature for saving trips and exporting them as a PDF.
- Implement a countdown timer for upcoming trips.
- Add the ability to remove or update trips.
- Improve the UI with enhanced animations and transitions.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

