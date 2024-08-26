"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   updateProfile,
   updatePassword,
} from "firebase/auth";
import { authFirebase, db } from "@/firebase";
import { PasswordInput } from "@/components/ui/password-input";
import { Auth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, updateDoc, addDoc } from "firebase/firestore";
import ProcessError from "@/lib/error";
import { useDropzone } from "react-dropzone";
import useStore from "store";
import { toast } from "sonner";
import { splitStringBySpaceAndReplaceWithDash } from "@/lib/utils";
import { Camera } from "lucide-react";
import Spinner from "@/components/ui/spinner";

const formSchema = z
   .object({
      newPassword: z.string().min(6, {
         message: "New password must be at least 6 characters.",
      }),
      confirmPassword: z.string().min(6, {
         message: "New password must be at least 6 characters.",
      }),
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
   });

const ChangePassword = ({ refetchUserInfo }: { refetchUserInfo: () => void }) => {
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         newPassword: "",
         confirmPassword: "",
      },
   });
   const [formIsLoading, setFormIsLoading] = React.useState(false);

   // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
      setFormIsLoading(true);
      try {
         const user = authFirebase.currentUser;

         if (user) {
            await updatePassword(user, values.newPassword);
            refetchUserInfo();
            toast.success("Password updated successfully.");
         } else {
            toast.error("User not found.");
            throw new Error("User not found.");
         }
      } catch (error) {
         toast.error("An error occurred while updating your password.");
         console.error(error);
      }
      setFormIsLoading(false);
   }
   return (
      <div className="mt-4 w-full rounded-md bg-white p-4">
         <h1 className="mb-2">Change Password</h1>
         <Separator />
         <div className="w-full">
            <div>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-3">
                     <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                        <FormField
                           control={form.control}
                           name="newPassword"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>New Password</FormLabel>
                                 <FormControl>
                                    <PasswordInput {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="confirmPassword"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>Confirm Password</FormLabel>
                                 <FormControl>
                                    <PasswordInput {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
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

export default ChangePassword;
