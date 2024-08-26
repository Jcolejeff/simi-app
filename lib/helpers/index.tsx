const appMode = process.env.APP_ENV || process.env.NEXT_PUBLIC_APP_ENV;
export function capitalizeFirstLetter(str: string, capitalizeWords: boolean = false): string {
   if (str.length === 0) {
      return str;
   }

   if (!capitalizeWords) {
      const firstLetter = str.charAt(0).toUpperCase();
      const restOfTheString = str.slice(1);
      return firstLetter + restOfTheString;
   }

   const words = str.split(" ");
   const capitalizedWords = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfTheWord = word.slice(1);
      return firstLetter + restOfTheWord;
   });

   return capitalizedWords.join(" ");
}

interface GetImageParams {
   url: string;
   width?: number;
   height?: number;
}

export const getImage = ({ url, width = 0, height = 0 }: GetImageParams): string => {
   const API_URL: string =
      appMode === "prod" ? "https://api.timbu.cloud" : "https://staging.api.timbu.com/v2";
   // const API_URL: string | undefined = process.env.APP_API_URL;

   const urlList: string[] = url.split(".");
   url = `${urlList[0]}_${width}x${height}.${urlList[urlList.length - 1]}`;

   return `${API_URL}/images/${url}`;
};

interface ExtraInfo {
   date_created: string;
   description: string;
   id: string;
   is_deleted: boolean;
   is_primary: boolean;
   key: string;
   last_updated: string;
   model_type: string;
   rel_id: string;
   value: string;
   value_dt: null;
}

export const findInExtraInfo = (
   extraInfoArray: ExtraInfo[],
   searchFor: string,
   noSlice?: boolean,
): string | null => {
   const storyInfo = extraInfoArray?.find(
      (info) => info.key.toLowerCase() === searchFor.toLowerCase(),
   );

   // Check if a story with key "story" exists
   if (storyInfo) {
      const { value } = storyInfo;
      if (value.length > 120 && !noSlice) {
         return value.slice(0, 120) + "...";
      } else {
         return value;
      }
   }

   // Return null if no story is found
   return null;
};

export const formatMoney = (n: number): string => {
   const res: string = new Intl.NumberFormat().format(n);
   return res;
};

const currency_symbols: Record<string, string> = {
   USD: "$", // US Dollar
   EUR: "€", // Euro
   CRC: "₡", // Costa Rican Colón
   GBP: "£", // British Pound Sterling
   ILS: "₪", // Israeli New Sheqel
   INR: "₹", // Indian Rupee
   JPY: "¥", // Japanese Yen
   KRW: "₩", // South Korean Won
   NGN: "₦", // Nigerian Naira
   PHP: "₱", // Philippine Peso
   PLN: "zł", // Polish Zloty
   PYG: "₲", // Paraguayan Guarani
   THB: "฿", // Thai Baht
   UAH: "₴", // Ukrainian Hryvnia
   VND: "₫", // Vietnamese Dong
   KES: "Ksh", //Kenyan Shilling
};

interface CurrencySymbols {
   [code: string]: string;
}

export const getCurrencyFromCode = (code: string): string => {
   if (currency_symbols[code] === undefined) {
      return "";
   }
   return currency_symbols[code];
};

export function reverseArray(arr: any) {
   const reversedArr = [];
   for (let i = arr.length - 1; i >= 0; i--) {
      reversedArr.push(arr[i]);
   }
   return reversedArr;
}
