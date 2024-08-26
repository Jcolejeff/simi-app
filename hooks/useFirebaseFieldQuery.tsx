import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import ProcessError from "@/lib/error";
import useStore from "@/store";
import { getCreatedDateFromDocument } from "@/lib/utils";

const useQueryCollectionByField = (
   collectionName: string,
   fieldName: string,
   fieldValue: string,
   orderByLatest = false,
) => {
   const { setLoading, isLoading } = useStore((state) => state);

   const fetchItems = async () => {
      setLoading(true);
      const collectionRef = collection(db, collectionName);
      let q;
      if (orderByLatest) {
         q = query(
            collectionRef,
            where(fieldName, "==", fieldValue),
            orderBy("created_date", "desc"),
         );
      } else {
         q = query(collectionRef, where(fieldName, "==", fieldValue));
      }

      const querySnapshot = await getDocs(q);
      const items: any[] = [];

      querySnapshot.forEach((doc) => {
         const createdDate = getCreatedDateFromDocument(doc as any);
         items.push({
            id: doc.id,
            ...doc.data(),
            createdDate,
         });
      });

      setLoading(false);
      return items;
   };

   const { data, isSuccess, isError, error, refetch } = useQuery({
      queryKey: [collectionName, fieldName, fieldValue],
      queryFn: fetchItems,
   });

   useEffect(() => {
      if (isError) {
         ProcessError(error);
      }
   }, [isError, error]);

   return { data, isSuccess, isError, error, isLoading, refetch };
};

export default useQueryCollectionByField;
