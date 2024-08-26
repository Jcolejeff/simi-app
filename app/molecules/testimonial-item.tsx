import React from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Ratings } from "@/components/ui/rating";
import { Text } from "@/components/ui/text";

interface TestimonialItemProps {
   img: string;
   name: string;
   role: string;
   rating: number;
   message: string;
}

function TestimonialItem({ img, name, role, rating, message }: TestimonialItemProps) {
   return (
      <CarouselItem className="md:basis-1/2 lg:basis-1/3">
         <div className="p-1">
            <Card className="w-full bg-white">
               <CardHeader>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        {/* <Avatar>
                           <AvatarImage
                              className="h-full w-full rounded-[inherit] object-cover"
                              src={img}
                              alt={name}
                           />

                           <AvatarFallback>{"Customer"}</AvatarFallback>
                        </Avatar> */}
                        <div>
                           <CardTitle className="mb-1">{name}</CardTitle>
                           <CardDescription>{role}</CardDescription>
                        </div>
                     </div>
                     <Ratings value={rating} />
                  </div>
               </CardHeader>
               <CardContent>
                  <Text size={"sm"} weight={"medium"}>
                     {message}
                  </Text>
               </CardContent>
            </Card>
         </div>
      </CarouselItem>
   );
}

export default TestimonialItem;
