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
   const blogs = useBlogs().data || [];
   return (
      <div className="">
         <head>
            <title>Blog | MyFoodAngels</title>
            <meta
               name="description"
               content="Explore the latest articles and insights from MyFoodAngels. Stay updated with our blog on food, grocery shopping, recipes, and more."
            />
            <meta
               name="keywords"
               content="MyFoodAngels Blog, Food Blog, Grocery Shopping Tips, Recipes, Food Delivery, Healthy Eating"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="Blog | MyFoodAngels" />
            <meta
               property="og:description"
               content="Explore the latest articles and insights from MyFoodAngels. Stay updated with our blog on food, grocery shopping, recipes, and more."
            />
            <meta property="og:url" content="https://myfoodangels.com/blog" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Blog | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="Explore the latest articles and insights from MyFoodAngels. Stay updated with our blog on food, grocery shopping, recipes, and more."
            />
            <meta property="twitter:image" content="/og.jpg" />
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     "@context": "https://schema.org",
                     "@type": "Blog",
                     mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": "https://myfoodangels.com/blog",
                     },
                     headline: "Blog | MyFoodAngels",
                     description:
                        "Explore the latest articles and insights from MyFoodAngels. Stay updated with our blog on food, grocery shopping, recipes, and more.",
                     image: "/og.jpg",
                     author: {
                        "@type": "Organization",
                        name: "MyFoodAngels",
                     },
                     publisher: {
                        "@type": "Organization",
                        name: "MyFoodAngels",
                        logo: {
                           "@type": "ImageObject",
                           url: "/icon.png",
                        },
                     },
                  }),
               }}
            />
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
