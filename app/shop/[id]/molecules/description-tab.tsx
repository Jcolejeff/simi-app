import { Tag, LeafIcon } from "lucide-react";
import React from "react";

import { TabsContent } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";

function DescriptionTab() {
   return (
      <TabsContent value="description">
         <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
            <Text className="text-gray-500" size={"xs"} weight={"medium"}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a cursus nibh, sit
               amet lobortis metus. Fusce dapibus, turpis non ornare porttitor, ligula magna
               facilisis odio, at ultricies sapien arcu vitae turpis. Integer at dolor sit amet
               ipsum imperdiet accumsan. Aliquam vel magna vestibulum, tristique ipsum Pellentesque
               posuere ante condimentum lectus tincidunt, in volutpat felis tristique. Nam eu ornare
               leo. Nunc egestas congue ligula, vitae sagittis nunc pellentesque a. Praesent
               scelerisque mauris lorem, non aliquam odio ultricies in. Phasellus a lacinia libero.
               Sed eleifend quis massa eget dictum. Integer porttitor pulvinar volutpat. Duis eget
               molestie magna. Etiam vestibulum justo at justo rhoncus, a feugiat lectus vulputate.
               Suspendisse potenti. Morbi facilisis velit ut est vulputate posuere.
            </Text>
            <div className="hidden w-full md:block">
               <iframe
                  className="h-[250px] w-full border border-gray-200"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  allowFullScreen={true}
               ></iframe>
               <div className="mt-4 flex w-full items-center justify-between gap-2 border border-gray-200">
                  <div className="flex flex-1 items-center justify-between gap-4 p-4">
                     <Tag className="w-6 text-green-600" />
                     <span className="flex-1">
                        <Text size={"md"} weight={"semibold"}>
                           64% Discount
                        </Text>
                        <Text size={"sm"} weight={"medium"}>
                           Save your 64% money with us
                        </Text>
                     </span>
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-4 p-4">
                     <LeafIcon className="w-6 text-green-600" />
                     <span className="flex-1">
                        <Text size={"md"} weight={"semibold"}>
                           100% Organic
                        </Text>
                        <Text size={"sm"} weight={"medium"}>
                           100% Organic Vegetables
                        </Text>
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </TabsContent>
   );
}

export default DescriptionTab;
