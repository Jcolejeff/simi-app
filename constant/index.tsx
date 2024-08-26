import { planTypes, routePathTypes } from "types";

const ROUTES: Record<routePathTypes, routePathTypes> = {
   "": "",
   contact: "contact",
   "account/signin": "account/signin",
   "account/register": "account/register",
   blogs: "blogs",
   faqs: "faqs",
   about: "about",
};

const CONSTANTS = { ROUTES };

export default CONSTANTS;
