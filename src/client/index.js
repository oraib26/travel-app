import { fetchData } from './js/apiFunctions.js';
import { onButtonClick } from './js/eventHandlers.js';
import { performSearch } from './js/app.js';
import './styles/style.scss';

document.getElementById("findTripButton").addEventListener("click", async () => {
  const locationName = document.getElementById("locationInput").value;
  const tripDate = document.getElementById("tripDate").value;
  await performSearch(locationName, tripDate);
});


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  