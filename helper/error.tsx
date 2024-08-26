import { AxiosError } from "axios";
import { toast } from "sonner";

export const ProcessError = (error: any, cb?: CallableFunction) => {
   const err = error as AxiosError<any>;
   if (error?.response?.data?.error?.message) {
      toast.error(error?.response?.data?.error?.message);
   } else {
      toast.error(error?.message || `An error occurred`);
   }
   let msg: any = "";

   if (error?.response?.data?.message) {
      msg = error?.response?.data?.message;

      if (cb) cb(msg);
      return msg;
   } else if (error?.response?.data?.detail && error?.response?.data?.detail instanceof Array) {
      error?.response?.data?.detail?.map((det: Record<string, unknown>) => {
         msg = det?.msg;
         if (msg) {
            if (cb) cb(msg);
            return msg;
         }
         return "incomplete or incorrect details";
      });
   } else if (error?.response?.data?.detail) {
      msg = error?.response?.data?.detail;
      if (cb) cb(msg);

      return msg;
   } else if (error?.response?.status === 422) {
      error?.message("incomplete or incorrect details");
      return "incomplete or incorrect details";
   } else if (error?.response?.status >= 500) {
      return "We could not connect to the server";
   } else {
      return "An Error Occurred";
   }
};
