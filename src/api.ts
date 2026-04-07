import {OpenWeatherSchema} from "./schemas/weatherSchema.ts";

type APIInput = { lat: number, lon: number }
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
export async function getAPIResponse({lat, lon} : APIInput) {
    const result = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    const data = await result.json()
    console.log(data)
    return OpenWeatherSchema.parse(data)
}