import { IFAQObj } from "@/components/faqs/faq-data";
import LadyHoldingFruitBasket from "@/public/images/faq/lady-holding-food-basket.png";
import { Accordion } from "@/components/ui/accordion";
import WithRouteDisplay from "@/components/shared/with-route-display";
import FAQItem from "@/components/faqs/faqitem";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import ShopFarmProductBanner from "@/components/shared/ShopFarmProductBanner";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { getCreatedDateFromDocument } from "@/lib/utils";
import { Metadata } from "next";

export const revalidate = 60;
export const metadata: Metadata = {
   title: "FAQs | MyFoodAngels",
   description:
      "Find answers to your most common questions about MyFoodAngels. Learn more about our services, delivery options, and how we can help you get the freshest produce.",
   keywords: [
      "FAQs",
      "MyFoodAngels",
      "Frequently Asked Questions",
      "Customer Support",
      "Food Delivery",
      "Fresh Produce",
   ],
   openGraph: {
      title: "FAQs | MyFoodAngels",
      description:
         "Find answers to your most common questions about MyFoodAngels. Learn more about our services, delivery options, and how we can help you get the freshest produce.",
      url: "https://myfoodangels.com/faqs",
      type: "website",
      images: [
         {
            url: "/og.jpg",
            width: 1200,
            height: 630,
            alt: "MyFoodAngels FAQs",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "FAQs | MyFoodAngels",
      description:
         "Find answers to your most common questions about MyFoodAngels. Learn more about our services, delivery options, and how we can help you get the freshest produce.",
      images: ["/og.jpg"],
   },
   icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: "/icon.png",
   },
   robots: {
      index: true,
      follow: true,
   },
   viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
   },
   category: "FAQ",
};
async function Page() {
   const FAQsCollectionRef = collection(db, "faq");
   const querySnapshot = await getDocs(FAQsCollectionRef);
   const FAQs: any = [];
   querySnapshot.forEach((doc) => {
      const createdDate = getCreatedDateFromDocument(doc as any);
      FAQs.push({
         id: doc.id,
         ...doc.data(),
         createdDate,
      });
   });
   const FAQList: IFAQObj[] = FAQs;

   return (
      <div>
         <WithRouteDisplay route="FAQs" extraChildrenClassname="pb-0">
            <div className="flex w-full grid-cols-2 flex-col-reverse gap-x-12 md:grid md:pt-20">
               <div className="pb-20">
                  <Text className="mb-4 mt-8 hidden font-semibold leading-[110%] text-[#1A1A1A] md:block md:text-[33px] lg:text-[48px]">
                     Welcome, Let’s Talk About MyFoodAngels
                  </Text>
                  <Accordion type="single" collapsible>
                     {FAQList.map((faq, idx) => (
                        <FAQItem key={idx + faq.question} faqDetail={faq} />
                     ))}
                  </Accordion>
               </div>
               <div className="relative mb-10 w-full md:mb-0">
                  <div className="] bottom-0 hidden h-[85%] w-full rounded-t-full bg-[#7AB42C] md:absolute lg:block"></div>
                  <Image
                     src={LadyHoldingFruitBasket}
                     alt=""
                     className="right-0 rounded-t-full bg-[#7AB42c] object-cover object-top md:absolute md:bottom-0 lg:h-full lg:bg-transparent lg:object-cover"
                  />
               </div>
               <Text className="mb-4 mt-8 text-center text-[36px] font-semibold text-[#1A1A1A] md:hidden">
                  Welcome, Let’s Talk About MyFoodAngels
               </Text>
            </div>
         </WithRouteDisplay>
         <ShopFarmProductBanner />
      </div>
   );
}

export default Page;
