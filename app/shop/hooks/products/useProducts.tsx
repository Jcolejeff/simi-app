import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { getCreatedDateFromDocument } from "@/lib/utils";
import ProcessError from "@/lib/error";
import useSortAndSearch from "@/hooks/useSearchAndSort";
import useStore from "@/store";
import { categoriesId } from "@/lib/utils";
const useProducts = (LandingPageCategory?: string) => {
   const [allProducts, setAllProducts] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [sortCriterion, setSortCriterion] = useState("");
   const [price, setPrice] = useState<number | null>(null);
   const { selectedCategory, showFarmOffTakesForAll, showFlashSalesForAll } = useStore(
      (state) => state,
   );
   const selectedCategoryOnCategoryPage = selectedCategory;
   const fetchProducts = async () => {
      const productsCollectionRef = collection(db, "products");
      const querySnapshot = await getDocs(productsCollectionRef);
      const products: any = [];
      querySnapshot.forEach((doc) => {
         const createdDate = getCreatedDateFromDocument(doc as any);
         products.push({
            id: doc.id,
            ...doc.data(),
            createdDate,
         });
      });

      return products;
   };

   const { data, isError, error, isSuccess } = useQuery({
      queryKey: ["get-products"],
      queryFn: fetchProducts,
   });

   useEffect(() => {
      if (isSuccess) {
         let products = data;
         if (!showFarmOffTakesForAll) {
            products = products.filter(
               (item: any) => item.category.id !== categoriesId.farmOffTake,
            );
         }
         if (!showFlashSalesForAll) {
            products = products.filter((item: any) => item.category.id !== categoriesId.flashSales);
         }

         setAllProducts(products);
      }
   }, [isSuccess, data]);

   useEffect(() => {
      if (isError) {
         ProcessError(error);
      }
   }, [isError, error]);

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value.toLowerCase());
   };

   const handleSortChange = (newValue: string) => {
      setSortCriterion(newValue);
   };
   const handlePriceChange = (newValue: number | null) => {
      setPrice(newValue);
   };

   const sortedAndFilteredProducts = useSortAndSearch(
      allProducts,
      searchTerm,
      sortCriterion,
      LandingPageCategory || selectedCategoryOnCategoryPage,
      price,
   );

   return {
      allProducts,
      sortedAndFilteredProducts,
      handleSearch,
      handleSortChange,
      searchTerm,
      sortCriterion,
      price,
      handlePriceChange,
   };
};

export default useProducts;
