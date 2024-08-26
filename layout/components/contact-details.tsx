import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Text } from "@/components/ui/text";

import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import logo from "../../images/logo.png";
import twitter from "../../images/twitter.png";

const socials = [
   {
      id: 1,
      title: "facebook",
      image_href: facebook,
      href: "https://www.facebook.com/myfoodangels",
   },
   { id: 2, title: "twitter", image_href: twitter, href: "https://twitter.com/mile12marketwo1" },
   {
      id: 3,
      title: "instagram",
      image_href: instagram,
      href: "https://www.instagram.com/mile12marketwoman",
   },
];

function ContactDetails() {
   return (
      <div>
         <Image src={logo} alt="Logo" className="mb-4" />
         <Text style={{ color: "#989898" }} size={"sm"} weight={"normal"}>
            We are much more than a food delivery service. We are disrupting the whole african
            supply chain, one link at a time.
         </Text>
         <div className="my-4 flex w-full items-center justify-center gap-2">
            <Text variant={"white"} className="w-full border-b border-primary-2 py-2" size={"xs"}>
               (+234) 8130010155
            </Text>
            <Text style={{ color: "#989898" }} size={"xs"} weight={"normal"}>
               or
            </Text>
            <Text variant={"white"} className="w-full border-b border-primary-2 py-2" size={"xs"}>
               myfoodangels@gmail.com
            </Text>
         </div>
         <div className="mt-4 flex w-full items-center justify-between border-b border-primary-2">
            <Text size={"xs"} variant={"white"}>
               Ikosi Ketu, Lagos, Nigeria
            </Text>
            <div className="flex items-center justify-end gap-2 py-2">
               {socials.map((image) => (
                  <Link
                     className="flex h-6 w-6 items-center justify-center rounded-full border border-primary-2 bg-primary-2"
                     key={image.id}
                     href={"/"}
                     target="_blank"
                  >
                     <Image className="h-3 w-3" src={image.image_href} alt={image.title} />
                  </Link>
               ))}
            </div>
         </div>
      </div>
   );
}

export default ContactDetails;
