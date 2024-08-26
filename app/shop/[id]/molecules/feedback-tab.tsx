"use client";
import React from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Ratings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import ReviewModal from "@/components/shared/create-review";

interface IReviews {
   userId: string;
   productId: string;
   text: string;
   rating: number;
   firstName: string;
   lastName: string;
   title: string;
   image: string;
   isApproved: boolean;
}
function FeedbackTab({ productId }: { productId: string }) {
   const { data, refetch } = useQueryCollectionByField("reviews", "productId", productId);
   const reviews = data as IReviews[];
   const refetchReviews = () => {
      refetch();
   };
   return (
      <TabsContent value="feedback">
         <div className="mx-auto w-full max-w-[500px] py-3">
            {reviews?.length > 0 &&
               reviews.map((rating, index) => {
                  return (
                     <div className="border-b border-gray-300 p-3" key={index}>
                        <div className="mb-3 flex items-center justify-between ">
                           <div className="flex items-center gap-2">
                              <Avatar>
                                 <AvatarImage
                                    className="h-full w-full rounded-[inherit] object-cover"
                                    src={rating.image}
                                    alt={`${rating.firstName} ${rating.lastName}`}
                                 />
                                 <AvatarFallback>{"Customer"}</AvatarFallback>
                              </Avatar>
                              <div>
                                 <Text className="mb-1 capitalize" weight={"medium"} size={"sm"}>
                                    {rating.firstName} {rating.lastName}
                                 </Text>

                                 <Ratings value={rating.rating || 0} />
                              </div>
                           </div>
                           <Text weight={"medium"} size={"xs"} className="capitalize">
                              {rating.title}
                           </Text>
                        </div>
                        <Text size={"xs"}>{rating.text}</Text>
                     </div>
                  );
               })}
         </div>
         <ReviewModal productId={productId} refetchReviews={refetchReviews} />
      </TabsContent>
   );
}

export default FeedbackTab;
