export interface IFAQObj {
   question: string;
   answer: string | any;
   id?: string;
   createdDate?: string;
}

export const FAQList: IFAQObj[] = [
   {
      question: "What do we do?",
      answer:
         "We are a foodtech online marketplace where fresh food is shopped and delivered quickly across Africa.",
   },
   {
      question: "What are our products and services?",
      answer:
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget venenatis massa. Suspendisse potenti. Nulla facilisi. Cras dictum est non neque egestas suscipit.",
   },
   {
      question: "How does market runs work?",
      answer:
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis nisi in nunc sollicitudin, eget malesuada mauris volutpat. Curabitur accumsan metus in.",
   },
   {
      question: "Do you shop everyday?",
      answer:
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere nisi in justo ultricies, nec sagittis justo scelerisque. Proin consequat, sem et dictum.",
   },
   {
      question: "Do you do same day delivery?",
      answer:
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod odio a dolor scelerisque, nec bibendum quam consequat. Sed non sapien auctor, volutpat.",
   },
   {
      question: "What are your delivery days?",
      answer:
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a sem in eros vehicula vulputate. Vestibulum sit amet interdum turpis, quis ultricies magna.",
   },
   {
      question: "How do I place my order?",
      answer:
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat libero nec turpis scelerisque, nec tristique velit euismod. Duis sit amet nulla a.",
   },
];
