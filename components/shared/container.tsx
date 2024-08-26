import React from "react";

function Container({
   children,
   backgroundColor,
   className,
}: {
   children: any;
   backgroundColor?: string;
   className?: string;
}) {
   return (
      <main
         className={`flex flex-col items-center ${backgroundColor || null} justify-center gap-1 ${className}`}
      >
         {children}
      </main>
   );
}

export default Container;
