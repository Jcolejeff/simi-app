import RecentlyAddedBlogs from "@/components/blog/RecentlyAddedBlogs";
import TopCategories from "@/components/blog/TopCategories";
import WithRouteDisplay from "@/components/shared/with-route-display";
import { cn } from "@/lib/utils/css";
import styles from "@/components/blog/blog.module.css";
import Image from "next/image";
import BlogAvatar from "@/public/images/blog/blog-avatar.png";
import BlogStat from "@/components/blog/BlogStat";
import { Blog } from "@/components/blog/mockData";
import LeaveAComment from "@/components/blog/LeaveAComment";
import BlogComments from "@/components/blog/BlogComments";
import { getCreatedDateFromDocument } from "@/lib/utils";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import { capitalizeFirstLetter } from "@/lib/helpers";

interface params {
   params: {
      id: string;
   };
}

export const revalidate = 60;

async function queryCollectionByField(collectionName: string, fieldName: string, blogSlug: string) {
   const q = query(collection(db, collectionName), where(fieldName, "==", blogSlug));

   try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
         const doc = querySnapshot.docs[0];
         const createdDate = getCreatedDateFromDocument(doc as any);

         return {
            id: doc.id,
            ...doc.data(),
            dateAdded: createdDate,
            title: doc.data().title,
            image: doc.data().image,
            category: doc.data().category || "Food",
            postedBy: doc.data().postedBy || "Admin",
            contents: doc.data().data,
            slug: doc.data().slug,
         };
      } else {
         console.log("No matching documents found.");
         return null;
      }
   } catch (error) {
      console.error("Error querying documents: ", error);
      return null;
   }
}

export async function generateMetadata(
   { params }: params,
   parent: ResolvingMetadata,
): Promise<Metadata> {
   const slug = params.id;
   const blog: Blog | null = (await queryCollectionByField("posts", "slug", slug)) as Blog;

   if (!blog) {
      return {
         title: "Blog Post Not Found | MyFoodAngels",
         description: "The requested blog post could not be found.",
      };
   }

   const previousImages = (await parent).openGraph?.images || [];

   return {
      title: `${capitalizeFirstLetter(blog.title)} | Simi's Blog`,
      description: blog.contents.slice(0, 160) || `Read about ${blog.title} on Simi's blog.`,
      generator: "Next.js",
      applicationName: "Simi's Blog",
      referrer: "origin-when-cross-origin",
   };
}

async function Page({ params: { id } }: params) {
   const slug = id;
   const singleBlog: Blog | null = (await queryCollectionByField("posts", "slug", slug)) as Blog;

   if (!slug) return notFound();
   if (!singleBlog) return notFound();

   const iconContainerClasses =
      "group flex h-[24px] w-[24px] items-center justify-center rounded-full hover:cursor-pointer hover:bg-green-600 hover:text-white duration-700 hover:transition-all ";
   const iconStyle = "group-hover:text-white";

   return (
      <div>
         <WithRouteDisplay route="Blog">
            <div
               className={cn(
                  styles.blogWrapper,
                  "mb-12 flex w-full flex-col-reverse gap-16 md:mb-24  md:flex-row",
               )}
            >
               <div className={cn("hideScroll overflow-hidden", styles.blogSection)}>
                  <Image
                     className="h-auto w-auto rounded-xl"
                     alt="blog-banner"
                     src={singleBlog.image}
                     width={200}
                     height={400}
                  />
                  <div className="pb-2 pt-8">{/* <BlogStat {...blogs[0]} /> */}</div>
                  <h1 className="mb-8 text-[32px] font-[500]">{singleBlog.title}</h1>
                  <div className="flex justify-between">
                     <div className="flex items-center gap-4">
                        {/* <span className="h-[48px] w-[48px] overflow-hidden rounded-full">
                  <Image src={BlogAvatar} alt="blog-avatar" />
                </span> */}
                        <div>
                           {/* <p className="text-[16px] font-[500] text-[#1A1A1A]">Deborah Oladeji</p> */}
                           <div className="flex items-center gap-2 text-[14px] text-[#808080]">
                              <p>{singleBlog.dateAdded}</p>
                              <p>•</p>
                              <p>6 min read</p>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className={iconContainerClasses}>
                           <Facebook className={iconStyle} />
                        </span>
                        <span className={iconContainerClasses}>
                           <Twitter className={iconStyle} />
                        </span>
                        <span className={iconContainerClasses}>
                           <Linkedin className={iconStyle} />
                        </span>
                        <span className={iconContainerClasses}>
                           <Instagram className={iconStyle} />
                        </span>
                     </div>
                  </div>
                  {/* Blog Content */}
                  <div
                     className={cn("post-content space-y-8 pb-8 pt-8", styles.blogPageContent)}
                     dangerouslySetInnerHTML={{ __html: singleBlog.contents }}
                  ></div>
                  {/* <LeaveAComment /> */}
                  {/* <BlogComments /> */}
               </div>
            </div>
         </WithRouteDisplay>
      </div>
   );
}

export default Page;
