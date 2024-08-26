import React from "react";

import Container from "@/components/shared/container";
import {
   Carousel,
   CarouselContent,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import { Text } from "@/components/ui/text";

import TestimonialItem from "./testimonial-item";

function Testimonials() {
   const testimonials = [
      {
         name: "Daniel Olatunji",
         role: "Customer",
         rating: 5,
         message:
            "My experience with my food angels has been the best,i got my stuffs delivered on time and the customer service was top notch",
         img: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
      },

      {
         name: "Mary Ekong",
         role: "Customer",
         rating: 5,
         message:
            "All i can say is, my food angels is great, and also great prices as well.I will definitely be back for more",
         img: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
      },
      {
         name: "Joshua Abel",
         role: "Customer",
         rating: 4,
         message:
            "I had a great experience with my food angels, the delivery was on time and the customer service was top notch",
         img: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
      },
   ];
   return (
      <Container backgroundColor="bg-gray-100 pb-4">
         <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 px-4 py-8">
            <Carousel
               opts={{
                  align: "start",
               }}
               className="w-full"
            >
               <div className="mb-4 flex w-full items-center justify-between py-8">
                  <Text size={"xl"} weight={"bold"}>
                     What Our Customers Say
                  </Text>
                  <span className="flex items-center justify-end gap-2">
                     <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
                     <CarouselNext className="relative left-0 top-0 translate-y-0 bg-[#7ab42c] text-white" />
                  </span>
               </div>
               <CarouselContent>
                  {testimonials.map((item, index) => (
                     <TestimonialItem
                        key={index}
                        img={item.img}
                        name={item.name}
                        role={item.role}
                        rating={item.rating}
                        message={item.message}
                     />
                  ))}
               </CarouselContent>
            </Carousel>
         </main>
      </Container>
   );
}

export default Testimonials;
