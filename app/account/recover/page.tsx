"use client";
import React, { useState } from "react";
import Container from "@/components/shared/container";
import RouteDisplay from "../../../components/shared/route-display";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Text } from "@/components/ui/text";

import { db, authFirebase } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";

import ProcessError from "@/lib/error";
import Spinner from "@/components/ui/spinner";
const FormSchema = z.object({
   email: z.string().min(2, {
      message: "email must be at least 2 characters.",
   }),
});

type formInterface = z.infer<typeof FormSchema>;

function Page() {
   const [formIsLoading, setFormIsLoading] = useState(false);

   const form = useForm<formInterface>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         email: "",
      },
   });
   const resetPassword = async (email: string) => {
      setFormIsLoading(true);
      try {
         const data = await sendPasswordResetEmail(authFirebase, email);
         toast.success("Password reset link sent successfully");
      } catch (error) {
         ProcessError(error);
      }

      setFormIsLoading(false);
   };

   function onSubmit(data: formInterface) {
      resetPassword(data.email);
   }

   return (
      <div className="pt-[4rem]">
         <RouteDisplay route={"Recover Account"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <div className="w-full max-w-[600px] rounded-md border border-gray-100 px-5 py-8 shadow">
                  <h1 className="mb-4 w-full text-center text-3xl font-semibold">
                     Recover Account
                  </h1>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input className="py-6" placeholder="Email" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <Button
                           className="w-full rounded-3xl"
                           type="submit"
                           disabled={formIsLoading}
                        >
                           {formIsLoading ? <Spinner /> : "Recover Account"}
                        </Button>
                        <div className="my-2 flex w-full items-center justify-center gap-1 ">
                           <Text size={"sm"} weight={"medium"}>
                              Dont have an account?
                           </Text>
                           <Link
                              href={"/account/register"}
                              className="text-sm font-medium hover:text-blue-800 hover:underline"
                           >
                              Register
                           </Link>
                        </div>
                     </form>
                  </Form>
               </div>
            </main>
         </Container>
      </div>
   );
}

export default Page;
