import React from "react";
import { Icon } from "@iconify/react";

interface ContactItemsProps {
   backgroundColor?: string;
   icon: string; // Icon name from Lucide
   text: string;
   iconSize?: number;
}

function ContactItems({ backgroundColor, icon, text, iconSize }: ContactItemsProps) {
   const containerStyle: React.CSSProperties = {
      backgroundColor: backgroundColor || "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      borderRadius: "2px",
      borderBottom: "1px solid #CCCCCC",
      borderBottomWidth: "1px",
      width: "100%",
   };

   const iconStyle: React.CSSProperties = {
      marginBottom: "10px",
      // maxHeight: iconSize ? `${iconSize}px` : '50px',
      width: iconSize ? `${iconSize}px` : "1",
      color: "#7AB42C",
   };

   return (
      <div className="text-wrap text-center text-sm" style={containerStyle}>
         <div style={iconStyle}>
            <Icon icon={`lucide:${icon}`} />
         </div>
         <div>{text}</div>
      </div>
   );
}

export default ContactItems;
