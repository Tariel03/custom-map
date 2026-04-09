import {useSuspenseQuery} from "@tanstack/react-query";
import {getAPIResponse} from "@/api.ts";
import Cards from "./Cards.tsx";
import WeatherIcon from "../WeatherIcon.tsx";
import type {CoordinatesProps} from "@/types.ts";

export default function HourlyForecast({coordinates}: {coordinates: CoordinatesProps}) {
    const {data} = useSuspenseQuery({
        queryKey: [coordinates,'weather'],
        queryFn: () => getAPIResponse(coordinates)
    })
    return(
        <Cards title = "Hourly forecast(48 hours)" childrenClassName = "flex gap-6 overflow-x-scroll">
            {data?.hourly.map((hour) => (
                <div key={hour.dt} className="flex flex-col gap-2">
                    <p className='whitespace-nowrap'>{new Date(hour.dt * 1000).toLocaleDateString(undefined, {
                        weekday: 'short',
                        hour : '2-digit',
                        minute: '2-digit',
                        day: 'numeric'})}</p>
                    <WeatherIcon icon={hour.weather[0].icon}></WeatherIcon>
                    <p>Temp: {Math.round(hour.temp)}°C</p>
                </div>
            ))}
        </Cards>
    )
}