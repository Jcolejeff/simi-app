import WithRouteDisplay from "@/components/shared/with-route-display";
import { Text } from "@/components/ui/text";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
   title: "Refund Policy | My Food Angels",
   description: "Refund Policy for My Food Angels, detailing our return and refund procedures.",
   applicationName: "My Food Angels",
   keywords: ["Refund Policy", "My Food Angels", "Returns"],
   openGraph: {
      title: "Refund Policy | My Food Angels",
      description: "Refund Policy for My Food Angels, detailing our return and refund procedures.",
   },
};

function RefundPolicyPage() {
   return (
      <div className="mt-10 md:mt-0">
         <WithRouteDisplay route="Refund Policy" extraChildrenClassname="pb-8">
            <Text className="font-semibold leading-[110%] md:text-[0.5rem] lg:text-[1rem]">
               Refund Policy
            </Text>
         </WithRouteDisplay>
         <div className="container p-container-base pt-8  md:p-container-lg">
            <Text className="text-base leading-relaxed">
               We offer a 100% return or refund if there are any issues with your order.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               Please note, this policy is valid within a 24-hour period from the time you receive
               your order. We expect you to inspect your order promptly and notify us within this
               timeframe to be eligible for a return or refund.
            </Text>
         </div>
      </div>
   );
}

export default RefundPolicyPage;
