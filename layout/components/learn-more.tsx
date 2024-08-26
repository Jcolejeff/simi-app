import React from "react";

import Link from "next/link";

import { Text } from "@/components/ui/text";

const learnMore = [
   { id: 1, title: "FAQs", href: "/faq" },
   { id: 2, title: "Terms of Use", href: "/term-of-use" },
   { id: 3, title: "Shipping Policy", href: "/shipping-policy" },
   { id: 4, title: "Cookie Policy", href: "/cookie-policy" },
   { id: 5, title: "Refund and Returns Policy", href: "/refund-and-returns-policy" },
   { id: 6, title: "FB Policy", href: "/fb-policy" },
   { id: 7, title: "Privacy Policy", href: "/privacy-policy" },
];

function LearnMore() {
   return (
      <div>
         <Text variant={"white"} size={"md"} weight={"medium"}>
            Learn More
         </Text>
         <div className="grid w-full grid-cols-1 gap-4 py-4 md:grid-cols-2">
            {learnMore.map((item: any) => (
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

export default LearnMore;
