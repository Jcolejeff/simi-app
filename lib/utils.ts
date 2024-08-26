/**
 * Merges and applies Tailwind CSS class names.
 *
 * @param inputs - The class names to merge and apply.
 * @returns The merged and applied class names.
 */
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { isNotNil, startsWith } from "ramda";
import Payment from "payment";
import { capitalizeFirstLetter } from "./helpers";
import { Timestamp } from "firebase/firestore";
interface DocumentData {
   _document: {
      createTime: {
         timestamp: Timestamp;
      };
   };
}
export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a specific format.
 * @param i - The date string to format.
 * @param full - Optional. Specifies whether to include the full month name or not. Default is false.
 * @returns The formatted date string.
 */
export const formatDate = (i: string, full = false) => {
   if (full) return moment(i).format("Do MMMM YYYY");

   return moment(i).format("Do MMM YYYY");
};

// export const url = (url: string) => `${import.meta.env.BASE_URL}${url}`;
//export const url = (url: string) => url;

export const url = (url: string) => {
   //If the URL starts with "/" and ASSET_HOST environment variable exists
   //then prefix ASSET_HOST environment variable, else check if BASE_URL exists
   //and prefix BASE_URL else just return the url as it is.
   const result =
      startsWith("/", url) && isNotNil(process.env.NEXT_PUBLIC_ASSET_HOST)
         ? //isNotNil(process.env.ASSET_HOST)
           `${process.env.NEXT_PUBLIC_ASSET_HOST}${url}`
         : url;
   return result;
};
//export { url }

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#E9ECEF" offset="20%" />
      <stop stop-color="#F8F9FA" offset="50%" />
      <stop stop-color="#E9ECEF" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#E9ECEF" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) => window.btoa(str);

function clearNumber(value: string = ""): string {
   return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value: string): string {
   if (!value) {
      return value;
   }

   const issuer = Payment.fns.cardType(value);
   const clearValue = clearNumber(value);
   let nextValue: string;

   switch (issuer) {
      case "amex":
         nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(
            10,
            15,
         )}`;
         break;
      case "dinersclub":
         nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(
            10,
            14,
         )}`;
         break;
      default:
         nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(
            8,
            12,
         )} ${clearValue.slice(12, 19)}`;
         break;
   }

   return nextValue.trim();
}

export function formatCVC(value: string, allValues: Record<string, string> = {}): string {
   const clearValue = clearNumber(value);
   let maxLength = 4;

   if (allValues.number) {
      const issuer = Payment.fns.cardType(allValues.number);
      maxLength = issuer === "amex" ? 4 : 3;
   }

   return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value: string): string {
   const clearValue = clearNumber(value);

   if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
   }

   return clearValue;
}

export function formatFormData(data: Record<string, string>): string[] {
   return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}

export function getCreatedDateFromDocument(documentData: DocumentData): string {
   const createTime = documentData._document.createTime.timestamp;
   const createdDate = new Date(createTime.seconds * 1000); // Convert seconds to milliseconds
   return formatDate(createdDate.toDateString());
}

export const revalidateNumber: number = 60;

export const categoriesId = {
   flashSales: "v9CV5vnTQWODds3JedHF",
   farmOffTake: "Edi7pOIPuxHkoSHLANtw",
};
export const mailChimpApiKeys = "6e653a9c12f9e5d2ad88feeb178b6789-us17";
export function splitStringBySpaceAndReplaceWithDash(str: string): string {
   return str.trim().split(" ").join("-").toLowerCase();
}
export function reverseSplitStringByDashAndReplaceWithSpace(str: string): string {
   return capitalizeFirstLetter(str.trim().split("-").join(" ").toLowerCase(), true);
}
export const formatToNaira = (amount: number | bigint) => {
   return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(amount);
};
export const checkStatus = (status: string) => {
   switch (status.toLowerCase()) {
      case "order received":
         return "text-green-600";
      case "pending":
         return "text-yellow-600";
      case "en route":
         return "text-green-600";
      case "delivered":
         return "text-blue-500";
      default:
         return "text-red-500";
   }
};
export const addProductsToUserSoTheyCanReview = async (userId: string, cartItems: any[]) => {
   try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
         throw new Error("User not found");
      }

      const userData = userSnap.data();
      const productIds = cartItems.map((item) => item.id);

      if (!userData.productsBought) {
         // Initialize the productsBought array if it does not exist
         await updateDoc(userRef, {
            productsBought: productIds,
         });
      } else {
         // Ensure we only add unique product IDs
         const existingProductIds = new Set(userData.productsBought);
         const newProductIds = productIds.filter((id) => !existingProductIds.has(id));

         if (newProductIds.length > 0) {
            await updateDoc(userRef, {
               productsBought: arrayUnion(...newProductIds),
            });
         }
      }

      console.log("Products added to user's productsBought array successfully.");
   } catch (error) {
      console.error("Error adding products to user's productsBought array:", error);
   }
};

export const hasUserBoughtProduct = async (userId: string, productId: string): Promise<boolean> => {
   try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
         throw new Error("User not found");
      }

      const userData = userSnap.data();
      const productsBought = userData.productsBought || [];

      return productsBought.includes(productId);
   } catch (error) {
      console.error("Error checking if user has bought product:", error);
      return false;
   }
};
