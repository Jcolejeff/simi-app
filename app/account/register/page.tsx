"use client";
import React from "react";
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
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";
import useStore from "@/store";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   updateProfile,
} from "firebase/auth";
import { authFirebase, db } from "@/firebase";
import {
   doc,
   setDoc,
   getDoc,
   collection,
   where,
   getDocs,
   updateDoc,
   query,
   increment,
} from "firebase/firestore";
import ProcessError from "@/lib/error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { useParams, useSearchParams } from "next/navigation";
import { Metadata } from "next";
const formSchema = z.object({
   email: z.string().min(2, {
      message: "email must be at least 2 characters.",
   }),
   password: z.string().min(2, {
      message: "email must be at least 5 characters.",
   }),
   passwordConfirmation: z.string().min(2, {
      message: "email must be at least 5 characters.",
   }),
});
type formInterface = z.infer<typeof formSchema>;

function Page() {
   const form = useForm<formInterface>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
         passwordConfirmation: "",
      },
   });
   const router = useRouter();
   const search = useSearchParams();
   const ref = search.get("ref");
   const redirectUrl = search.get("redirect");

   const { setAuthDetails, setLoggedIn, setCurrentUser } = useStore((store) => store);

   const {
      register,
      handleSubmit,
      trigger,
      control,
      formState: { errors },
   } = useForm<formInterface>({
      resolver: zodResolver(formSchema),
      mode: "all",
   });

   const { mutate, isPending } = useMutation<any, any, any>({
      mutationFn: async ({ email, password }) => {
         try {
            // Create user
            const res = await createUserWithEmailAndPassword(authFirebase, email, password);

            await updateProfile(res.user, {
               displayName: "",
            });

            // Generate a unique referral code
            const referralCode =
               Math.floor(Math.random() * 1000000000 + 1) +
               Math.floor(Math.random() * 1000000000 + 1) +
               "R";

            // Create user document on Firestore
            await setDoc(doc(db, "users", res.user.uid), {
               uid: res.user.uid,
               displayName: "",
               email,
               photoURL: "",
               role: "user",
            });

            // Create a referral document for the user with points
            await setDoc(doc(db, "referrals", res.user.uid), {
               referralCode,
               userId: res.user.uid,
               points: 0, // Initialize points to 0 or any desired initial value
            });

            // Check if user has a referral code
            if (ref) {
               const refQuery = query(
                  collection(db, "referrals"),
                  where("referralCode", "==", ref),
               );
               const refQuerySnapshot = await getDocs(refQuery);

               if (!refQuerySnapshot.empty) {
                  const refDoc = refQuerySnapshot.docs[0];
                  const refData = refDoc.data();
                  // Increase referrer's points by 100
                  await updateDoc(refDoc.ref, {
                     points: increment(100),
                  });
                  toast.success("Referral bonus applied!");
               } else {
                  toast.error("Invalid referral code. No bonus applied.");
               }
            }
            return res.user;
         } catch (err) {
            console.log(err);
            ProcessError(err);

            throw err;
         }
      },
      onSuccess: (data, variables) => {
         doLoginAttempt({ email: variables.email, password: variables.password });
      },
      onError: (err) => {
         ProcessError(err);
      },
   });

   const { mutate: doLoginAttempt } = useMutation<any, any, any>({
      mutationFn: async (params) => {
         const user = await signInWithEmailAndPassword(authFirebase, params.email, params.password);

         return user;
      },
      onSuccess: async (data) => {
         // setAuthDetails(data);
         setCurrentUser(data);
         setLoggedIn(true);
         // Create a reference to the document
         const docRef = doc(db, "users", data.user.uid);

         // Retrieve the document
         const docSnap = await getDoc(docRef);

         if (docSnap.exists()) {
            // Document exists, use the data
            setAuthDetails({
               ...docSnap.data(),
               ...data["_tokenResponse"],
               id: data.user.uid,
            });

            if (redirectUrl) {
               router.push(redirectUrl);
            } else {
               router.push("/dashboard");
            }
            return docSnap.data(); // Return the document data
         } else {
            // Document does not exist
            console.log("No such document!");
            return null;
         }
      },
      onError: (err) => {
         ProcessError(err);
      },
   });

   function onSubmit(data: formInterface) {
      mutate(data);
   }

   return (
      <div className="pt-[4rem]">
         <head>
            <title>Sign Up | MyFoodAngels</title>
            <meta
               name="description"
               content="Sign in to your MyFoodAngels account to access your dashboard, manage your orders, and explore our wide selection of groceries and food items."
            />
            <meta
               name="keywords"
               content="Sign In, MyFoodAngels, Login, Food Delivery, Account Access"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximumScale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="Sign Up | MyFoodAngels" />
            <meta
               property="og:description"
               content="Sign up to your MyFoodAngels account to manage your orders and explore our grocery selection."
            />
            <meta property="og:url" content="https://myfoodangels.com/account/register" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/images/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Sign In | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="Sign in to your MyFoodAngels account to manage your orders and explore our grocery selection."
            />
            <meta property="twitter:image" content="/images/og.jpg" />
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     "@context": "https://schema.org",
                     "@type": "FAQPage",
                     mainEntity: [
                        {
                           "@type": "Question",
                           name: "How do I sign in to MyFoodAngels?",
                           acceptedAnswer: {
                              "@type": "Answer",
                              text: "To sign in to MyFoodAngels, enter your registered email address and password on the sign-in page and click 'Sign In'.",
                           },
                        },
                        {
                           "@type": "Question",
                           name: "What if I forgot my password?",
                           acceptedAnswer: {
                              "@type": "Answer",
                              text: "If you forgot your password, click on 'Forgot Password?' on the sign-in page, and follow the instructions to reset your password.",
                           },
                        },
                     ],
                  }),
               }}
            />
         </head>

         <RouteDisplay route={"Register"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <div className="w-full max-w-[600px] rounded-md border border-gray-100 px-5 py-8 shadow">
                  <h1 className="mb-4 w-full text-center text-3xl font-semibold">Create Account</h1>
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
                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <PasswordInput
                                       className="py-6"
                                       placeholder="Password"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="passwordConfirmation"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <PasswordInput
                                       className="py-6"
                                       placeholder="Confirm Password"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <div className="my-8 flex w-full items-center justify-between ">
                           <div className="flex items-center space-x-2">
                              <Checkbox id="terms" />
                              <label
                                 htmlFor="terms"
                                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                 Accept all terms & conditions
                              </label>
                           </div>
                        </div>

                        <Button className="w-full rounded-3xl" type="submit" disabled={isPending}>
                           {isPending ? <Spinner /> : "Create Account"}
                        </Button>
                        <div className="my-2 flex w-full items-center justify-center gap-1 ">
                           <Text size={"sm"} weight={"medium"}>
                              Already have an account?
                           </Text>
                           <Link
                              href={
                                 redirectUrl
                                    ? `/account/signin?redirect=${redirectUrl}`
                                    : "/account/signin"
                              }
                              className="text-sm font-medium hover:text-blue-800 hover:underline"
                           >
                              Login
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
