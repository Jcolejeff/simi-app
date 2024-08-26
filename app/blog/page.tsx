"use client";

import styles from "@/components/blog/blog.module.css";
import { cn } from "@/lib/utils/css";
import WithRouteDisplay from "@/components/shared/with-route-display";
import TopCategories from "@/components/blog/TopCategories";
import RecentlyAddedBlogs from "@/components/blog/RecentlyAddedBlogs";
import BlogSection from "@/components/blog/BlogSection";
import BlogDetail from "@/components/blog/BlogDetail";
import useBlogs from "./hooks/useBlogs";
import EmptyContentWrapper from "@/hoc/EmptyContentWrapper";
const Page = () => {
   const { data ,isLoading } = useBlogs() 
   const blogs = data || []

   if (isLoading) {
      return (
         <div className="flex h-screen w-full items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
         </div>
      );
   }
   

   return (
      <div className="">
         <head>
            <title>Blog | Simi</title>
            </head>

         <WithRouteDisplay route="Blog" extraChildrenClassname="">
            <div
               className={cn(
                  styles.blogWrapper,
                  "mb-12 flex w-full flex-col-reverse gap-8 md:h-[70vh] md:flex-row",
               )}
            >
               <aside
                  className={cn(
                     styles.blogSidebar,
                     "  hideScroll hidden md:h-[70vh] md:w-[20%] md:min-w-[280px] lg:w-[20%] lg:min-w-[320px]",
                  )}
               >
                  <TopCategories />
                  <RecentlyAddedBlogs />
               </aside>
               
               <EmptyContentWrapper
                  isEmpty={blogs && blogs?.length <= 0}
                  customMessage="No blogs at the moment"
                  className="flex h-full w-full items-center justify-center py-12 "
               >
                  <div className={cn("hideScroll", styles.blogSection)}>
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog, index) => (
                           <BlogDetail key={index} {...blog} />
                        ))}
                     </div>
                  </div>
               </EmptyContentWrapper>
            </div>
         </WithRouteDisplay>
      </div>
   );
};

export default Page;
