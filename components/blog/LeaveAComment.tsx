import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const InputClassName = "rounded-md border outline-none focus:border-[1px] focus:border-[#7AB42C]";

const LeaveAComment = () => {
   return (
      <div className="mb-8">
         <p className="mb-4 text-[24px] font-[500]">Leave a comment</p>
         <div>
            <form>
               <div className="mb-4">
                  <div className="mb-4 grid grid-cols-2 gap-4">
                     <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                           className={InputClassName}
                           name="name"
                           placeholder="Zakir Hossen"
                           variant="unstyled"
                        />
                     </div>
                     <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                           className={InputClassName}
                           type="email"
                           name="email"
                           placeholder="A@se.com"
                           variant="unstyled"
                        />
                     </div>
                  </div>
                  <div>
                     <Label htmlFor="message">Message</Label>
                     <Input
                        className={InputClassName}
                        name="message"
                        placeholder="Write your comment here…"
                        variant="unstyled"
                     />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[#666666]">
                     <Checkbox color="#666666" className="text-[#666666]" />
                     <span>
                        Save my name and email in this browser for the next time I comment.
                     </span>
                  </div>
               </div>
               <Button
                  className="rounded-full bg-[#7AB42C] px-8 font-[600] text-[#7AB42C] text-white"
                  variant="primary"
               >
                  Post Comments
               </Button>
            </form>
         </div>
      </div>
   );
};

export default LeaveAComment;
