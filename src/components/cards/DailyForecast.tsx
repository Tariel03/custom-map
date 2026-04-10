import {useSuspenseQuery} from "@tanstack/react-query";
import {getAPIResponse} from "@/api.ts";
import Cards from "./Cards.tsx";
import WeatherIcon from "../WeatherIcon.tsx";
import type {CoordinatesProps} from "@/types.ts";

export default function DailyForecast({coordinates}: {coordinates: CoordinatesProps}) {
    const {data} = useSuspenseQuery({
        queryKey: [coordinates,'weather'],
        queryFn: () => getAPIResponse(coordinates)
    })
    return(
        <Cards title = "Daily forecast" childrenClassName = "flex flex-col gap-4">
                {data?.daily?.map((day) => (
                    <div key={day.dt} className="flex justify-between">
                        <p className='w-12'>{new Date(day.dt * 1000).toLocaleDateString(undefined, {
                            weekday: 'short',
                            day: 'numeric'})}</p>
                        <WeatherIcon icon={day.weather[0].icon}></WeatherIcon>
                        <p>Temp: {Math.round(day.temp.day)}°C</p>
                        <p>Min: {Math.round(day.temp.min)}°C</p>
                        <p>Max: {Math.round(day.temp.max)}°C</p>
                    </div>
                ))}
        </Cards>
    )
}
