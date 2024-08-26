import WithRouteDisplay from "@/components/shared/with-route-display";
import { Text } from "@/components/ui/text";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
   title: "Shipping and Delivery | My Food Angels",
   description:
      "Shipping and delivery information for My Food Angels, including same day delivery and care in handling orders.",
   applicationName: "My Food Angels",
   keywords: ["Shipping", "Delivery", "My Food Angels", "Same Day Delivery"],
   openGraph: {
      title: "Shipping and Delivery | My Food Angels",
      description:
         "Shipping and delivery information for My Food Angels, including same day delivery and care in handling orders.",
   },
};

function ShippingAndDeliveryPage() {
   return (
      <div className="mt-10 md:mt-0">
         <WithRouteDisplay route="Shipping and Delivery" extraChildrenClassname="pb-8">
            <Text className="font-semibold leading-[110%] md:text-[0.5rem] lg:text-[1rem]">
               Shipping and Delivery Policy
            </Text>
         </WithRouteDisplay>
         <div className="container p-container-base pt-8  md:p-container-lg">
            <Text className="text-base leading-relaxed">
               We offer same day delivery for all orders received before 8 AM. Orders placed after 8
               AM will be treated as next day delivery.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               Every order is handled with the utmost care and attention to detail. Our staff,
               including logistics personnel, are constantly trained on proper food handling
               procedures to ensure the highest quality.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               You will receive a notification once your order is en route.
            </Text>
         </div>
      </div>
   );
}

export default ShippingAndDeliveryPage;
