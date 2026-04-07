import DailyForecast from "./components/cards/DailyForecast.tsx";
import HourlyForecast from "./components/cards/HourlyForecast.tsx";
import CurrentWeather from "./components/cards/CurrentWeather.tsx";
import AdditionalInfo from "./components/cards/AdditionalInfo.tsx";
import CustomMap from "./components/CustomMap.tsx";
import {useState} from "react";
import type {CoordinatesProps} from "./types.ts";

function App() {
    const [coordinates, setCoordinates] = useState<CoordinatesProps>({lat:33.44, lon:-94.04})
    const onMapClick = (lat: number, lon: number) => {
        setCoordinates({lat, lon})
    }
  return (
      <div className="flex flex-col gap-8">
          <CustomMap coordinates={coordinates} onMapClick={onMapClick}/>
          <CurrentWeather coordinates={coordinates} />
          <DailyForecast coordinates={coordinates} />
          <HourlyForecast coordinates={coordinates} />
          <AdditionalInfo coordinates={coordinates} />

      </div>

  )
}


export default App
