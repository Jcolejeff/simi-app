"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils/css";

import { Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
   "flex w-full text-text rounded-sm border bg-transparent shadow-sm focus-visible:ring-ring transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
   {
      variants: {
         variant: {
            default: "border-input placeholder:text-muted-foreground",
            filled: "bg-inputFill border-border-1 placeholder:text-muted-foreground",
            unstyled:
               "border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-transparent focus-visible:outline-none",
         },
         customSize: {
            default: "px-[13px] text-[calc(13_/_16_*_1rem)] h-[34px]",
            sm: "h-[30px] px-[13px] text-xs",
            lg: "h-10 px-[17px] text-[calc(13_/_16_*_1rem)]",
         },
      },
      defaultVariants: {
         variant: "default",
         customSize: "default",
      },
   },
);

export interface InputProps
   extends React.InputHTMLAttributes<HTMLInputElement>,
      VariantProps<typeof inputVariants> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, customSize, variant, ...props }, ref) => {
      const [showPassword, hidePassword] = React.useState(false);

      const handleVisibility = () => {
         hidePassword(!showPassword);
      };
      return (
         <div className="relative cursor-pointer">
            <span
               onClick={handleVisibility}
               className="absolute right-3 top-[50%] translate-y-[-50%]"
            >
               {showPassword ? <Eye className="w-4" /> : <EyeOff className="w-4" />}
            </span>
            <input
               type={showPassword ? "text" : "password"}
               className={cn(className, inputVariants({ variant, customSize, className }))}
               ref={ref}
               {...props}
            />
         </div>
      );
   },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput, inputVariants };
