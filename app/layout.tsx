import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Inter } from "next/font/google";

import ReactQueryProviders from "@/lib/react-query/provider";

import RootClientLayout from "./client-layout";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link rel="icon" href="/images/icon.png" />

            <meta name="viewport" content="width=device-width" />
            <link rel="icon" type="image/svg+xml" href="/images/icon.png" />
            <meta name="generator" content={"Next.js"} />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name="theme-color" content="#000000" />
         </head>
         <body
            className={`${inter.className}  relative mx-auto h-full w-full  max-w-[180.75rem] overflow-x-hidden md:overflow-auto`}
         >
            <ReactQueryProviders>
               <RootClientLayout>{children}</RootClientLayout>
            </ReactQueryProviders>

            <Toaster richColors />
         </body>
      </html>
   );
}
