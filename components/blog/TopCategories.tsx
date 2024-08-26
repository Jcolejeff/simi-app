import { Text } from "../ui/text";
import { categories } from "./mockData";

const TopCategories = () => {
   return (
      <div className="mb-6 hidden rounded-xl bg-white p-4 text-[#1A1A1A] md:block">
         <Text className="mb-2 text-[24px] font-medium">Top Categories</Text>
         <div>
            {categories.map(({ itemCount, name }, index) => (
               <div
                  className="group flex w-full items-center justify-between py-[4px] text-[16px] hover:cursor-pointer "
                  key={index}
                  onClick={() => {}}
               >
                  <span className="group-hover:underline ">{name}</span>
                  <span className="text-[#808080]">({itemCount})</span>
               </div>
            ))}
         </div>
      </div>
   );
};

export default TopCategories;
