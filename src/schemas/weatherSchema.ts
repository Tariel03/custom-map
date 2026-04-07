import { z } from 'zod';

// Shared weather condition object (used in current, hourly, and daily)
const WeatherConditionSchema = z.object({
    id: z.number(),
    main: z.string(),
    description: z.string(),
    icon: z.string(),
});

// Minutely precipitation helper
const MinutelySchema = z.object({
    dt: z.number(),
    precipitation: z.number(),
});

// Hourly forecast helper
const HourlyWeatherSchema = z.object({
    dt: z.number(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    uvi: z.number(),
    clouds: z.number(),
    visibility: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    weather: z.array(WeatherConditionSchema),
    pop: z.number(), // Probability of precipitation
});

// Daily forecast helper (includes nested temp and feels_like objects)
const DailyWeatherSchema = z.object({
    dt: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
    moonrise: z.number(),
    moonset: z.number(),
    moon_phase: z.number(),
    summary: z.string().optional(),
    temp: z.object({
        day: z.number(),
        min: z.number(),
        max: z.number(),
        night: z.number(),
        eve: z.number(),
        morn: z.number(),
    }),
    feels_like: z.object({
        day: z.number(),
        night: z.number(),
        eve: z.number(),
        morn: z.number(),
    }),
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    weather: z.array(WeatherConditionSchema),
    clouds: z.number(),
    pop: z.number(),
    rain: z.number().optional(),
    snow: z.number().optional(),
    uvi: z.number(),
});

// Main Schema
export const OpenWeatherSchema = z.object({
    lat: z.number(),
    lon: z.number(),
    timezone: z.string(),
    timezone_offset: z.number(),
    current: z.object({
        dt: z.number(),
        sunrise: z.number().optional(),
        sunset: z.number().optional(),
        temp: z.number(),
        feels_like: z.number(),
        pressure: z.number(),
        humidity: z.number(),
        dew_point: z.number(),
        uvi: z.number(),
        clouds: z.number(),
        visibility: z.number(),
        wind_speed: z.number(),
        wind_deg: z.number(),
        wind_gust: z.number().optional(),
        weather: z.array(WeatherConditionSchema),
    }),
    minutely: z.array(MinutelySchema).optional(),
    hourly: z.array(HourlyWeatherSchema),
    daily: z.array(DailyWeatherSchema),
    // Alerts are optional as they only appear during active warnings
    alerts: z.array(z.object({
        sender_name: z.string(),
        event: z.string(),
        start: z.number(),
        end: z.number(),
        description: z.string(),
        tags: z.array(z.string()),
    })).optional(),
});

export type OpenWeatherData = z.infer<typeof OpenWeatherSchema>;