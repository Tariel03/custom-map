import Cards from "./Cards.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getAPIResponse} from "@/api.ts";

import Sunrise from "/src/assets/sunrise.svg?react"
import Sunset from '/src/assets/sunset.svg?react'
import Cloud from '/src/assets/cloud.svg?react'
import UV from '/src/assets/uv.svg?react'
import Wind from '/src/assets/wind.svg?react'
import Pressure from '/src/assets/pressure.svg?react'
import ArrowUp from '/src/assets/arrow-up.svg?react'
import type {CoordinatesProps} from "@/types.ts";


export default function AdditionalInfo({coordinates}: {coordinates: CoordinatesProps}){
    const {data} = useSuspenseQuery({
        queryKey: [coordinates,'weather'],
        queryFn: () => getAPIResponse(coordinates)
    })
    return(
        <Cards title = "Additional info" childrenClassName = "flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                {rows.map(({label, value, Icon}) => (
                    <div key={value} className="flex justify-between">
                        <div className="flex gap-4">
                            <span className="text-gray-500">{label}:</span>
                            <Icon className="size-8 invert"/>
                        </div>
                        <span> <FormatComponent value={value} number={data.current[value]!} ></FormatComponent></span>
                    </div>
                ))}
            </div>
        </Cards>
    )
}

function FormatComponent({value, number}: {value: string, number: number}) {
    if(value === 'sunrise' || value === 'sunset'){
        return new Date(number * 1000).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC'
        })
    }
    if(value === "wind_deg"){
        return <div className='flex justify-between gap-4 align-center'>
            <span className='text-lg'>{number}</span>
            <ArrowUp style={{transform: `rotate(${number}deg)`}} className="size-8"></ArrowUp>
        </div>
    }
    return number
}

const rows = [
    {label : "Cloudiness(%)", value: "clouds", Icon: Cloud},
    {label : 'UV index', value: "uvi", Icon: UV},
    {label: 'Wind Direction', value: 'wind_deg',Icon: Wind},
    {label: 'Pressure(hPa)', value: 'pressure',Icon: Pressure},
    {label: 'Sunrise', value: 'sunrise',Icon: Sunrise},
    {label: 'Sunset', value: 'sunset', Icon: Sunset},
] as const