import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { formatDate, getCreatedDateFromDocument } from "@/lib/utils";
import ProcessError from "@/lib/error";
import useStore from "@/store";

interface DeliveryFee {
   id: string;
   price: number;
   createdDate: string;
   slug: string;
   location: string;
}

const useDeliveryFees = () => {
   const fetchDeliveryFees = async () => {
      const deliveryFeesCollectionRef = collection(db, "deliveryFee");

      const querySnapshot = await getDocs(deliveryFeesCollectionRef);

      const deliveryFees: any = [];

      querySnapshot.forEach((doc) => {
         const createdDate = getCreatedDateFromDocument(doc as any);

         deliveryFees.push({
            id: doc.id,
            ...doc.data(),
            createdDate,
         });
      });

      return deliveryFees;
   };

   const { data, isSuccess, isError, error, isLoading, isRefetching } = useQuery<
      any,
      any,
      DeliveryFee[]
   >({
      queryKey: ["get-deliveryFees"],
      queryFn: fetchDeliveryFees,
   });

   useEffect(() => {
      if (isError) {
         ProcessError(error);
      }
   }, [isError, error]);

   return { data, isSuccess, isError, error, isLoading, isRefetching };
};

export default useDeliveryFees;
