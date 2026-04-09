import Cards from "@/components/cards/Cards.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function AdditionalInfoSkeleton() {
    return (
        <Cards title = "Additional info" childrenClassName = "flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                {Array.from({length: 6}).map(() => (
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                            <Skeleton className='w-15 h-5'></Skeleton>
                            <Skeleton className="size-8 invert"></Skeleton>
                        </div>
                        <Skeleton className="w-20 9"></Skeleton>
                    </div>
                ))}
            </div>
        </Cards>
    );
}

export default AdditionalInfoSkeleton;