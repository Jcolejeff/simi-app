// components/ReviewModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import useStore from "@/store";
import axios from "axios";
import ProcessError from "@/lib/error";
import Spinner from "@/components/ui/spinner";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
   rating: z.number().min(1).max(5),
   text: z.string().min(5, {
      message: "Review must be at least 5 characters.",
   }),
});

type formInterface = z.infer<typeof formSchema>;

interface IProps {
   productId: string;
   trigger?: JSX.Element;
   refetchReviews: () => void;
}

const ReviewModal: React.FC<IProps> = ({ productId, trigger, refetchReviews }) => {
   const [open, setOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [hasBoughtProduct, setHasBoughtProduct] = useState(false);

   const { authDetails, loggedIn } = useStore((store) => store);

   useEffect(() => {
      const checkUserBoughtProduct = async () => {
         if (!authDetails.id) return;

         try {
            const userRef = doc(db, "users", authDetails.id);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
               const userData = userSnap.data();
               const productsBought = userData.productsBought || [];
               setHasBoughtProduct(productsBought.includes(productId));
            }
         } catch (error) {
            console.error("Error checking if user has bought product:", error);
         }
      };

      checkUserBoughtProduct();
   }, [authDetails.id, productId]);

   const form = useForm<formInterface>({
      resolver: zodResolver(formSchema),
   });

   const { mutate } = useMutation({
      mutationFn: async (data: formInterface) => {
         if (!authDetails.id) throw new Error("User is not logged in");

         const payload = {
            userId: authDetails.id,
            productId,
            ...data,
            title: "Customer",
            firstName: authDetails.firstName || "Customer",
            lastName: authDetails.lastName || "",
            isApproved: false,
            image: authDetails?.photoURL || "",
         };

         await axios.post("/api/reviews/create", payload);
      },
      onSuccess: () => {
         toast.success("Review submitted successfully!");
         refetchReviews();

         setOpen(false);
         form.reset();
      },
      onError: (error: any) => {
         ProcessError(error);
         toast.error("Error submitting review. Please try again.");
      },
   });

   function onSubmit(values: formInterface) {
      setIsLoading(true);
      mutate(values, {
         onSettled: () => {
            setIsLoading(false);
         },
      });
   }

   if (!authDetails.id) return null;

   return (
      <Dialog onOpenChange={setOpen} open={open}>
         <DialogTrigger asChild>
            {loggedIn ? (
               <Button
                  // disabled={!hasBoughtProduct}
                  className="mx-auto mt-4 flex w-fit rounded-3xl px-6 text-sm disabled:cursor-not-allowed"
               >
                  Add a review <Plus className="w-4 text-white" />
               </Button>
            ) : null}
         </DialogTrigger>
         <DialogContent className="bg-white">
            <DialogHeader>
               <DialogTitle>Leave a Review</DialogTitle>
            </DialogHeader>
            {hasBoughtProduct ? (
               <section className="bg-white">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white">
                        <FormField
                           control={form.control}
                           name="rating"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input
                                       max={5}
                                       min={1}
                                       type="number"
                                       placeholder="Rating (1-5)"
                                       {...field}
                                       value={field.value}
                                       onChange={(e) => {
                                          const value = e.target.value;
                                          field.onChange(value === "" ? "" : Number(value));
                                       }}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="text"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Textarea
                                       placeholder="Review"
                                       {...field}
                                       rows={6}
                                       variant="default"
                                       size="lg"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <Button type="submit" disabled={isLoading}>
                           {isLoading ? <Spinner /> : "Submit"}
                        </Button>
                     </form>
                  </Form>
               </section>
            ) : (
               <p>You can only leave a review for products you have purchased.</p>
            )}
         </DialogContent>
      </Dialog>
   );
};

export default ReviewModal;
