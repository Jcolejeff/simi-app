"use client";

import { HeartIcon, ShoppingCartIcon, Plus, Minus } from "lucide-react";
import React, { useState, useContext } from "react";

import { Button } from "@/components/ui/button";
import { Ratings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

import { ShopItem } from "@/types";
import { toast } from "sonner";
import { CartContext } from "@/contexts/cart-context";
import { SingleProduct } from "@/types";
import ShareItem from "@/components/shared/share-item";
import Each from "@/components/helpers/each";
import Image from "next/image";
import { formatToNaira } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// import { CartContext } from "@/contexts/cart-context";

function ProductDescription({
   currentItem,
   product,
}: {
   currentItem: Partial<SingleProduct>;
   product: any;
}) {
   const [productCount, setProductCount] = useState(1);

   const { handlePlus, handleMinus } = useContext(CartContext);

   const [selectedWeightId, setSelectedWeightId] = useState(
      currentItem.units && currentItem.units[0].unit,
   );
   const [currentSelectedPrice, setCurrentSelectedPrice] = useState(
      currentItem.units && currentItem.units[0].price,
   );
   const [currentSelectedImage, setCurrentSelectedImage] = useState(
      currentItem.units && currentItem.units[0].image,
   );

   const [showIsNameYourPrice, setShowIsNameYourPrice] = useState(false);
   const [nameYourPriceValue, setNameYourPriceValue] = useState(0);

   const handleWeight = (id: any) => {
      setSelectedWeightId(id);
   };

   const handleAdd = (product: any, price: number, unit: string) => {
      setProductCount(productCount + 1);
      handlePlus(product, {
         price: price,
         unit: unit,
      });
   };

   const handleSubtract = (product: any, price: number, unit: string) => {
      if (productCount === 1) return setProductCount(1);
      setProductCount(productCount - 1);
      handleMinus(product, {
         price: price,
         unit: unit,
      });
   };

   return (
      <>
         <div>
            <div className="flex h-[300px] w-full items-center justify-center">
               <Image
                  src={currentSelectedImage || ""}
                  alt={"Product Image"}
                  width={300}
                  height={300}
                  className="h-[300px] w-[300px] rounded-md object-cover"
               />
            </div>
         </div>
         <div className="flex-1 p-2">
            <div className="flex w-full items-center justify-between">
               <Text size={"2xl"} weight={"semibold"} className="capitalize">
                  {currentItem.name}
               </Text>
               {/* <Button className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
               <HeartIcon className="w-4 text-gray-600" />
            </Button> */}
            </div>
            <div className="mt-4 flex items-end justify-start gap-2">
               <Ratings value={5} />
               <Text size={"xs"} weight={"medium"}>
                  {" "}
                  {currentItem.ratings && currentItem.ratings.length}{" "}
                  {currentItem.ratings && "reviews"}
               </Text>
            </div>
            <div className="mt-2 flex w-full items-center justify-start gap-2">
               <Text size={"md"} weight={"semibold"}>
                  ₦{currentSelectedPrice?.toLocaleString()}
               </Text>
               {product.inStock ? (
                  <Text
                     className="rounded-2xl border border-green-100 bg-green-100 px-4 py-2"
                     size={"xs"}
                     weight={"normal"}
                  >
                     In stock
                  </Text>
               ) : (
                  <Text
                     className="rounded-2xl border border-red-100 bg-red-100 px-4 py-2"
                     size={"xs"}
                     weight={"normal"}
                  >
                     Out of stock
                  </Text>
               )}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
               <Text size={"sm"} weight={"medium"}>
                  Unit of Measurement:
               </Text>
               <Each
                  of={currentItem.units || []}
                  render={(item) => (
                     <Button
                        key={item?.ratio}
                        onClick={() => {
                           setSelectedWeightId(item?.unit);
                           setCurrentSelectedPrice(item?.price);
                           setCurrentSelectedImage(item?.image);
                           showIsNameYourPrice && setShowIsNameYourPrice(false);
                        }}
                        className={
                           item?.unit === selectedWeightId
                              ? `rounded-2xl border border-[#7ab42c] bg-[#7ab42c] px-4 py-1 capitalize text-white`
                              : `rounded-2xl border border-gray-300 bg-white px-4 py-1 capitalize text-gray-600`
                        }
                     >
                        {item?.unit}
                     </Button>
                  )}
               />
               {product.nameYourPrice && (
                  <Button
                     onClick={() => {
                        setSelectedWeightId("Name Your Price");
                        setShowIsNameYourPrice(true);
                     }}
                     className={
                        "Name Your Price" === selectedWeightId
                           ? `rounded-2xl border border-[#7ab42c] bg-[#7ab42c] px-4 py-1 capitalize text-white`
                           : `rounded-2xl border border-gray-300 bg-white px-4 py-1 capitalize text-gray-600`
                     }
                  >
                     Name Your Price
                  </Button>
               )}
            </div>
            <Separator className="my-4" />

            <div className="my-3">
               {showIsNameYourPrice ? (
                  <div>
                     <Text size={"sm"} weight={"medium"}>
                        Name Your Price: Minimum {formatToNaira(product.minimumPrice)}
                     </Text>
                     <Input
                        type="number"
                        value={nameYourPriceValue}
                        onChange={(e) => {
                           setNameYourPriceValue(parseInt(e.target.value));
                        }}
                        className="my-3 w-full rounded-2xl border border-gray-300 p-2"
                     />
                     <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2">
                        <Button
                           disabled={
                              !product.inStock || nameYourPriceValue < product.minimumPrice
                                 ? true
                                 : false
                           }
                           onClick={() => {
                              if (nameYourPriceValue < product.minimumPrice) {
                                 toast.error("Price must be greater than minimum price");
                                 return;
                              }
                              if (nameYourPriceValue >= product.minimumPrice) {
                                 handleSubtract(
                                    product,
                                    nameYourPriceValue,
                                    selectedWeightId as string,
                                 );
                              }
                           }}
                           className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                        >
                           <Minus className="w-4" />
                        </Button>
                        <Text size={"sm"} weight={"medium"}>
                           {productCount}
                        </Text>
                        <Button
                           disabled={
                              !product.inStock || nameYourPriceValue < product.minimumPrice
                                 ? true
                                 : false
                           }
                           onClick={() => {
                              if (nameYourPriceValue < product.minimumPrice) {
                                 toast.error("Price must be greater than minimum price");
                                 return;
                              }
                              if (nameYourPriceValue >= product.minimumPrice) {
                                 handleAdd(product, nameYourPriceValue, selectedWeightId as string);
                              }
                           }}
                           className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                        >
                           <Plus className="w-4" />
                        </Button>
                     </div>
                     <Button
                        disabled={nameYourPriceValue < product.minimumPrice ? true : false}
                        onClick={(e) => {
                           if (nameYourPriceValue < product.minimumPrice) {
                              toast.error("Price must be greater than minimum price");
                              return;
                           }
                           if (nameYourPriceValue >= product.minimumPrice) {
                              handlePlus(product, {
                                 unit: selectedWeightId,
                                 price: nameYourPriceValue,
                              });
                              // setShowIsNameYourPrice(false);
                           }
                        }}
                        className=" w-full rounded-3xl text-sm"
                     >
                        Add to Cart <ShoppingCartIcon className="w-4 text-white" />
                     </Button>
                  </div>
               ) : (
                  <div className="flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2">
                     <Button
                        disabled={!product.inStock || showIsNameYourPrice ? true : false}
                        onClick={() => {
                           handleSubtract(
                              product,
                              currentSelectedPrice as number,
                              selectedWeightId as string,
                           );
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                     >
                        <Minus className="w-4" />
                     </Button>
                     <Text size={"sm"} weight={"medium"}>
                        {productCount}
                     </Text>
                     <Button
                        disabled={!product.inStock || showIsNameYourPrice ? true : false}
                        onClick={() => {
                           handleAdd(
                              product,
                              currentSelectedPrice as number,
                              selectedWeightId as string,
                           );
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                     >
                        <Plus className="w-4" />
                     </Button>
                  </div>
               )}
            </div>
            {!showIsNameYourPrice && (
               <Button
                  disabled={product.inStock ? false : true}
                  onClick={(e) =>
                     handlePlus(product, {
                        unit: selectedWeightId,
                        price: currentSelectedPrice,
                     })
                  }
                  className="mt-4 w-full rounded-3xl text-sm disabled:cursor-not-allowed"
               >
                  Add to Cart <ShoppingCartIcon className="w-4 text-white" />
               </Button>
            )}
            <Separator className="my-4" />
            <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
               <Text size={"sm"} weight={"medium"}>
                  Category: <span className="text-gray-400">{currentItem.category?.name}</span>
               </Text>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
               <Text size={"sm"} weight={"medium"}>
                  Tag: <span className="text-gray-400"> {currentItem.subcategory?.name}</span>
               </Text>
            </div>
            <ShareItem />
         </div>
      </>
   );
}

export default ProductDescription;
