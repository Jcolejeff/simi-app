import React from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

function ShareItem() {
   return (
      <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
         <Text size={"sm"} weight={"medium"}>
            Share item:{" "}
         </Text>
         <div className="flex flex-1 gap-2">
            <Button
               variant={"ghost"}
               size={"none"}
               className="rounded-full border border-transparent bg-transparent fill-current p-2 text-black hover:border-[#7ab42c] hover:bg-[#7ab42c] hover:text-white"
            >
               <svg
                  className="w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="facebook"
               >
                  <path
                     fillRule="evenodd"
                     d="M12 5.5H9v-2a1 1 0 0 1 1-1h1V0H9a3 3 0 0 0-3 3v2.5H4V8h2v8h3V8h2l1-2.5z"
                     clipRule="evenodd"
                  ></path>
               </svg>
            </Button>
            <Button
               variant={"ghost"}
               size={"none"}
               className="rounded-full border border-transparent bg-transparent fill-current p-2 text-black hover:border-[#7ab42c] hover:bg-[#7ab42c] hover:text-white"
            >
               <svg
                  className="w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="twitter"
               >
                  <path d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794 3.28 3.28 0 0 0-5.674 2.243c0 .26.022.51.076.748a9.284 9.284 0 0 1-6.761-3.431 3.285 3.285 0 0 0 1.008 4.384A3.24 3.24 0 0 1 .64 6.578v.036a3.295 3.295 0 0 0 2.628 3.223 3.274 3.274 0 0 1-.86.108 2.9 2.9 0 0 1-.621-.056 3.311 3.311 0 0 0 3.065 2.285 6.59 6.59 0 0 1-4.067 1.399c-.269 0-.527-.012-.785-.045A9.234 9.234 0 0 0 5.032 15c6.036 0 9.336-5 9.336-9.334 0-.145-.005-.285-.012-.424A6.544 6.544 0 0 0 16 3.539z"></path>
               </svg>
            </Button>
            <Button
               variant={"ghost"}
               size={"none"}
               className="rounded-full border border-transparent bg-transparent fill-current p-2 text-black hover:border-[#7ab42c] hover:bg-[#7ab42c] hover:text-white"
            >
               <svg
                  className="w-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 774 1000.2"
                  id="pinterest"
               >
                  <path d="M0 359c0-42 8.8-83.7 26.5-125s43-79.7 76-115 76.3-64 130-86S345.7 0 411 0c106 0 193 32.7 261 98s102 142.3 102 231c0 114-28.8 208.2-86.5 282.5S555.3 723 464 723c-30 0-58.2-7-84.5-21s-44.8-31-55.5-51l-40 158c-3.3 12.7-7.7 25.5-13 38.5S259.8 873 253.5 885c-6.3 12-12.7 23.3-19 34s-12.7 20.7-19 30-11.8 17.2-16.5 23.5-9 11.8-13 16.5l-6 8c-2 2.7-4.7 3.7-8 3s-5.3-2.7-6-6c0-.7-.5-5.3-1.5-14s-2-17.8-3-27.5-2-22.2-3-37.5-1.3-30.2-1-44.5 1.3-30.2 3-47.5 4.2-33.3 7.5-48c7.3-31.3 32-135.7 74-313-5.3-10.7-9.7-23.5-13-38.5s-5-27.2-5-36.5l-1-15c0-42.7 10.8-78.2 32.5-106.5S303.3 223 334 223c24.7 0 43.8 8.2 57.5 24.5S412 284.3 412 309c0 15.3-2.8 34.2-8.5 56.5s-13.2 48-22.5 77-16 52.5-20 70.5c-6.7 30-.8 56 17.5 78s42.8 33 73.5 33c52.7 0 96.2-29.8 130.5-89.5S634 402.7 634 318c0-64.7-21-117.5-63-158.5S470.3 98 395 98c-84 0-152.2 27-204.5 81S112 297.7 112 373c0 44.7 12.7 82.3 38 113 8.7 10 11.3 20.7 8 32-1.3 3.3-3.3 11-6 23s-4.7 19.7-6 23c-1.3 7.3-4.7 12.2-10 14.5s-11.3 2.2-18-.5c-39.3-16-68.8-43.5-88.5-82.5S0 411 0 359z"></path>
               </svg>
            </Button>
            <Button
               variant={"ghost"}
               size={"none"}
               className="rounded-full border border-transparent bg-transparent fill-current p-2 text-black hover:border-[#7ab42c] hover:bg-[#7ab42c] hover:text-white"
            >
               <svg
                  className="w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="instagram"
               >
                  <path d="M11 0H5a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm3.5 11c0 1.93-1.57 3.5-3.5 3.5H5c-1.93 0-3.5-1.57-3.5-3.5V5c0-1.93 1.57-3.5 3.5-3.5h6c1.93 0 3.5 1.57 3.5 3.5v6z"></path>
                  <path d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5A2.503 2.503 0 0 1 5.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"></path>
                  <circle cx="12.3" cy="3.7" r=".533"></circle>
               </svg>
            </Button>
         </div>
      </div>
   );
}

export default ShareItem;
