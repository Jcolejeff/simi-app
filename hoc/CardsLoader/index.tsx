// import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface ICardsLoader {
   isLoading: boolean;
   children: React.ReactNode;
   className?: string;
   blocksClassName?: string;
   numberOfBlocks?: number;
}

const CardsLoader = ({
   isLoading,
   blocksClassName,
   className,
   children,
   numberOfBlocks = 3,
}: ICardsLoader) => {
   return isLoading ? (
      <div className=" mt-[3rem] grid h-full  w-full grid-cols-1 gap-x-[1.5rem] gap-y-[1.875rem] md:grid-cols-3">
         {[...Array(numberOfBlocks)].map((_: any, idx: number) => {
            return (
               <div key={idx} className="group flex cursor-pointer rounded-[20px]  bg-white">
                  <div className="flex h-full w-full flex-col items-center justify-center  ">
                     <Skeleton className="h-[220px] w-full rounded-lg"></Skeleton>
                     <div className="w-full ">
                        <Skeleton className="my-2 h-[16px] w-[64%] rounded-md" height="12rem" />
                        <Skeleton className="mb-7 mt-2 h-[16px] w-[50%] rounded-md" />
                        <span className="mb-3 mt-5 w-1/2">
                           <Skeleton width="70%" />
                           <Skeleton width="50%" />
                        </span>
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   ) : (
      <>{children}</>
   );
};

export default CardsLoader;
