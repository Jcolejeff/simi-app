import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { getCreatedDateFromDocument } from "@/lib/utils";
import ProcessError from "@/lib/error";
import useStore from "@/store";
import { Blog } from "@/components/blog/mockData";
const useBlogs = () => {
   const fetchBlogs = async () => {
      const blogsCollectionRef = collection(db, "posts");

      const querySnapshot = await getDocs(blogsCollectionRef);

      const blogs: Blog[] = [];

      querySnapshot.forEach((doc) => {
         const createdDate = getCreatedDateFromDocument(doc as any);
         blogs.push({
            id: doc.id,
            ...doc.data(),
            dateAdded: createdDate,
            title: doc.data().title,
            image: doc.data().image,
            category: doc.data().category || "Food",
            postedBy: doc.data().postedBy || "Admin",
            contents: doc.data().data,
            slug: doc.data().slug,
         });
      });

      return blogs;
   };

   const { data, isSuccess, isError, error } = useQuery({
      queryKey: ["get-blogs"],
      queryFn: fetchBlogs,
   });

   useEffect(() => {
      if (isError) {
         ProcessError(error);
      }
   }, [isError, error]);

   return { data, isSuccess, isError, error };
};

export default useBlogs;
