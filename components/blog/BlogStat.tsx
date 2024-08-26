import { FilterIcon, MessageSquareIcon, User2Icon } from "lucide-react";

const BlogStat = (blog: any) => {
   return (
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-gray-600">
         <span className="flex items-center gap-2 text-[14px]">
            <FilterIcon fontSize={"12px"} color="#7AB42C" />
            <p className="text-[#4D4D4D]">{blog.category}</p>
         </span>
         <span className="flex items-center gap-2 text-[14px]">
            <User2Icon fontSize={"12px"} color="#7AB42C" />
            <p className="text-[#4D4D4D]">By {blog.postedBy}</p>
         </span>
         <span className="flex items-center gap-2 text-[14px]">
            <MessageSquareIcon fontSize={"12px"} color="#7AB42C" />
            <p className="text-[#4D4D4D]">{blog.dateAdded}</p>
         </span>
      </div>
   );
};

export default BlogStat;
