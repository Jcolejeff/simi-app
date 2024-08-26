import { toast } from "sonner";
export function firstCharsOfWords(str: string) {
   const words = str.split(" ");

   if (words.length === 1 && words[0].length > 1) {
      const word = words[0];
      return word[0] + word[word.length - 1];
   }

   return words.map((word) => word[0]).join(".");
}
export const copyToClipboard = (text: string, alert: any) => {
   navigator.clipboard
      .writeText(text)
      .then(() => {
         toast.success(alert);
      })
      .catch(() => {
         toast.error(`An Error occurred while copying`);
      });
};

interface nullTextCheckerInterfac {
   text?: any;
   returnValue?: "n/a" | "empty";
}

export const nullTextChecker = ({ text, returnValue = "n/a" }: nullTextCheckerInterfac) => {
   if (text) {
      return text;
   } else {
      return returnValue === "n/a" ? "n/a" : "";
   }
};

export const ensureIsNumber = (i: any) => {
   return isNaN(i) || !i ? 0 : parseInt(`${i}`);
};

export const undefinedNumberChecker = (i?: number) => {
   if (i) {
      return i;
   } else {
      return 0;
   }
};
export const checkIfUserIsLoggedIn = (isLoggedIn: boolean) => {
   if (isLoggedIn) {
      return true;
   } else {
      return false;
   }
};

export const shortNumber = (i: string, withDecimal?: boolean) => {
   if (i) {
      const num = parseFloat?.(i);
      if (num >= 1000000) {
         return withDecimal ? `${(num / 1000000).toFixed(2)}M` : `${num / 1000000}M`;
      } else if (num >= 1000) {
         return withDecimal ? `${(num / 1000).toFixed(2)}K` : `${num / 1000}K`;
      } else {
         return withDecimal ? num.toFixed(2) : num;
      }
   }
};

export const checkIfEmail = (str: string) => {
   const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

   return regexExp.test(str);
};

export function filterStringsContainingDoc(strings: string[]): string[] {
   return strings?.filter((str) => str?.includes(".doc"));
}

export function filterStringsContainingImageExtensions(strings: string[]): string[] {
   return strings?.filter((str) => str?.includes(".png") || str.includes(".jpg"));
}
export function getDesiredImagePosition(images: any[], desiredPosition: number) {
   return images.find((image) => image.position === desiredPosition);
}
export function shuffleArray<T>(array: T[]): T[] {
   // Create a copy of the original array to avoid modifying it directly
   let shuffledArray = [...array];

   for (let i = shuffledArray.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at indices i and j
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
   }

   return shuffledArray;
}

export const isAfricanCountry = (country: string) => {
   const countriesInAfrica = {
      Algeria: true,
      Angola: true,
      Benin: true,
      Botswana: true,
      "Burkina Faso": true,
      Burundi: true,
      "Cabo Verde": true,
      Cameroon: true,
      "Central African Republic": true,
      Chad: true,
      Comoros: true,
      Congo: true,
      Djibouti: true,
      Egypt: true,
      "Equatorial Guinea": true,
      Eritrea: true,
      Eswatini: true,
      Ethiopia: true,
      Gabon: true,
      Gambia: true,
      Ghana: true,
      Guinea: true,
      "Guinea-Bissau": true,
      "Ivory Coast": true,
      Kenya: true,
      Lesotho: true,
      Liberia: true,
      Libya: true,
      Madagascar: true,
      Malawi: true,
      Mali: true,
      Mauritania: true,
      Mauritius: true,
      Morocco: true,
      Mozambique: true,
      Namibia: true,
      Niger: true,
      Nigeria: true,
      Rwanda: true,
      "Sao Tome and Principe": true,
      Senegal: true,
      Seychelles: true,
      "Sierra Leone": true,
      Somalia: true,
      "South Africa": true,
      "South Sudan": true,
      Sudan: true,
      Tanzania: true,
      Togo: true,
      Tunisia: true,
      Uganda: true,
      Zambia: true,
      Zimbabwe: true,
   };

   return countriesInAfrica[country as keyof typeof countriesInAfrica] === true;
};

export const isWidthGreaterOrEqualTo768 = (width: number | null) => width && width >= 768;
