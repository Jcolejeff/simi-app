"use client";
import React from "react";
import Container from "@/components/shared/container";
import RouteDisplay from "../../components/shared/route-display";
import HeaderText from "@/components/ui/header-text";
import { Text } from "@/components/ui/text";
import { TabsContent } from "@/components/ui/tabs";
import ContactItems from "@/components/ui/contact-items";
import { Button } from "@/components/ui/button";
import ContactUsForm from "@/components/contact-us";

function Page() {
   return (
      <div className="pt-[4rem]">
         <head>
            <title>Contact Us | MyFoodAngels</title>
            <meta
               name="description"
               content="Get in touch with MyFoodAngels for any inquiries, suggestions, or feedback. We're here to assist you with your questions and concerns."
            />
            <meta
               name="keywords"
               content="Contact MyFoodAngels, Customer Support, Inquiries, Feedback, Food Delivery Support"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="Contact Us | MyFoodAngels" />
            <meta
               property="og:description"
               content="Get in touch with MyFoodAngels for any inquiries, suggestions, or feedback. We're here to assist you with your questions and concerns."
            />
            <meta property="og:url" content="https://myfoodangels.com/contact-us" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Contact Us | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="Get in touch with MyFoodAngels for any inquiries, suggestions, or feedback. We're here to assist you with your questions and concerns."
            />
            <meta property="twitter:image" content="/og.jpg" />
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     "@context": "https://schema.org",
                     "@type": "ContactPage",
                     mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": "https://myfoodangels.com/contact-us",
                     },
                     headline: "Contact Us | MyFoodAngels",
                     description:
                        "Get in touch with MyFoodAngels for any inquiries, suggestions, or feedback. We're here to assist you with your questions and concerns.",
                     image: "/og.jpg",
                     contactPoint: {
                        "@type": "ContactPoint",
                        telephone: "+2348090865279",
                        contactType: "Customer Support",
                        email: "info@myfoodangels.com",
                        areaServed: "NG",
                        availableLanguage: ["English"],
                     },
                     address: {
                        "@type": "PostalAddress",
                        streetAddress: "Ikosi Ketu",
                        addressLocality: "Lagos",
                        addressCountry: "Nigeria",
                     },
                     publisher: {
                        "@type": "Organization",
                        name: "MyFoodAngels",
                        logo: {
                           "@type": "ImageObject",
                           url: "/icon.png",
                        },
                     },
                  }),
               }}
            />
         </head>

         <RouteDisplay route={"Contact Us"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 bg-[#fbfbfb] py-4">
               <HeaderText text="Reach Out to Us" color="black" position="left" />
               <Text className="text-center text-gray-500 " size="sm" weight="normal">
                  Have any questions, suggestions, advice complaints or inquires? Feel free to
                  contact us using any <br />
                  of the options below!
               </Text>
               <div className="md-1 grid w-full grid-cols-1 gap-0 bg-[#fbfbfb] p-6 md:grid-cols-2">
                  <div className="col-span-1 flex w-[50%] items-center justify-center bg-white md:col-span-2 lg:col-span-1">
                     <div className="flex flex-col items-center justify-between gap-0 px-10 py-5">
                        <ContactItems icon="map-pinned" text="Ikosi Ketu, Lagos, Nigeria" />
                        <ContactItems icon="mail" text="info@myfoodangels.com" />
                        <ContactItems icon="phone-call" text="08090865279" />
                     </div>
                  </div>
                  <ContactUsForm />
               </div>
            </main>
         </Container>
      </div>
   );
}

export default Page;
