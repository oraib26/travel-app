// src/client/index.js
import { fetchData } from './js/apiFunctions.js';
import { onButtonClick } from './js/eventHandlers.js';
import { performSearch } from './js/app.js';

async function searchLocation() {
  const location = document.getElementById('locationInput').value;
  const response = await fetch(`/location?city=${location}`);
  const data = await response.json();
  document.getElementById('locationResult').innerText = JSON.stringify(data, null, 2);
}

async function searchWeather() {
  const lat = document.getElementById('latitude').value;
  const lon = document.getElementById('longitude').value;
  const response = await fetch(`/weather?lat=${lat}&lon=${lon}`);
  const data = await response.json();
  document.getElementById('weatherResult').innerText = JSON.stringify(data, null, 2);
}

async function searchImages() {
  const keyword = document.getElementById('imageQuery').value;
  const response = await fetch(`/images?q=${encodeURIComponent(keyword)}`);
  const data = await response.json();
  document.getElementById('imageResult').innerText = JSON.stringify(data, null, 2);
}





if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
 
  