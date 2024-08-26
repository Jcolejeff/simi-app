import { redirect } from "next/navigation";
import FarmOfftake from "./molecules/farm-offtake";
import FlashSales from "./molecules/flash-sale";
import Hero from "./molecules/hero";
import PopularProducts from "./molecules/popular-products";
import Sdg from "./molecules/sdg";
import Testimonials from "./molecules/testimonials";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
   title: "Simis Blog",
  
   
   robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
         index: true,
         follow: true,
         noimageindex: false,
         "max-video-preview": -1,
         "max-image-preview": "large",
         "max-snippet": -1,
      },
   },
   icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: "/icon.png",
      other: {
         rel: "apple-touch-icon-precomposed",
         url: "/apple-touch-icon-precomposed.png",
      },
   },
   manifest: "https://myfoodangels.com/manifest.json",
   twitter: {
      card: "summary_large_image",
      title: "My Food Angels",
      description:
         "Connect with the best food vendors in Nigeria. Discover and order from a variety of food products and services, all available on My Food Angels.",
      siteId: "1467726470533754880",
      creator: "@MyFoodAngels",
      creatorId: "1467726470533754880",
      images: ["/images/og.jpg"],
   },
   viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
   },
   verification: {
      google: "google-site-verification-code",
      yandex: "yandex-verification-code",
      yahoo: "yahoo-site-verification-code",
      other: {
         me: ["my-email@example.com", "https://myfoodangels.com"],
      },
   },
   category: "Food & Beverage",
};

export default function Home() {
   redirect("/blog");
   return (
      <main>
         {/* <Hero />
         <FarmOfftake />
         <PopularProducts />
         <FlashSales />
         <Testimonials />
         <Sdg /> */}
      </main>
   );
}
