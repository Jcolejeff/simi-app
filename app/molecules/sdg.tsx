import React from "react";

import Image from "next/image";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import { Text } from "@/components/ui/text";

import industry from "../../images/factory.png";
import family from "../../images/family.png";
import food from "../../images/food.png";
import gender from "../../images/gender.png";
import growth from "../../images/growth.png";
import recycle from "../../images/recycle.png";

const sdgItems = [
   { id: 1, title: "Responsible Consumption", imageLink: recycle },
   { id: 2, title: "Innovation and Infrastructure", imageLink: industry },
   { id: 3, title: "Good Jobs and Economic Growth", imageLink: growth },
   { id: 4, title: "No Hunger", imageLink: food },
   { id: 5, title: "No Poverty", imageLink: family },
   { id: 6, title: "Gender Equality", imageLink: gender },
];

function Sdg() {
   return (
      <Container backgroundColor="bg-gray-100 py-8">
         <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 px-4 py-4">
            <Text className="my-4 w-full text-left" size={"xl"} weight={"bold"}>
               Sustainable Development Goals (SDGs)
            </Text>
            <div className="grid w-full grid-cols-2 gap-4 py-4 md:grid-cols-3">
               <Each
                  of={sdgItems}
                  render={(item: any, index: number) => (
                     <div
                        key={index}
                        className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#b2dd43] to-[#488d18] p-4"
                     >
                        <Text
                           className="text-center text-sm uppercase text-white md:text-lg"
                           weight={"medium"}
                        >
                           {item.title}
                        </Text>
                        <Image
                           className="h-14 w-14 md:h-24 md:w-24"
                           src={item.imageLink}
                           alt={item.title}
                        />
                     </div>
                  )}
               />
            </div>
         </main>
      </Container>
   );
}

export default Sdg;
