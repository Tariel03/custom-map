import DailyForecast from "./components/cards/DailyForecast.tsx";
import HourlyForecast from "./components/cards/HourlyForecast.tsx";
import CurrentWeather from "./components/cards/CurrentWeather.tsx";
import AdditionalInfo from "./components/cards/AdditionalInfo.tsx";
import CustomMap from "./components/CustomMap.tsx";
import {Suspense, useState} from "react";
import type {CoordinatesProps} from "./types.ts";
import LocationDropdown from "@/components/dropdowns/LocationDropdown.tsx";
import {useQuery} from "@tanstack/react-query";
import {getGeoCode} from "@/api.ts";
import MapTypeDropdown from "@/components/dropdowns/MapTypeDropdown.tsx";
import CurrentSkeleton from "@/components/skeletons/CurrentSkeleton.tsx";
import HourlySkeleton from "@/components/skeletons/HourlySkeleton.tsx";
import AdditionalInfoSkeleton from "@/components/skeletons/AdditionalInfoSkeleton.tsx";
import DailySkeleton from "@/components/skeletons/DailySkeleton.tsx";
import SidePanel from "@/components/SidePanel.tsx";
import Hamburger from "/src/assets/hamburger.svg?react"


function App() {
    const [coordinates, setCoordinates] = useState<CoordinatesProps>({lat:33.44, lon:-94.04})
    const onMapClick = (lat: number, lon: number) => {
        setCoordinates({lat, lon})
        setLocation('custom')
    }

    const [location, setLocation] = useState<string>('Toronto');
    const[mapType, setMapType] = useState<string>('clouds_new');
    const[isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(true);
    const {data} = useQuery({
        queryKey: ['geoCode', location],
        queryFn: () => getGeoCode({city : location})
        ,
        enabled: location !== 'custom'
    })

    const coords = location === 'custom'
        ? coordinates
        : {lat : data?.lat ?? coordinates.lat, lon: data?.lon ?? coordinates.lon}
  return (
      <>
          <div className="flex flex-col gap-8">
              <div className='flex gap-8'>
                  <div className='flex gap-4 items-center'>
                      <h3 className='text-xl font-semibold'>Location:</h3>
                      <LocationDropdown location = {location} setLocation = {setLocation}/>
                  </div>
                  <div className='flex gap-4 items-center'>
                      <h3 className='text-xl font-semibold'>Map Type:</h3>
                      <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
                  </div>
                  <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='size-8 invert ml-auto'>
                      <Hamburger className="size-full"/>
                  </button>
              </div>
              <CustomMap coordinates={coords} mapType={mapType} onMapClick={onMapClick}/>
              <Suspense fallback={<CurrentSkeleton />}>
                  <CurrentWeather coordinates={coords} />
              </Suspense>
              <Suspense fallback={<DailySkeleton />}>
                  <DailyForecast coordinates={coords} />
              </Suspense>
              <Suspense fallback={<HourlySkeleton />}>
                  <HourlyForecast coordinates={coords} />
              </Suspense>
              <Suspense fallback={<AdditionalInfoSkeleton />}>
                  <AdditionalInfo coordinates={coords} />
              </Suspense>
          </div>
          <SidePanel coordinates={coords} isOpen = {isSidePanelOpen} setOpen = {setIsSidePanelOpen} />
      </>
  )
}


export default App
