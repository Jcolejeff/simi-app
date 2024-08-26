import { useState, useEffect } from "react";

const useSortAndSearch = (
   products: any,
   searchTerm: any,
   sortCriterion: any,
   category?: string,
   price?: number | null,
) => {
   const [sortedAndFilteredProducts, setSortedAndFilteredProducts] = useState<any[]>();

   const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];

   function parseCustomDate(dateString: { split: (arg0: string) => [any, any, any] }) {
      const [dayPart, monthPart, yearPart] = dateString.split(" ");
      const month = monthNames.indexOf(monthPart) + 1;
      const day = parseInt(dayPart, 10);
      const year = parseInt(yearPart, 10);

      return { day, month, year };
   }

   const sortProducts = (products: any[], criterion: any) => {
      return products.sort((a: { createdDate: any }, b: { createdDate: any }) => {
         const parsedA = parseCustomDate(a.createdDate);
         const parsedB = parseCustomDate(b.createdDate);

         switch (criterion) {
            case "day":
               return (
                  parsedA.day - parsedB.day ||
                  parsedA.month - parsedB.month ||
                  parsedA.year - parsedB.year
               );
            case "month":
               return parsedA.month - parsedB.month || parsedA.year - parsedB.year;
            case "year":
               return parsedA.year - parsedB.year;
            default:
               return 0;
         }
      });
   };

   useEffect(() => {
      let updatedProducts = [...products];

      // Category Filter
      if (category && category !== "all") {
         updatedProducts = updatedProducts.filter((product) => product.category?.id === category);
      }

      // Search Filter
      if (searchTerm) {
         updatedProducts = updatedProducts.filter(
            (product) =>
               product?.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product?.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product?.desc?.toLowerCase().includes(searchTerm.toLowerCase()),
         );
      }

      // Price Filter
      if (price !== undefined && price !== null) {
         console.log(price, "jeff");
         updatedProducts = updatedProducts.filter(
            (product) => (product?.units?.[0]?.price ?? 0) <= price,
         );
      }

      // Sort
      if (sortCriterion) {
         updatedProducts = sortProducts(updatedProducts, sortCriterion);
      }

      setSortedAndFilteredProducts(updatedProducts);
   }, [products, searchTerm, sortCriterion, category, price]);

   return sortedAndFilteredProducts;
};

export default useSortAndSearch;
