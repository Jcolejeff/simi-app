"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input, inputVariants } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   SelectContent,
   Select,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

interface checkoutFormInterface {
   form: any;
   onSubmit: any;
}
export function CheckoutForm({ form, onSubmit }: checkoutFormInterface) {
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-3">
            <Text size={"md"} weight={"semibold"}>
               Billing Information
            </Text>
            <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
               <FormField
                  control={form.control}
                  name="fname"
                  render={({ field }) => (
                     <FormItem className="w-full flex-1">
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                           <Input placeholder="Your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="lname"
                  render={({ field }) => (
                     <FormItem className="w-full flex-1">
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                           <Input placeholder="Your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <FormField
               control={form.control}
               name="streetAddress"
               render={({ field }) => (
                  <FormItem className="w-full flex-1">
                     <FormLabel>Street Address</FormLabel>
                     <FormControl>
                        <Input placeholder="Address" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <section className="grid grid-cols-2 gap-2 pb-2">
               <div>
                  <Label htmlFor="country" className="text-text-dim mb-2 text-xs">
                     Country
                  </Label>
                  <CountryDropdown
                     classes={inputVariants({ variant: "default" })}
                     name={"country"}
                     defaultOptionLabel="Choose country"
                     value={form.watch("country")}
                     onChange={(country) => {
                        form.setValue("country", country);
                     }}
                  />
               </div>

               <div>
                  <Label htmlFor="state" className="text-text-dim mb-2 text-xs">
                     State
                  </Label>

                  <RegionDropdown
                     classes={inputVariants({ variant: "default" })}
                     name={"state"}
                     defaultOptionLabel="Select state or region"
                     blankOptionLabel="Select state or region"
                     country={form.watch("country")}
                     value={form.watch("state")}
                     onChange={(state) => {
                        form.setValue("state", state);
                     }}
                  />
               </div>
            </section>
            <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem className="w-full flex-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                     <FormItem className="w-full flex-1">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                           <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            {/* <div className="flex items-end gap-2">
               <Checkbox id="terms" />
               <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
               >
                  Ship to a different address
               </label>
            </div> */}
            <Separator className="my-4" />
            <Text size={"md"} weight={"semibold"}>
               Additional Info
            </Text>

            <FormField
               control={form.control}
               name="message"
               render={({ field }) => (
                  <FormItem>
                     <label className="mb-4 block rounded-full text-base ">
                        Order Notes (Optional)
                     </label>
                     <FormControl>
                        <textarea
                           rows={4}
                           className="mb-[2.5rem] w-full border bg-white px-[0.5rem] py-4 text-xl text-black placeholder:text-lg placeholder:text-gray-300  placeholder:text-secondary-2/[0.38] focus-within:border-0 focus-within:placeholder:text-secondary-2    "
                           {...field}
                           placeholder="Notes about your order, e.g. special notes for delivery"
                        />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />
            {/* <Button type="submit">Submit</Button> */}
         </form>
      </Form>
   );
}
