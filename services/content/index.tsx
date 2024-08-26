import axiosInstance from "../index";
import { ProcessError } from "@/helper/error";
import { DynamicObject } from "@/lib/type";
interface Iparams {
   search_value?: string;
   category_id?: string;
   size: string | number;
   page: string | number;
}
export async function fetchBlogContents(
   categoryId: string,
   searchValue: string,
   page = 1,
   size = 30,
) {
   let blogs = [];

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
      const { data: response } = await axiosInstance.get(`/contents`, {
         params,
      });

      blogs = response;
   } catch (error) {
      // Handle errors
      console.error("Error in GET request:", error);
   }

   return blogs;
}
export async function fetchSingleBlogContent(id: string) {
   let blog = {} as DynamicObject;

   try {
      // Make the API request to get products

      const { data: response } = await axiosInstance.get(`/contents/${id}`);

      blog = response;
   } catch (error) {
      // Handle errors
      console.error("Error in GET request:", error);
   }

   return blog;
}
