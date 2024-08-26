import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
   return [
      {
         url: "https://myfoodangels.com/",
         lastModified: new Date(),
         changeFrequency: "daily",
         priority: 1,
      },
      {
         url: "https://myfoodangels.com/about-us",
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 0.8,
      },
      {
         url: "https://myfoodangels.com/account/recover",
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 0.6,
      },
      {
         url: "https://myfoodangels.com/account/register",
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 0.6,
      },
      {
         url: "https://myfoodangels.com/account/signin",
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 0.6,
      },
      {
         url: "https://myfoodangels.com/blog",
         lastModified: new Date(),
         changeFrequency: "daily",
         priority: 0.8,
      },
      {
         url: "https://myfoodangels.com/contact-us",
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 0.5,
      },
      {
         url: "https://myfoodangels.com/dashboard",
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.7,
      },
      {
         url: "https://myfoodangels.com/shop/cart",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.7,
      },
      {
         url: "https://myfoodangels.com/shop/categories",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.7,
      },
      {
         url: "https://myfoodangels.com/shop/checkout",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.7,
      },
      {
         url: "https://myfoodangels.com/shop/flash-sales",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.7,
      },
      {
         url: "https://myfoodangels.com/shop/off-take",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.7,
      },
      {
         url: "https://myfoodangels.com/shop/popular-products",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.7,
      },
      {
         url: "https://myfoodangels.com/shop/wishlist",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.7,
      },
      {
         url: "https://myfoodangels.com/workspace",
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.5,
      },
      {
         url: "https://myfoodangels.com/workspace/create",
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.5,
      },
      {
         url: "https://myfoodangels.com/search",
         lastModified: new Date(),
         changeFrequency: "daily",
         priority: 0.7,
      },
   ];
}
