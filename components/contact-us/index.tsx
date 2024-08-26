"use client";
import { Button } from "components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "lib/utils";
import { ChevronDown, ChevronRightIcon } from "lucide-react";
import emailjs from "@emailjs/browser";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
   FormLabel,
   FormDescription,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { Textarea } from "components/ui/textarea";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect, useRef } from "react";
import useUserLocation from "lib/hooks/useUserLocation";
import { toast } from "sonner";
import ProcessError from "lib/error";

import Spinner from "components/ui/spinner";

interface Iprops {
   title?: string;
   subTitle?: string;
   breadcrumb?: string;
   businessType?: string;
   closeForm?: () => void;
}

const FormSchema = z.object({
   user_email: z
      .string()
      .min(2, {
         message: "Please enter a valid email.",
      })
      .email(),

   user_phone: z.string().min(2, {
      message: "Please enter a valid Number.",
   }),

   user_name: z.string({
      required_error: "Name is required.",
   }),

   phone_country_code: z.string(),
   currency_code: z.string(),
   message: z
      .string()
      .min(10, {
         message: "Message must be at least 10 characters.",
      })
      .max(160, {
         message: "Message must not be longer than 16 characters.",
      }),
});

function ContactUsForm() {
   const formRef = useRef<HTMLFormElement | null>(null);

   const [phoneCountry, setPhoneCountry] = useState("");
   const [formIsLoading, setFormIsLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [message, setMessage] = useState({ text: "", isError: false });

   const { location } = useUserLocation();

   const [phoneData, setPhoneData] = useState({
      phoneNumber: "",
      countryCode: "",
   });
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
   });

   async function onSubmit(data: z.infer<typeof FormSchema>) {
      setFormIsLoading(true);

      try {
         const data = await emailjs.sendForm(
            "service_k08w62w",
            "template_fsbxx8c",
            formRef.current as HTMLFormElement,
            "X3OkpMZncUC0S79v4",
         );
         setMessage({ text: "Message Sent Successfully", isError: false });

         toast.success("Thanks for contacting us, we will get back to you shortly");
         form.reset();
      } catch (error: any) {
         setMessage({ text: ProcessError(error), isError: true });

         toast.error("Error sending message, please try again");
      }

      setFormIsLoading(false);
   }

   const handleOnPhoneChange = (phone: any, countryData: any) => {
      setPhoneData((prev) => ({
         ...prev,
         phoneNumber: phone?.slice(countryData?.dialCode?.length),
         countryCode: countryData.dialCode,
      }));

      form.setValue("user_phone", phone);
      form.setValue("phone_country_code", `+${countryData?.dialCode}`);
      setPhoneCountry(countryData?.iso2);
   };

   useEffect(() => {
      form.setValue("user_phone", location?.country_calling_code!);
      form.setValue("currency_code", location?.currency);
   }, [location?.country_calling_code, location?.currency]);

   return (
      <div className=" relative flex  w-full    flex-col gap-4 rounded-[15px]">
         <Form {...form}>
            <form
               ref={formRef}
               onSubmit={form.handleSubmit(onSubmit)}
               className="flex w-full flex-col gap-4"
            >
               <h2 className="mb-4 text-xl font-semibold">Send Us a Message</h2>
               <section className=" grid grid-cols-1 gap-6   ">
                  <FormField
                     control={form.control}
                     name="user_name"
                     render={({ field }) => (
                        <FormItem>
                           <div className="relative">
                              <label className="mb-4 block   rounded-full text-base ">
                                 Full Name
                              </label>
                              <FormControl>
                                 <Input
                                    className="bg-white  py-6 text-lg transition-all duration-200 ease-in-out  placeholder:text-lg  placeholder:text-gray-300 focus-within:placeholder:text-secondary-2 focus:bg-[#DBF1FF] "
                                    placeholder="Jane"
                                    {...field}
                                 />
                              </FormControl>
                           </div>
                           <FormMessage className="mt-1 text-base" />
                        </FormItem>
                     )}
                  />
               </section>

               <section className=" grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr]  ">
                  <FormField
                     control={form.control}
                     name="user_email"
                     render={({ field }) => (
                        <FormItem>
                           <div className="relative">
                              <label className="mb-4 block  rounded-full text-base ">Email</label>
                              <FormControl>
                                 <Input
                                    className="bg-white  py-6 text-lg transition-all duration-200 ease-in-out  placeholder:text-lg  placeholder:text-gray-300 focus-within:placeholder:text-secondary-2 focus:bg-[#DBF1FF]"
                                    {...field}
                                    placeholder="youremail@gmail.com"
                                 />
                              </FormControl>
                           </div>
                           <FormMessage className="mt-1 text-base" />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="user_phone"
                     render={({ field }) => (
                        <FormItem>
                           <div className="relative">
                              <label className="mb-4 block   rounded-full text-base ">
                                 Phone Number
                              </label>
                              <FormControl>
                                 <PhoneInput
                                    containerClass="phone-container"
                                    inputClass="py-6 bg-white text-lg focus-within:placeholder:text-secondary-2  placeholder:text-gray-300 placeholder:text-lg  focus:border-0  transition-all duration-200 ease-in-out"
                                    placeholder="phone number"
                                    buttonClass="bg-[#DBF1FF] "
                                    inputStyle={{
                                       border: "1px solid #e4e2e2",
                                       width: "100%",
                                    }}
                                    onChange={(phone, country) =>
                                       handleOnPhoneChange(phone, country)
                                    }
                                    autoFormat={true}
                                    inputProps={{
                                       name: "phone",
                                       required: true,
                                    }}
                                    buttonStyle={{
                                       background: "white",
                                       paddingInline: "0.1rem",
                                       border: "1px solid #e4e2e2",
                                       borderRight: "none",
                                    }}
                                    dropdownStyle={{ height: "300px", maxHeight: "300px" }}
                                    dropdownClass="bg-white shadow-1"
                                    searchStyle={{
                                       width: "80%",
                                       border: "1px solid #e4e2e2",
                                       borderLeft: "none",
                                       borderRight: "none",
                                       borderTop: "none",
                                       borderBottom: "none",
                                       paddingBlock: "0.6rem",
                                       marginBottom: "0.1rem",
                                    }}
                                    value={field.value}
                                    country={phoneCountry || location.country_code}
                                    enableSearch={true}
                                    disableSearchIcon={true}
                                 />
                              </FormControl>
                              <FormMessage className="mt-1 text-base" />
                           </div>
                        </FormItem>
                     )}
                  />
               </section>

               <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                     <FormItem>
                        <label className="mb-4 block rounded-full text-base ">Message</label>
                        <FormControl>
                           <textarea
                              rows={4}
                              className="mb-[2.5rem] w-full border bg-white px-[0.5rem] py-4 text-xl text-black placeholder:text-lg placeholder:text-gray-300  placeholder:text-secondary-2/[0.38] focus-within:border-0 focus-within:placeholder:text-secondary-2    "
                              {...field}
                              placeholder="Write here..."
                           />
                        </FormControl>

                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className=" mt-4 ">
                  <Button
                     disabled={formIsLoading}
                     type="submit"
                     className="group flex w-fit items-center justify-center gap-2 rounded-full  px-5 py-2 transition-all duration-200 ease-in-out hover:opacity-90"
                  >
                     <span className="font-[500] leading-[1.5rem] tracking-[0.02875rem] text-white disabled:cursor-not-allowed disabled:opacity-50">
                        {formIsLoading ? <Spinner /> : "Send Message"}
                     </span>
                  </Button>

                  <span
                     className={`${
                        message.isError ? "text-red-500" : "text-green-700"
                     } mt-4 block  text-[16px] transition-opacity duration-200 ease-in-out`}
                  >
                     {message.text}
                  </span>
               </div>
            </form>
         </Form>
      </div>
   );
}

export default ContactUsForm;
