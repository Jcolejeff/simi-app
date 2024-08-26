interface HeaderProps {
   text: string;
   color?: string;
   position?: "left" | "center" | "right";
}

function HeaderText({ text, color, position }: HeaderProps) {
   const headerStyle = {
      textAlign: position || "center",
      padding: "1rem 0",
      color: color || "#000",
   };

   return (
      <header style={headerStyle}>
         <h1 className="text-4xl font-bold">{text}</h1>
      </header>
   );
}
export default HeaderText;
