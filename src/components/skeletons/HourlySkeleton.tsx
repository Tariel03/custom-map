import Cards from "@/components/cards/Cards.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function HourlySkeleton() {
    return (
        <Cards title = "Hourly forecast(48 hours)" childrenClassName = "flex gap-6 overflow-x-scroll">
            {Array.from({length: 48}).map(() => (
                <div className="flex flex-col gap-2">
                <Skeleton className='w-9 h-8'></Skeleton>
                <Skeleton className='size-8 rounded-full'></Skeleton>
                <Skeleton className='size-8 '></Skeleton>
                </div>
            ))}
        </Cards>
    );
}

export default HourlySkeleton;