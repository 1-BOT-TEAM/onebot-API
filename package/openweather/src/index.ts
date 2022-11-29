import fetch from 'node-fetch';

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

// create config function to get api key
let APIKEY: string;
export function setApiKey(apiKey: string) {
    APIKEY = apiKey;
}

export async function getWeather(city: string): Promise<OpenWeatherMapJson> {
    if (!APIKEY) {
        throw new Error('API key not set');
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)
    const data = await response.json() as any as OpenWeatherMapJson
    return data;
}