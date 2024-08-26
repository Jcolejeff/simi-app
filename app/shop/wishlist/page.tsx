"use client";

import React from "react";

import Container from "@/components/shared/container";

import { Text } from "@/components/ui/text";
import WishListMobile from "./molecules/wishlist-mobile";
import WishListTable from "./molecules/wishlist-table";

import RouteDisplay from "../../../components/shared/route-display";

import ShareItem from "@/components/shared/share-item";
import { collection, query, where, getDocs, updateDoc, arrayRemove, doc } from "firebase/firestore";
import { db } from "@/firebase";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import useStore from "@/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EmptyContentWrapper from "@/hoc/EmptyContentWrapper";
function Page() {
   const { authDetails, loggedIn } = useStore((store) => store);
   const { data, refetch } = useQueryCollectionByField("wishlist", "userId", authDetails.id ?? "");
   const router = useRouter();
   const removeFromWishList = (item: any) => {
      const removeItem = async () => {
         if (!authDetails || !authDetails.id) {
            console.error("User ID is undefined or authDetails is not properly initialized.");
            toast.error("Error removing item from wishlist. User ID is missing.");
            return;
         }

         try {
            const collectionRef = collection(db, "wishlist");
            const q = query(collectionRef, where("userId", "==", authDetails.id));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
               toast.error("No wishlist found for the user.");
               return;
            }

            const wishlistDoc = querySnapshot.docs[0];
            const wishlistDocRef = doc(db, "wishlist", wishlistDoc.id);

            await updateDoc(wishlistDocRef, {
               items: arrayRemove(item),
            });

            toast.success("Item removed from wishlist successfully.");
            refetch();
         } catch (error) {
            console.error("Error removing item from wishlist: ", error);
            toast.error("Error removing item from wishlist. Please try again.");
         }
      };

      removeItem();
   };
   return (
      <div className="pt-[4rem]">
         <head>
            <title>My Wishlist | MyFoodAngels</title>
            <meta
               name="description"
               content="View and manage your wishlist on MyFoodAngels. Save your favorite products and easily find them later for purchase."
            />
            <meta
               name="keywords"
               content="My Wishlist, MyFoodAngels, Wishlist, Favorite Products, Online Shopping, Grocery Wishlist"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="My Wishlist | MyFoodAngels" />
            <meta
               property="og:description"
               content="View and manage your wishlist on MyFoodAngels. Save your favorite products and easily find them later for purchase."
            />
            <meta property="og:url" content="https://myfoodangels.com/account/wishlist" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="My Wishlist | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="View and manage your wishlist on MyFoodAngels. Save your favorite products and easily find them later for purchase."
            />
            <meta property="twitter:image" content="/og.jpg" />
         </head>

         <RouteDisplay route={"Wishlist"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <Text size={"lg"} weight={"semibold"}>
                  My Wishlist
               </Text>

               <EmptyContentWrapper
                  isEmpty={data && data?.length <= 0 || data && data[0]?.items.length <= 0}
                  customMessage="No Items in Wishlist Yet"
                  className="flex h-full w-full items-center justify-center py-12 "
               >
                  <WishListMobile
                     data={data ? data[0]?.items : []}
                     removeFromWishList={removeFromWishList}
                  />
                  <WishListTable
                     data={data ? data[0]?.items : []}
                     removeFromWishList={removeFromWishList}
                  />
               </EmptyContentWrapper>

               <div className="flex w-full items-center justify-start px-4">
                  <ShareItem />
               </div>
            </main>
         </Container>
      </div>
   );
}

export default Page;
