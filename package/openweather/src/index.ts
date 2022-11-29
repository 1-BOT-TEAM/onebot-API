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

function fetch(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => (rawData += chunk));
        res.on('end', () => {
          try {
            resolve(rawData);
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

export async function getWeatherByName(city: string): Promise<OpenWeatherMapJson> {
  if (!APIkey) {
    throw new Error('API key is not set');
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
  const data = await fetch(url);
  return JSON.parse(data);
}

export async function getWeatherByZip(zip: string): Promise<OpenWeatherMapJson> {
  if (!APIkey) {
    throw new Error('API key is not set');
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${APIkey}&units=metric`;
  const data = await fetch(url);
  return JSON.parse(data);
}

export async function getWeatherByCoord(lat: number, lon: number): Promise<OpenWeatherMapJson> {
  if (!APIkey) {
    throw new Error('API key is not set');
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
  const data = await fetch(url);
  return JSON.parse(data);
}
