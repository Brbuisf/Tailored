import axios from 'axios';

class WeatherAdvisor {
  async getWeatherConditions(lat, lon) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return {
      temp: response.data.main.temp,
      rain: response.data.weather.some(w => w.main === 'Rain'),
    };
  }

  suggestOutfit(weather) {
    if (weather.temp < 10) return 'heavy_coat';
    if (weather.rain) return 'waterproof';
    return 'casual';
  }
}
