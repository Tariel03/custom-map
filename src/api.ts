import {OpenWeatherSchema} from "./schemas/weatherSchema.ts";
import {GeocodingResponseSchema} from "@/schemas/geocodeSchema.ts";
import {AirPollutionSchema} from "@/schemas/airPollutionSchema.ts";

type APIInput = { lat: number, lon: number }
type CityInput = {city: string}
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
export async function getAPIResponse({lat, lon} : APIInput) {
    const result = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    const data = await result.json()
    console.log(data)
    return OpenWeatherSchema.parse(data)
}

export async function getGeoCode({city}: CityInput) {
    const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    const json = await result.json();
    // 1. Parse as an ARRAY
    const validatedData = GeocodingResponseSchema.parse(json);
    // 2. Return the first object (or null if not found)
    return validatedData[0] || null;
}

export async function getAirPollutionData({lat, lon} : APIInput) {
    const result = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    const data = await result.json()
    return AirPollutionSchema.parse(data)
}