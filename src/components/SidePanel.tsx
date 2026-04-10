import {type Dispatch, type SetStateAction, Suspense} from "react";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getAirPollutionData} from "@/api.ts";
import type {CoordinatesProps} from "@/types.ts";
import Cards from "@/components/cards/Cards.tsx";
import {Slider} from "@/components/ui/slider";
import {AIR_QUALITY_INDEX_DATA} from "@/components/AirQualityIndexData.ts";
import {clsx} from "clsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import InfoIcon from '/src/assets/info.svg?react'
import {POLLUTANT_NAMES} from "@/PolluntNames.ts";
import LeftArrow from "/src/assets/left-arrow.svg?react"

type Props = {
    coordinates: CoordinatesProps,
    isOpen: boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
}
function SidePanel(props: Props) {
    const {isOpen, setOpen} = props;
    return (
        <div className={clsx('fixed top-0 right-0 h-screen w-90 shadow-md bg-sidebar z-2001 py-8 px-4 overflow-y-scroll', isOpen ? 'translate-x-0' : 'translate-x-full')}>
            <button onClick={() => setOpen(false)}>
                <LeftArrow className="size-8 invert -ml-2"/>
            </button>
            <Suspense>
                <AirPollution coordinates={props.coordinates}/>
            </Suspense>
        </div>
    );
}

function AirPollution({coordinates}: {coordinates: CoordinatesProps}) {
    const {data} = useSuspenseQuery({
        queryKey: ['pollution', coordinates],
        queryFn: () => getAirPollutionData(coordinates)
    })
    return(
        <div className='flex flex-col gap-4'>
            <h2 className="text-2xl font-semibold">
                Air Pollution:
            </h2>
            <h1 className="text-5xl font-bold">
                {data.list[0].main.aqi}
            </h1>
            <div className='flex items-center gap-2'>
                <h2 className="text-2xl font-semibold">
                    AQI
                </h2>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <InfoIcon className="size-3 invert"/>
                        </TooltipTrigger>
                        <TooltipContent className='z-2000'>
                            <p className='max-w-xs'>Air Quality Index.
                                Possible values: 1, 2, 3, 4, 5.
                                Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


            </div>

            {Object.entries(data.list[0].components).map(
                ([key, value]) =>{
                    const pollutant = AIR_QUALITY_INDEX_DATA[key.toUpperCase() as keyof typeof AIR_QUALITY_INDEX_DATA];
                    const max = Math.max(pollutant['Very Poor'].min, value);
                    const currentLevel = (() => {
                        for (const [level, range] of Object.entries(pollutant) as [keyof typeof pollutant, { min: number, max: number }][]) {
                            if (value >= range.min && (range.max === Infinity || value <= range.max)) {
                                return level;
                            }
                        }
                        return 'Very Poor';
                    })();
                    const qualityColor = (() => {
                        switch (currentLevel) {
                            case 'Very Poor':
                                return 'bg-red-500';
                            case 'Poor':
                                return 'bg-orange-500';
                            case 'Moderate':
                                return 'bg-yellow-500';
                            case 'Good':
                                return 'bg-green-500';
                            default:
                                return 'bg-gray-500';
                        }
                    })()
                    return (
                        <Cards key={key}  className='hover:scale-105 transition-transform duration-300 from-sidebar-accent to-siderbar-accent/60 gap-0!'
                               childrenClassName='flex flex-col gap-3'>
                            <div className='flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-lg font-bold capitalize'>{key}: </span>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <InfoIcon className="size-3 invert"/>
                                            </TooltipTrigger>
                                            <TooltipContent className='z-2000'>
                                                <p className='max-w-xs'>
                                                    Concentration of {POLLUTANT_NAMES[key.toUpperCase()].full} in the air.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                </div>
                                <span className='text-lg font-semibold capitalize'>{value}</span>
                            </div>
                            <Slider disabled value={[value]} max={max} min={0}/>
                            <div className='flex justify-between text-xs'>
                                <p>0</p>
                                <p>{max}</p>
                            </div>
                            <div className='flex justify-between'>
                                {Object.keys(pollutant).map(
                                    (level) => (
                                        <div key={level} className='flex flex-col items-center gap-1'>
                                            <span className={clsx('text-xs px-2 py-1 rounded-md font-medium',level === currentLevel ? qualityColor: 'bg-muted text-muted-foreground') }>{level}</span>
                                        </div>
                                    )
                                )}
                            </div>
                        </Cards>
                    )
                }
            )}
        </div>
    )
}


export default SidePanel;