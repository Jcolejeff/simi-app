"use client";

import React, { useEffect } from "react";
import useCountDown from "react-countdown-hook";

import Each from "../helpers/each";
import { Text } from "./text";

const interval = 1000;

const Timer: React.FC<{ className?: string; availableDate: string }> = ({
   className,
   availableDate,
}) => {
   function convertDateString(dateStr: string) {
      // Remove the "st", "nd", "rd", "th" from the date string
      const cleanedDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");

      // Return the cleaned date string
      return cleanedDateStr;
   }
   const cleanedDate = convertDateString(availableDate);
   // Convert the available date string to a Date object
   const targetDate = new Date(cleanedDate).getTime();

   // Get the current date in milliseconds
   const currentDate = new Date().getTime();

   // Calculate the initial time difference in milliseconds
   const initialTime = targetDate - currentDate;

   const [timeLeft, { start }] = useCountDown(initialTime, interval);

   useEffect(() => {
      if (initialTime > 0) {
         start();
      }
   }, []);

   const formatTime = (milliseconds: number) => {
      const hours = Math.floor(milliseconds / (1000 * 60 * 60));
      const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

      return `${hours}h : ${minutes}m : ${seconds}s`;
   };

   const timeElements = formatTime(timeLeft).split(":");

   if (initialTime <= 0) {
      return null; // Don't display the component if the available date has passed
   }

   if (className) {
      return (
         <span className="flex flex-wrap items-center gap-2">
            <Each
               of={timeElements}
               render={(item: any, index: number) => (
                  <Text key={index} className={className}>
                     {item}
                  </Text>
               )}
            />
         </span>
      );
   }

   return (
      <div className="flex items-center gap-2">
         <Each
            of={timeElements}
            render={(item: any, index: number) => (
               <span key={index}>
                  <Text
                     className={`${item.includes("h") ? "text-[#7ab42c]" : ""}`}
                     size={"xl"}
                     weight={"semibold"}
                     variant={"white"}
                  >
                     {item} {index + 1 !== timeElements.length && <span>:</span>}
                  </Text>
               </span>
            )}
         />
      </div>
   );
};

export default Timer;
