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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import ProcessError from "@/lib/error";
import { useDropzone } from "react-dropzone";
import useStore from "store";
import { toast } from "sonner";
import { db } from "@/firebase";
import { splitStringBySpaceAndReplaceWithDash } from "@/lib/utils";
import { Camera } from "lucide-react";
import Spinner from "@/components/ui/spinner";
const formSchema = z.object({
   firstname: z.string().min(2, {
      message: "First name must be at least 3 characters.",
   }),
   lastname: z.string().min(2, {
      message: "Last name must be at least 3 characters.",
   }),
   // email: z.string().min(2, {
   //    message: "Email must be at least 5 characters.",
   // }),
   phone: z.string().min(2, {
      message: "Phone number must be at least 10 characters.",
   }),
});

const AccountSettings = ({ refetchUserInfo }: { refetchUserInfo: () => void }) => {
   const { authDetails } = useStore((store) => store);
   console.log("authDetails", authDetails);
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstname: authDetails.firstName ?? "",
         lastname: authDetails.lastName ?? "",

         phone: authDetails.phone ?? "",
      },
   });

   const [formIsLoading, setFormIsLoading] = useState(false);
   const [uploading, setUploading] = React.useState(false);
   const [file, setFile] = React.useState<any>(null);
   const [imageUrl, setImageUrl] = React.useState<string | null>(authDetails.photoURL || null); // New state for image URL

   const handleFileDrop = async (files: any) => {
      setFile(files);
      const fileUrl = URL.createObjectURL(files);
      setImageUrl(fileUrl); // Store the URL in state
   };
   const onDrop = (acceptedFiles: any) => {
      handleFileDrop(acceptedFiles[0]);
   };
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple: false,
      accept: {
         "image/jpeg": [],
         "image/png": [],
         "image/gif": [],
      },
   });

   // 2. Define a submit handler.
   async function onSubmit(data: z.infer<typeof formSchema>) {
      setFormIsLoading(true);
      let downloadURL = imageUrl;

      if (file) {
         const storageRef = ref(getStorage(), `users/${file.name}`);
         const snapshot = await uploadBytes(storageRef, file);
         downloadURL = await getDownloadURL(snapshot.ref);
      }

      if (!downloadURL) {
         toast.error("Image is required.");
         setFormIsLoading(false);
         return;
      }

      try {
         const postData = {
            firstName: data.firstname,
            lastName: data.lastname,
            photoURL: downloadURL,
            phone: data.phone,
            slug: splitStringBySpaceAndReplaceWithDash(data.firstname + " " + data.lastname),
         };

         const docRef = doc(db, "users", authDetails.id ?? "");
         await updateDoc(docRef, postData);
         toast.success("Profile updated successfully");
         refetchUserInfo();

         // form.reset();
         setImageUrl(null);
         setFile(null);
      } catch (error) {
         ProcessError(error);
         toast.error("An error occurred, please try again.");
      } finally {
         setFormIsLoading(false);
      }
   }
   return (
      <div className="w-full rounded-md bg-white p-4">
         <h1 className="mb-2">Account Settings</h1>
         <Separator />
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-3">
                     <FormField
                        control={form.control}
                        name="firstname"
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
                        name="lastname"
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
                     {/* <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem className="w-full flex-1">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input placeholder="xyz@gmail.com" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     /> */}
                     <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                           <FormItem className="w-full flex-1">
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                 <Input placeholder="(+234) 801-123 3344" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <Button className=" rounded-3xl" type="submit" disabled={formIsLoading}>
                        {formIsLoading ? <Spinner /> : " Save Changes"}
                     </Button>
                  </form>
               </Form>
            </div>
            <div className="flex items-center justify-center ">
               <section className=" rounded-xl    ">
                  <section {...getRootProps()}>
                     <input {...getInputProps()} />
                     {imageUrl ? (
                        <div className="relative h-[10rem] w-[10rem] rounded-full  hover:cursor-pointer">
                           <Image
                              src={imageUrl}
                              width={100}
                              height={100}
                              alt="Selected"
                              className=" h-full w-full  object-cover object-center "
                           />{" "}
                           {/* Display the selected image */}
                           <div className="absolute bottom-[5%] right-0 h-fit rounded-full   bg-slate-100 p-2">
                              <Camera className="h-6 w-6" />
                           </div>
                        </div>
                     ) : isDragActive ? (
                        <p>Drop the files here ...</p>
                     ) : (
                        <div className="flex items-center justify-center gap-3  rounded-full  bg-gray-100 px-14 py-12  outline-2  outline-gray-500 hover:cursor-pointer">
                           <Camera className="h-6 w-6" />
                        </div>
                     )}
                  </section>
               </section>
            </div>
            {/* <div className="flex flex-col items-center justify-center gap-4">
               <Image src={account} alt="account" />
               <Button className="rounded-3xl border border-[#7ab42c] bg-transparent text-[#7ab42c]">
                  Choose Image
               </Button>
            </div> */}
         </div>
      </div>
   );
};

export default AccountSettings;
