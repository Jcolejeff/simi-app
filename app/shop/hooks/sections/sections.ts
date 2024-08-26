import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { formatDate, getCreatedDateFromDocument } from "@/lib/utils";
import ProcessError from "@/lib/error";
import useStore from "@/store";

const useSections = () => {
   const fetchsections = async () => {
      const sectionsCollectionRef = collection(db, "showSections");

      const querySnapshot = await getDocs(sectionsCollectionRef);

      const sections: any = [];

      querySnapshot.forEach((doc) => {
         const createdDate = getCreatedDateFromDocument(doc as any);
         const FarmOffTakeAvailable = formatDate(
            new Date(doc.data().FarmOffTakeAvailable.seconds * 1000).toDateString(),
         );
         const FlashSaleAvailable = formatDate(
            new Date(doc.data().FlashSaleAvailable.seconds * 1000).toDateString(),
         );

         sections.push({
            id: doc.id,
            ...doc.data(),
            createdDate,
            FarmOffTakeAvailable,
            FlashSaleAvailable,
         });
      });

      return sections;
   };

   const { data, isSuccess, isError, error } = useQuery({
      queryKey: ["get-sections"],
      queryFn: fetchsections,
   });

   useEffect(() => {
      if (isError) {
         ProcessError(error);
      }
   }, [isError, error]);

   return { data, isSuccess, isError, error };
};

export default useSections;
