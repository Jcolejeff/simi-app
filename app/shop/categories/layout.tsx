import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
   // Fetch any data you need here
   return {
      title: "Categories | MyFoodAngels",
      description:
         "Browse our wide selection of groceries and food items at MyFoodAngels. Find fresh produce, pantry staples, and specialty foods delivered to your doorstep.",
      generator: "Next.js",
      applicationName: "MyFoodAngels",
      referrer: "origin-when-cross-origin",
      keywords: [
         "Food",
         "Grocery",
         "MyFoodAngels",
         "Online Shopping",
         "Fresh Produce",
         "Pantry Staples",
         "Specialty Foods",
         "Food Delivery",
      ],
      authors: [{ name: "MyFoodAngels" }],
      creator: "MyFoodAngels",
      publisher: "MyFoodAngels",
      formatDetection: {
         email: false,
         address: false,
         telephone: false,
      },
      alternates: {
         canonical: "https://myfoodangels.com/shop",
         languages: {
            "en-US": "/en-US/shop",
            "de-DE": "/de-DE/shop",
         },
      },
      openGraph: {
         title: "Shop Our Wide Selection of Groceries | MyFoodAngels",
         description:
            "Discover a vast array of fresh produce, pantry essentials, and gourmet items. Shop conveniently with MyFoodAngels for all your grocery needs.",
         url: "https://myfoodangels.com/shop",
         siteName: "MyFoodAngels",
         images: [
            {
               url: "/images/og.jpg",
               width: 1200,
               height: 630,
               alt: "MyFoodAngels Shop Banner",
            },
         ],
         locale: "en_US",
         type: "website",
      },
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
         title: "Shop Groceries Online | MyFoodAngels",
         description:
            "Find fresh produce, pantry staples, and specialty foods. Shop conveniently with MyFoodAngels for all your grocery needs.",
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
      category: "Online Grocery Store",
   };
}

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
