"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "../ui/spinner";
import { toast } from "sonner";

import axios from "axios";
import ProcessError from "@/lib/error";
const formSchema = z.object({
   full_name: z.string().min(2, {
      message: "Full Name must be at least 2 characters.",
   }),
   
   email: z.string().email({
      message: "Please provide a valid email address...",
   }),
});
type formInterface = z.infer<typeof formSchema>;

export function NewsletterForm({ mode }: { mode?: "light" | "dark" }) {
   const form = useForm<formInterface>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         full_name: "",
         email: "",
         //  phone_number: "",
      },
   });
   const { mutate, isPending } = useMutation<any, any, formInterface>({
      mutationFn: async ({ email, full_name }) => {
         //  toast.success("Subscribed successfully");
         const user = await axios.post("/api/newsletter", { email, name: full_name });
         console.log({ user });

         return user;
      },
      onSuccess: async (data) => {
         toast.success("Subscribed successfully");
         form.reset();
      },
      onError: (err) => {
         ProcessError(err);
      },
   });

   function onSubmit(values: formInterface) {
      mutate(values);
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2"
         >
            <FormField
               control={form.control}
               name="full_name"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           className={`rounded-2xl border ${mode === "dark" ? "border-[#393939] bg-[#393939] text-white" : "border-gray-100 bg-gray-100"}`}
                           placeholder="Full name*"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           className={`rounded-2xl border ${mode === "dark" ? "border-[#393939] bg-[#393939] text-white" : "border-gray-100 bg-gray-100"}`}
                           placeholder="E-mail*"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {/* <FormField
               control={form.control}
               name="phone_number"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           className={`rounded-2xl border ${mode === "dark" ? "border-[#393939] bg-[#393939] text-white" : "border-gray-100 bg-gray-100"}`}
                           placeholder="Phone Number*"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            /> */}
            <Button className="col-span-2  rounded-2xl" type="submit" disabled={isPending}>
               {isPending ? <Spinner /> : "Subscribe"}
            </Button>
         </form>
      </Form>
   );
}
