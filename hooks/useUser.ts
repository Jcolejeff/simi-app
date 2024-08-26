import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import useStore from "@/store";
import ProcessError from "@/lib/error";

interface UserInfo {
   uid: string;
   email: string;
   displayName: string;
   // Add other user fields here
}

interface AuthDetails extends UserInfo {
   id: string;
}

const useUserInfo = () => {
   const { setAuthDetails, setCurrentUser, setLoggedIn, authDetails } = useStore((store) => ({
      setAuthDetails: store.setAuthDetails,
      setCurrentUser: store.setCurrentUser,
      setLoggedIn: store.setLoggedIn,
      authDetails: store.authDetails,
   }));

   const fetchUserInfo = async (): Promise<UserInfo> => {
      if (!authDetails?.id) {
         throw new Error("User ID is not available");
      }
      const docRef = doc(db, "users", authDetails.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
         return docSnap.data() as UserInfo;
      }
      throw new Error("No such document!");
   };

   const {
      data: userInfo,
      isLoading,
      isError,
      error,
      refetch,
      isFetching,
   } = useQuery<UserInfo, Error>({
      queryKey: ["userInfo", authDetails?.id],
      queryFn: fetchUserInfo,
      enabled: !!authDetails?.id,
      staleTime: 1 * 60 * 1000, // 1 minutes
      retry: 2,
   });

   useEffect(() => {
      if (userInfo) {
         const updatedAuthDetails: AuthDetails = {
            ...userInfo,
            id: authDetails.id!,
         };
         setAuthDetails(updatedAuthDetails);
         setCurrentUser(userInfo);
         setLoggedIn(true);
      }
   }, [
      userInfo,
      setAuthDetails,
      setCurrentUser,
      setLoggedIn,
      authDetails?.id,
      isLoading,
      isFetching,
   ]);

   useEffect(() => {
      if (isError && error) {
         ProcessError(error);
         console.error("Error fetching user data:", error);
      }
   }, [isError, error]);

   return { userInfo, isLoading, error, refetch };
};

export default useUserInfo;
