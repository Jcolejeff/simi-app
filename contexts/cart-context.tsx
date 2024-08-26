import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface CartItem {
   units?: { ratio: number; unit: string; price: number | string }[];
   costprice?: string | number;
   nameYourPrice?: boolean;
   subcategory?: { name: string; id: string };
   category?: { name: string; id: string };
   desc?: string;
   minimumPrice?: number;
   price?: number;
   image?: string;
   name?: string;
   slug?: string;
   unit?: string;
   quantity?: number;
   ratings?: { caption: string; rating: number; ratedBy: string[]; description: string }[];
   id?: any;
   chosenUnit?: string;
   no_of_items?: number;
   status?: string;
}

interface CartContextType {
   currentCart: CartItem[];
   setCurrentCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
   handleMinus: (
      item: CartItem,
      selectedUnit?: {
         unit?: string;
         price?: number | string;
      },
   ) => void;
   handlePlus: (
      item: CartItem,
      selectedUnit?: {
         unit?: string;
         price?: number | string;
      },
   ) => void;
   handleRemove: (itemId: any, chosenUnit?: string) => void;
   clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
   currentCart: [],
   setCurrentCart: () => {},
   handleMinus: () => {},
   handlePlus: () => {},
   handleRemove: () => {},
   clearCart: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
   const storedCart = localStorage.getItem("cart");

   const [currentCart, setCurrentCart] = useState<CartItem[]>(JSON.parse(storedCart ?? "[]"));

   // Update local storage whenever the cart changes
   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(currentCart));
      console.log(currentCart);
   }, [currentCart]);

   const handleMinus = (
      item: CartItem,
      selectedUnit?: {
         unit?: string;
         price?: number | string;
      },
   ) => {
      const chosenUnit = `${selectedUnit?.unit}${selectedUnit?.price}`;
      let currentItemIndex;
      if (selectedUnit) {
         currentItemIndex = currentCart.findIndex(
            (cartItem) => cartItem.chosenUnit === chosenUnit && cartItem.id === item.id,
         );
      } else {
         currentItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      }
      // If item is found in the cart
      if (currentItemIndex !== -1) {
         const updatedCart = [...currentCart];
         const currentItem = updatedCart[currentItemIndex];
         const updatedNoOfItems = Math.max((currentItem.no_of_items ?? 0) - 1, 1);

         updatedCart[currentItemIndex] = {
            ...currentItem,
            no_of_items: updatedNoOfItems,
         };

         setCurrentCart(updatedCart);
      } else {
         // If item is not found in the cart, add it with no_of_items set to 1
         setCurrentCart([...currentCart, { ...item, no_of_items: 1 }]);
      }

      toast.success("Item removed from cart");
   };

   const handlePlus = (
      item: CartItem,
      selectedUnit?: {
         unit?: string;
         price?: number | string;
      },
   ) => {
      const chosenUnit = `${selectedUnit?.unit}${selectedUnit?.price}`;
      let currentItemIndex;
      if (selectedUnit) {
         currentItemIndex = currentCart.findIndex(
            (cartItem) => cartItem.chosenUnit === chosenUnit && cartItem.id === item.id,
         );
      } else {
         currentItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      }
      console.log(chosenUnit);
      if (currentItemIndex !== -1) {
         const updatedCart = [...currentCart];
         const currentItem = updatedCart[currentItemIndex];

         const updatedNoOfItems = (currentItem.no_of_items ?? 0) + 1;

         updatedCart[currentItemIndex] = {
            ...currentItem,
            no_of_items: updatedNoOfItems,
         };
         setCurrentCart(updatedCart);
      } else {
         setCurrentCart([
            ...currentCart,
            {
               ...item,
               no_of_items: 1,
               chosenUnit: chosenUnit,
               price: Number(selectedUnit?.price || (item.units && item.units[0].price)),
            },
         ]);
      }
      toast.success(`Item added to cart`);
   };

   const handleRemove = (itemId: any, chosenUnit?: string) => {
      const updatedCart = currentCart.filter(
         (item) => !(item.id === itemId && item.chosenUnit === chosenUnit),
      );
      setCurrentCart(updatedCart);

      toast.success("Item removed from cart");
   };

   const clearCart = () => {
      setCurrentCart([]);
      localStorage.removeItem("cart");
      toast.success("Cart cleared");
   };

   return (
      <CartContext.Provider
         value={{ currentCart, setCurrentCart, handleMinus, handlePlus, handleRemove, clearCart }}
      >
         {children}
      </CartContext.Provider>
   );
};

export { CartProvider, CartContext };
