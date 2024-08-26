"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import account from "@/images/account.png";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import {
   SelectContent,
   Select,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Input, inputVariants } from "@/components/ui/input";
import Image from "next/image";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Label } from "@/components/ui/label";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, updateDoc, addDoc } from "firebase/firestore";
import ProcessError from "@/lib/error";
import { useDropzone } from "react-dropzone";
import useStore from "store";
import { toast } from "sonner";
import { db } from "@/firebase";
import { splitStringBySpaceAndReplaceWithDash } from "@/lib/utils";
import { Camera } from "lucide-react";
import Spinner from "@/components/ui/spinner";

const formSchema = z.object({
   company: z.string(),
   address: z.string().min(2, {
      message: "Address must be at least 5 characters.",
   }),
   zipcode: z.string().min(2, {
      message: "Zipcode must be at least 6 characters.",
   }),
   country: z.string().min(2, {
      message: "Country must be at least 4 characters.",
   }),
   state: z.string().min(2, {
      message: "Country must be at least 3 characters.",
   }),
});

const BillingAddress = ({ refetchUserInfo }: { refetchUserInfo: () => void }) => {
   const { authDetails } = useStore((store) => store);

   const [formIsLoading, setFormIsLoading] = useState(false);
   const [uploading, setUploading] = React.useState(false);
   const [file, setFile] = React.useState<any>(null);
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         address: authDetails.addressDetails?.address ?? "",

         company: authDetails.addressDetails?.company ?? "",
         country: authDetails.addressDetails?.country ?? "",
         state: authDetails.addressDetails?.state ?? "",
         zipcode: authDetails.addressDetails?.zipcode ?? "",
      },
   });

   // 2. Define a submit handler.
   async function onSubmit(data: z.infer<typeof formSchema>) {
      setFormIsLoading(true);
      try {
         const postData = {
            addressDetails: {
               address: data.address,
               company: data.company,
               country: data.country,
               state: data.state,
               zipcode: data.zipcode,
            },
         };

         const docRef = doc(db, "users", authDetails.id ?? "");
         await updateDoc(docRef, postData);
         refetchUserInfo();
         toast.success("Profile updated successfully");
      } catch (error) {
         ProcessError(error);
         toast.error("An error occurred, please try again.");
      } finally {
         setFormIsLoading(false);
      }
   }
   return (
      <div className="mt-4 w-full rounded-md bg-white p-4">
         <h1 className="mb-2">Billing Address</h1>
         <Separator />
         <div className="w-full">
            <div>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-3">
                     <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                        <FormField
                           control={form.control}
                           name="company"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>
                                    Company <span className="text-gray-300">(optional)</span>
                                 </FormLabel>
                                 <FormControl>
                                    <Input placeholder="Company name" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                           <FormItem className="w-full flex-1">
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <section className="grid grid-cols-2 gap-2 pb-2">
                        <div>
                           <Label htmlFor="country" className=" mb-2 ">
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
                           <Label htmlFor="state" className=" mb-2 ">
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
                        <FormField
                           control={form.control}
                           name="zipcode"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>Zip Code</FormLabel>
                                 <FormControl>
                                    <Input {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </section>
                     <Button className=" rounded-3xl" type="submit" disabled={formIsLoading}>
                        {formIsLoading ? <Spinner /> : " Save Changes"}
                     </Button>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default BillingAddress;
