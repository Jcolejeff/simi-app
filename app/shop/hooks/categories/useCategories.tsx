import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { categoriesId, getCreatedDateFromDocument } from "@/lib/utils";
import ProcessError from "@/lib/error";
import useStore from "@/store";

const useCategories = () => {
   const {
      setCategories,
      setSubcategories,
      setLoading,
      showFarmOffTakesForAll,
      showFlashSalesForAll,
      categories,
      subcategories,
   } = useStore((state) => state);

   const fetchCategories = async () => {
      setLoading(true);
      const categoriesCollectionRef = collection(db, "categories");
      const subCategoriesCollectionRef = collection(db, "subcategories");

      const querySnapshot = await getDocs(categoriesCollectionRef);
      const querySnapshotSub = await getDocs(subCategoriesCollectionRef);

      const categories: any = [];
      const subCategories: any = [];

      querySnapshot.forEach((doc) => {
         const createdDate = getCreatedDateFromDocument(doc as any);
         categories.push({ id: doc.id, ...doc.data(), createdDate });
      });

      querySnapshotSub.forEach((doc) => {
         const createdDate = getCreatedDateFromDocument(doc as any);
         subCategories.push({ id: doc.id, ...doc.data(), createdDate });
      });

      setLoading(false);
      return { categories, subCategories };
   };

   const { data, isSuccess, isError, error } = useQuery({
      queryKey: ["get-categories"],
      queryFn: fetchCategories,
   });

   useEffect(() => {
      if (isSuccess) {
         let categories = data.categories;
         if (!showFarmOffTakesForAll) {
            categories = categories.filter((item: any) => item.id !== categoriesId.farmOffTake);
         }
         if (!showFlashSalesForAll) {
            categories = categories.filter((item: any) => item.id !== categoriesId.flashSales);
         }
         setCategories(categories);

         setSubcategories(data.subCategories);
      }
   }, [isSuccess, data]);

   useEffect(() => {
      if (isError) {
         ProcessError(error);
      }
   }, [isError, error]);

   return { isSuccess, isError, error, data: { categories, subcategories } };
};

export default useCategories;
