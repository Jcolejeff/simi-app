"use client";

import { Icon } from "@iconify/react";
import "./stepper.css";

const CustomStepper = ({
   steps,
   activeStep,
   isComplete,
}: {
   steps: any[];
   activeStep: number;
   isComplete?: boolean;
}) => {
   return (
      <div className="flex flex-col justify-between md:flex-row">
         {steps?.map((step, i) => (
            <div
               key={i}
               className={`step-item ${activeStep === i + 1 && "active"} ${
                  (i + 1 < activeStep || isComplete) && "complete"
               } `}
            >
               <div className="step">
                  {i + 1 < activeStep || isComplete ? (
                     <Icon icon="fluent-mdl2:check-mark" width="24" height="24" className="z-[1]" />
                  ) : (
                     i + 1
                  )}
               </div>
               <p className="text-gray-500">{step}</p>
            </div>
         ))}
      </div>
   );
};

export default CustomStepper;
