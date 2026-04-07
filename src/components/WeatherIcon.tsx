import clsx from "clsx";

type WeatherIconProps = {
    icon: string
    className?: string
}
export default function WeatherIcon({icon, className}: WeatherIconProps) {
    return(
        <img className={clsx("size-8", className)} src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
    )
}