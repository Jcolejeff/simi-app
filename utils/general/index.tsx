import { Variants } from "framer-motion";

export const cardVariants: Variants = {
    offscreen: {
       opacity: 0,
    },
    onscreen: {
       opacity: 100,
       transition: {
          ease: "easeOut",
          duration: 1,
          bounce: 0.4,
          delay: 0.5,
       },
    },
 };
 