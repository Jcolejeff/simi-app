import Image from "next/image";
import BlogAvatar from "@/public/images/blog/blog-avatar.png";
import { cn } from "@/lib/utils/css";
import { Button } from "../ui/button";

const commentsList = [
   {
      author: "Kobe Bryant",
      comment:
         "In a nisi commodo, porttitor ligula consequat, tincidunt dui. Nulla volutpat, metus eu aliquam malesuada, elit libero venenatis urna, consequat maximus arcu diam non diam.",
      dateAdded: new Date("2024-04-15"),
   },
   {
      author: "Steph Curry",
      comment:
         "In a nisi commodo, porttitor ligula consequat, tincidunt dui. Nulla volutpat, metus eu aliquam malesuada, elit libero venenatis urna, consequat maximus arcu diam non diam.",
      dateAdded: new Date("2024-02-15"),
   },
];

const BlogComments = () => {
   return (
      <div>
         <p className="mb-4 text-[24px] font-[500]">Comments</p>
         {/* comments */}
         <div className="mb-4">
            {commentsList.map((comment, idx) => (
               <div
                  className={`
                     flex items-center gap-4 py-4
                     ${idx !== commentsList.length - 1 ? "border-b" : ""}`}
                  key={idx}
               >
                  <div className="h-[48px] w-[48px] overflow-hidden rounded-full">
                     <Image className="w-full" src={BlogAvatar} alt="blog-avatar" />
                  </div>
                  <div className="w-fit">
                     <div className="flex items-center gap-2 text-[14px] font-[500] text-[#1A1A1A]">
                        <p>{comment.author}</p>
                        <p>•</p>
                        <p className="font-[400] text-[#999999]">4 March, 2024</p>
                     </div>
                     <p className="text-[14px] text-[#666666]">{comment.comment}</p>
                  </div>
               </div>
            ))}
         </div>
         <Button
            className="rounded-full border-[#7AB42C] px-8 font-[600] text-[#7AB42C]"
            variant="outline"
         >
            Load More
         </Button>
      </div>
   );
};

export default BlogComments;
