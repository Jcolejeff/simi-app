import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { formatDate, getCreatedDateFromDocument } from "@/lib/utils";
import ProcessError from "@/lib/error";
import useStore from "@/store";

const useAnnouncement = () => {
   const fetchAnnouncement = async () => {
      const announcementCollectionRef = collection(db, "announcement");

      const querySnapshot = await getDocs(announcementCollectionRef);

      const announcement: any = [];

      querySnapshot.forEach((doc) => {
         const createdDate = getCreatedDateFromDocument(doc as any);
         const duration = formatDate(new Date(doc.data().duration.seconds * 1000).toDateString());
         const durationDate = new Date(doc.data().duration.seconds * 1000);
         const currentDate = new Date();
         const isDurationPast = durationDate < currentDate;

         announcement.push({ id: doc.id, ...doc.data(), createdDate, duration, isDurationPast });
      });

      return announcement;
   };

   const { data, isSuccess, isError, error } = useQuery({
      queryKey: ["get-announcement"],
      queryFn: fetchAnnouncement,
   });

   useEffect(() => {
      if (isError) {
         ProcessError(error);
      }
   }, [isError, error]);

   return { data, isSuccess, isError, error };
};

export default useAnnouncement;
