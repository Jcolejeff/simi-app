/* eslint-disable @next/next/no-img-element */
import { cn, url } from "lib/utils";
// import Icon from 'utils/Icon';

interface IEmptyContentWrapper {
   className?: string;
   isEmpty?: boolean;
   children: React.ReactNode;
   customMessage?: string;
}

const EmptyContentWrapper = ({
   className,
   customMessage,
   isEmpty,
   children,
}: IEmptyContentWrapper) => {
   return isEmpty ? (
      <div
         className={cn(
            "flex  w-full flex-grow  flex-col items-center justify-center gap-4 ",
            className,
         )}
      >
         <img src={url("/svg/dashboard/empty-icon.svg")} alt="" />
         <p className=" text-[12px] leading-[20px] tracking-[0.15px] ">
            {customMessage ? customMessage : `No content available at the moment.`}
         </p>
      </div>
   ) : (
      <>{children}</>
   );
};

export default EmptyContentWrapper;
