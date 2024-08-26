import { getCourseInterface } from "./product.types";
import { shuffleArray } from "@/helper";
import axiosInstance from "../index";
import { ProcessError } from "@/helper/error";
import { DynamicObject } from "@/lib/type";
// const getCourse = async (params: getCourseInterface) => {
//    const { data } = await API.get(`/products`, {
//       params: {
//          ...params,
//       },
//    });
//    return data;
// };
export async function fetchWhatLearnersAreViewing(
   apiBaseUrl = "",
   page = 1,
   size = 10,
   excludeIds = [""],
) {
   let courses = null;
   excludeIds = [
      ...excludeIds,
      "0cddeeb59aea4482987273b68b4fb87d",
      "0cddeeb59aea4482987273b68b4fb87d",
      "3a51fe78821b4604a94a57348d025b59",
      "bb66750fd57b4883a300c51bc205d1a2",
      "74f048db75e4455a98a4a675b4517c13",
   ];

   try {
      // Fetch products with pagination
      const { data: response } = await axiosInstance.get(`/products?page=${page}&size=${size}`);

      // Filter out certain products by ID
      const filteredItems = response.items.filter(
         (item: DynamicObject) => !excludeIds.includes(item?.id),
      );
      response.items = filteredItems;

      // Get extra info and prices for each product
      await response.items.reduce(async (previousPromise: Promise<void>, item: DynamicObject) => {
         await previousPromise;
         const extraInfo = await axiosInstance.get(`/extrainfo/products/${item.id}`);
         const prices = await axiosInstance.get(`/prices?product_id=${item.id}&page=1&size=5`);

         item["extra_infos"] = extraInfo.data;
         item["prices"] = prices.data.items;
      }, Promise.resolve());

      courses = response;
   } catch (error) {
      // Handle errors
      console.error("Error in GET request:", error);
   }

   return courses;
}
export async function fetchProductDetails(apiBaseUrl: string, productId: string) {
   let courseDetails = null;

   try {
      // Fetch product by name
      const { data: product } = await axiosInstance.get(`/products/${productId}`);
      if (product) {
         const extraInfo = await axiosInstance.get(`/extrainfo/products/${product.id}`);
         const prices = await axiosInstance.get(`/prices?product_id=${product.id}&page=1&size=5`);

         // Append extra info and prices to the product data
         product["extra_infos"] = extraInfo.data;
         product["prices"] = prices.data.items;
         courseDetails = product;
      }
   } catch (error) {
      // Handle errors
      console.error("Error in GET request:", error);
   }

   return courseDetails;
}
interface Iparams {
   search_value?: string;
   category_id?: string;
   size: string | number;
   page: string | number;
}
export async function fetchProductAllProducts(
   categoryId: string,
   searchValue: string,
   page = 1,
   size = 30,
) {
   let allCourses = [];

   try {
      // Make the API request to get products
      const params: Iparams = {
         size: size,
         page: page,
      };
      if (searchValue) {
         params.search_value = searchValue;
      }
      if (categoryId) {
         params.category_id = categoryId;
      }
      const { data: response } = await axiosInstance.get(`/products`, {
         params,
      });
      // temp fix to remove certain products
      const excludedProducts = [
         "0cddeeb59aea4482987273b68b4fb87d",
         "3a51fe78821b4604a94a57348d025b59",
         "bb66750fd57b4883a300c51bc205d1a2",
         "74f048db75e4455a98a4a675b4517c13",
      ];
      const withOutCertainProducts = response.items.filter((item: DynamicObject) => {
         return !excludedProducts.includes(item.id);
      });
      response.items = withOutCertainProducts;
      // Get extra info and prices for each product
      await response.items.reduce(async (previousPromise: Promise<void>, item: DynamicObject) => {
         await previousPromise;
         const extraInfo = await axiosInstance.get(`/extrainfo/products/${item.id}`);

         const prices = await axiosInstance.get(`/prices?product_id=${item.id}&page=1&size=5`);

         item["extra_infos"] = extraInfo.data;
         item["prices"] = prices.data.items;
      }, Promise.resolve());

      allCourses = response;
   } catch (error) {
      // Handle errors
      console.error("Error in GET request:", error);
   }

   return allCourses;
}

const productService = {};

export default productService;
