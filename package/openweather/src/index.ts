interface OpenWeatherMapJson {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// fetch api using https without any library
import * as https from 'https';

let APIkey: string;

export function setAPIKey(key: string) {
  APIkey = key;
}

export function getWeather(city: string): Promise<OpenWeatherMapJson> {
  return new Promise((resolve, reject) => {
    https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`, (res) => {
      if (res.statusCode === 200) {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => (rawData += chunk));
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            reject(e);
          }
        });
      } else {
        reject(res.statusCode);
      }
    });
  });
}
