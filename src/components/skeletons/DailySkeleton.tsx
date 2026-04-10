import Cards from "@/components/cards/Cards.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function DailySkeleton() {
    return (
        <Cards title = "Daily forecast" childrenClassName = "flex flex-col gap-4">
            {Array.from({length: 8}).map(() => (
                <div  className="flex justify-between">
                    <Skeleton className='w-9 h-8'></Skeleton>
                    <Skeleton className='size-8 rounded-full'></Skeleton>
                    <Skeleton className='size-8'></Skeleton>
                    <Skeleton className='size-8'></Skeleton>
                    <Skeleton className='size-8'></Skeleton>
                </div>
            ))}
        </Cards>
    );
}

export default DailySkeleton;