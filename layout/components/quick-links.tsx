import React from "react";

import Link from "next/link";

import { Text } from "@/components/ui/text";

const quickLinks = [
   { id: 1, title: "About Us", href: "/about-us" },
   { id: 2, title: "Track My Order", href: "/dashboard/order-history" },
   { id: 3, title: "Our Blog", href: "/blog" },
   // { id: 4, title: 'Recently Viewed Products', href: '/' },
   { id: 5, title: "Contact Us", href: "/contact-us" },
   { id: 6, title: "Wishlist", href: "/shop/wishlist" },
   { id: 7, title: "My Account", href: "/dashboard" },
   { id: 8, title: "Privacy Policy", href: "/privacy-policy" },
];

function QuickLinks() {
   return (
      <div>
         <Text variant={"white"} size={"md"} weight={"medium"}>
            Quick Links
         </Text>
         <div className="grid w-full grid-cols-1 gap-4 py-4 md:grid-cols-2">
            {quickLinks.map((item: any) => (
               <Link key={item.id} href={item.href}>
                  <Text
                     className="hover:underline"
                     style={{ color: "#989898" }}
                     size={"sm"}
                     weight={"normal"}
                  >
                     {item.title}
                  </Text>
               </Link>
            ))}
         </div>
      </div>
   );
}

export default QuickLinks;
