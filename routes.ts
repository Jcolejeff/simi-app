import { Route } from "./types";

export const Routes: Route[] = [
   { id: 1, href: "/", title: "Home" },
   {
      id: 2,
      href: "/shop",
      title: "Shop",
      components: [
         {
            title: "Categories",
            href: "/shop/categories",
            description:
               "Browse through our wide range of products organized into distinct categories for easy navigation and discovery.",
         },
         {
            title: "Farm Offtake",
            href: "/shop/off-take",
            description:
               "Explore our farm off-take section where you can find fresh produce directly from the farm to your table, ensuring quality and freshness.",
         },
         {
            title: "Flash Sales",
            href: "/shop/flash-sales",
            description:
               "Don't miss out on our limited-time flash sales offering exciting discounts on select products. Grab them before they're gone!",
         },
         {
            title: "Popular Products",
            href: "/shop/popular-products",
            description: "Have a look at our frequently bought items for your purchase.",
         },
      ],
   },
   { id: 3, href: "/about-us", title: "About Us" },
   { id: 4, href: "/contact-us", title: "Contact Us" },
   { id: 5, href: "/faq", title: "FAQs" },
   { id: 6, href: "/blog", title: "Blog" },
];
