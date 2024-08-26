import { Children, ReactNode } from "react";

interface EachProps {
   render: (item: any, index: number) => ReactNode;
   of: any[];
}

const Each = ({ render, of }: EachProps) => (
   <>{of.map((item: any, index: number) => render(item, index))}</>
);

export default Each;
