export interface DynamicObject {
   [key: string]: any;
}

export interface iCourse {
   id: string;
   title: string;
   subtitle: string;
   cost: string;
   imageUrl: string;
   secondaryImage?: string;
   author: string;
   outlines?: DynamicObject[];
}

