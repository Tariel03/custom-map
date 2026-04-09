import Cards from "@/components/cards/Cards.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function CurrentSkeleton() {

    return(
        <Cards title = "Current weather" childrenClassName = "flex flex-col items-center gap-6">
            <div  className="flex flex-col gap-2 items-center">
                <Skeleton className='w-30 h-15'></Skeleton>
                <Skeleton className='size-14 rounded-full'></Skeleton>
                <Skeleton className='w-35 h-7'></Skeleton>

            </div>
            <div className='flex flex-col gap-2 items-center '>
                <p className='text-xl text-center'>Local time :</p>
                <Skeleton className='w-35 h-10'></Skeleton>
            </div>
            <div className='flex justify-between w-full'>
                <div className='flex flex-col gap-2 items-center '>
                    <p>Feels like: </p>
                    <Skeleton className='w-16 h-6'></Skeleton>
                </div>

                <div className='flex flex-col gap-2 items-center '>
                    <p>Humidity: </p>
                    <Skeleton className='w-16 h-6'></Skeleton>
                </div>

                <div className='flex flex-col gap-2 items-center '>
                    <p>Wind: </p>
                    <Skeleton className='w-16 h-6'></Skeleton>
                </div>
            </div>
        </Cards>
    )
}