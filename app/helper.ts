export const calculateTotalPrice = (items: any[]) => {
   let totalPrice = 0;
   items.forEach((item) => {
      totalPrice += item.price * item.no_of_items;
   });
   return totalPrice;
};
