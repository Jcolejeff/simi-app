import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";

import styles from "./faq.module.css";
import { Text } from "@/components/ui/text";
import { IFAQObj } from "./faq-data";
import { PlusIcon } from "lucide-react";

const FAQItem = ({ faqDetail }: { faqDetail: IFAQObj }) => {
   return (
      <Accordion type="single" collapsible className="w-full">
         <AccordionItem className={styles.AccordionItem} value="item-1">
            <AccordionTrigger
               // IconComp={PlusIcon}
               // iconClassName={styles.AccordionIcon}
               className={styles.AccordionTrigger}
            >
               <Text className="text-[16px] font-[700]">{faqDetail.question}</Text>
            </AccordionTrigger>
            <AccordionContent className={styles.AccordionContent}>
               <div
                  className={styles.AccordionContentDiv}
                  dangerouslySetInnerHTML={{ __html: faqDetail.answer }}
               ></div>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   );
};

export default FAQItem;
