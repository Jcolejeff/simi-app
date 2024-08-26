import { useState } from "react";

const useClientPaginator = ({ data, perPage = 3 }: { data: any[]; perPage?: number }) => {
   const [currentPage, setCurrentPage] = useState<number>(1);
   const startIndex = (currentPage - 1) * perPage;
   const endIndex = startIndex + perPage;

   const totalPages = Math.ceil(data.length / perPage);

   const pagedData = data.slice(startIndex, endIndex);

   const isGreaterThanDataLength = currentPage >= totalPages;
   const isLessThanFirstPage = currentPage <= 1;

   function generatePageArray() {
      const pageArray = [];
      for (let i = 1; i <= totalPages; i++) {
         pageArray.push(i);
      }

      return pageArray;
   }
   const pageNumbers = generatePageArray();

   const handleNext = () => {
      if (currentPage >= totalPages) return;
      else setCurrentPage((prev) => prev + 1);
   };

   const handlePrevious = () => {
      if (currentPage <= 1) return;
      else setCurrentPage((prev) => prev - 1);
   };

   const returnToFirstPage = () => {
      if (currentPage > totalPages || currentPage < 1) setCurrentPage(1);
   };

   return {
      pagedData,
      handleNext,
      handlePrevious,
      isGreaterThanDataLength,
      isLessThanFirstPage,
      setCurrentPage,
      currentPage,
      totalPages,
      returnToFirstPage,
      pageNumbers,
   };
};

export default useClientPaginator;
