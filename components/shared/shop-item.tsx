"use client";

import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { Eye, HeartIcon } from "lucide-react";
import React, { useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import { ShopItem } from "@/types";

import { Button } from "../ui/button";
import { Text } from "../ui/text";

import styles from "./shop-item.module.css";

import { CartContext } from "@/contexts/cart-context";

import { cn } from "@/lib/utils/css";
import { formatToNaira, splitStringBySpaceAndReplaceWithDash } from "@/lib/utils";
import { formatMoney } from "@/lib/helpers";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
   collection,
   query,
   where,
   getDocs,
   addDoc,
   updateDoc,
   arrayUnion,
   doc,
   arrayRemove,
} from "firebase/firestore";
import { db } from "@/firebase";
import useStore from "@/store";
import Spinner from "../ui/spinner";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
const Shop = ({ itemDetails, isFlashSale }: { itemDetails: ShopItem; isFlashSale?: boolean }) => {
   const { handlePlus } = useContext(CartContext);
   const { authDetails, loggedIn } = useStore((state) => state);
   const { data, refetch } = useQueryCollectionByField("wishlist", "userId", authDetails.id ?? "");
   const wishlist = data ? data[0]?.items : [{ id: "1" }];

   const [isLoading, setIsLoading] = React.useState(false);

   const addToWishList = (item: any) => {
      const singleOrder = {
         items: [item],
         userId: authDetails.id,
      };

      const addItem = async () => {
         setIsLoading(true);
         try {
            const collectionRef = collection(db, "wishlist");
            const q = query(collectionRef, where("userId", "==", authDetails.id ?? ""));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
               // No existing wishlist for the user, create a new one
               await addDoc(collectionRef, singleOrder);
               toast.success("Item added to wishlist successfully.");
            } else {
               // Wishlist exists, update the items array
               const wishlistDoc = querySnapshot.docs[0];
               const wishlistDocRef = doc(db, "wishlist", wishlistDoc.id);

               await updateDoc(wishlistDocRef, {
                  items: arrayUnion(item),
               });
               toast.success("Item added to wishlist successfully.");
               refetch();
            }
         } catch (error) {
            console.error("Error creating or updating order: ", error);
            toast.error("Error adding item to wishlist. Please try again.");
         }
         setIsLoading(false);
      };

      addItem();
   };
   const removeFromWishList = (item: any) => {
      const removeItem = async () => {
         if (!authDetails || !authDetails.id) {
            console.error("User ID is undefined or authDetails is not properly initialized.");
            toast.error("Error removing item from wishlist. User ID is missing.");
            return;
         }
         setIsLoading(true);

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

            toast.info("Item removed from wishlist successfully.");
            refetch();
         } catch (error) {
            console.error("Error removing item from wishlist: ", error);
            toast.error("Error removing item from wishlist. Please try again.");
         }
         setIsLoading(false);
      };

      removeItem();
   };

   let amountSaved =
      itemDetails.units[0].markedUpPrice - Number(itemDetails.units && itemDetails.units[0].price);
   if (amountSaved < 0) {
      amountSaved = 0;
   }

   return (
      <div
         //  href={`/shop/${itemDetails.id}`}
         className="relative w-full cursor-pointer border border-transparent bg-white py-10 shadow-none duration-300 md:px-4 md:hover:border-gray-300"
      >
         {isFlashSale && (
            <div className="absolute left-1 top-1 z-10 rounded-3xl bg-red-800 px-5 py-2 text-xs text-white md:left-3 md:top-3">
               Save ₦{itemDetails.amountSaved?.toLocaleString()}
            </div>
         )}
         {loggedIn && itemDetails.inStock && (
            <>
               {isLoading ? (
                  <Spinner color="green" className="absolute right-3 top-3 w-4  text-red-600" />
               ) : (
                  <>
                     <HeartIcon
                        onClick={() => {
                           wishlist?.some((wishItem: any) => wishItem.id === itemDetails.id)
                              ? removeFromWishList(itemDetails)
                              : addToWishList(itemDetails);
                           if (wishlist) {
                           }
                        }}
                        className={cn("absolute right-3 top-3  w-6 text-gray-600", {
                           "text-red-600": wishlist?.some(
                              (wishItem: any) => wishItem.id === itemDetails.id,
                           ),
                           "fill-red-600": wishlist?.some(
                              (wishItem: any) => wishItem.id === itemDetails.id,
                           ),
                        })}
                     />
                  </>
               )}
            </>
         )}
         {itemDetails.units[0].isDiscounted && amountSaved > 0 && itemDetails.inStock && (
            <div className="absolute left-3 top-3 z-[2] rounded-md bg-red-800 p-3">
               <Text size={"xs"} weight={"medium"} className="text-white opacity-95">
                  Save {formatToNaira(amountSaved)}
               </Text>
            </div>
         )}

         <div className="w-full p-0">
            <div
               className={`${styles.img_container} relative flex w-full items-center justify-center`}
            >
               <Link href={`/shop/${splitStringBySpaceAndReplaceWithDash(itemDetails.name)}`}>
                  <Image
                     src={itemDetails.units && itemDetails.units[0].image}
                     alt={"image"}
                     width={300}
                     height={300}
                     className="h-[10rem] w-[13rem] rounded-md object-cover"
                  />
               </Link>
               <div
                  className={`absolute bottom-0 hidden w-full items-center justify-between border border-gray-300 bg-gray-200 ${!itemDetails.inStock ? "" : ""}`}
               >
                  <button
                     onClick={(e) => addToWishList(itemDetails)}
                     className={`w-full  flex-col items-center justify-center rounded-none p-0 ${loggedIn ? "flex" : "hidden"}`}
                  >
                     <HeartIcon className="w-4" />
                     <Text size={"xs"} weight={"medium"}>
                        Add to Wishlist
                     </Text>
                  </button>
                  <Link
                     className="flex w-full flex-col items-center justify-center py-[11.5px]"
                     href={`/shop/${splitStringBySpaceAndReplaceWithDash(itemDetails.name)}`}
                  >
                     <Eye className="w-4" />
                     <Text size={"xs"} weight={"medium"}>
                        View Item
                     </Text>
                  </Link>
               </div>
            </div>
            <Link
               href={`/shop/${splitStringBySpaceAndReplaceWithDash(itemDetails.name)}`}
               className="flex w-full flex-col items-start justify-start"
            >
               <Text className="mt-2 capitalize" size={"sm"} weight={"semibold"}>
                  {itemDetails.name} - {itemDetails.units[0].unit}
               </Text>
               <div className="my-2 flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                  <Text
                     size={"xs"}
                     weight={"medium"}
                     className="flex items-center gap-1 text-gray-500"
                  >
                     <StarIcon className="w-3" />
                     {itemDetails.rating} ({itemDetails.ratingCount} reviews)
                  </Text>
                  <div className="flex items-center justify-end gap-2">
                     {isFlashSale && (
                        <Text weight={"semibold"} size={"xs"}>
                           ₦{itemDetails?.newPrice?.toLocaleString()}
                        </Text>
                     )}
                     {itemDetails.units[0].isDiscounted &&
                        amountSaved > 0 &&
                        itemDetails.inStock && (
                           <Text
                              weight={"semibold"}
                              size={"xs"}
                              className=" text-gray-500 line-through"
                           >
                              {formatToNaira(
                                 Number(itemDetails.units && itemDetails.units[0].markedUpPrice) ??
                                    0,
                              )}
                           </Text>
                        )}
                     <Text
                        className={cn("font-bold", isFlashSale && "text-gray-500 line-through")}
                        weight={"semibold"}
                        size={"xs"}
                     >
                        {/* ₦{itemDetails.units && itemDetails.units[0].price} */}
                        {formatToNaira(
                           Number(itemDetails.units && itemDetails.units[0].price) ?? 0,
                        )}
                     </Text>
                  </div>
               </div>
            </Link>
            <Button
               disabled={!itemDetails.inStock}
               onClick={(e) =>
                  handlePlus(itemDetails, {
                     price: itemDetails.units && itemDetails.units[0].price,
                     unit: itemDetails.units && itemDetails.units[0].unit,
                  })
               }
               className="mt-4 w-full rounded-3xl text-xs disabled:cursor-not-allowed"
            >
               {itemDetails.inStock ? (
                  <>
                     Add to Cart <ShoppingCartIcon className="w-3 text-white" />
                  </>
               ) : (
                  <>
                     Out of Stock <ShoppingCartIcon className="w-3 text-white" />
                  </>
               )}
            </Button>
         </div>
      </div>
   );
};

export default Shop;
