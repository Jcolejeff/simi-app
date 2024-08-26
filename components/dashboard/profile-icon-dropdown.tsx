import { ChevronDown, MenuIcon } from "lucide-react";
import React from "react";

import { useRouter } from "next/navigation";

import { useUserContext } from "@/contexts/user-context";
import useStore from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dropdown } from "../ui/dropdown-menu";
import { Text } from "../ui/text";

// should infer current user avatar from a useCurrentUserContext()
const ProfileIconDropdown = ({ children }: { children?: React.ReactNode }) => {
   const { authDetails, setLoggedIn, setCurrentUser, setAuthDetails } = useStore((store) => store);
   const router = useRouter();
   return (
      <Dropdown>
         <Dropdown.Trigger>
            {children ?? (
               //   <WorkspaceSelectorDropdownButton currentWorkspace={currentWorkspace} buttonClassName={buttonClassName} />4
               <div className="flex items-center gap-1">
                  <Avatar>
                     <AvatarImage
                        className="h-full w-full rounded-[inherit] object-cover"
                        src={
                           authDetails?.photoURL ||
                           "https://images.unsplash.com/photo-1610513320995-1ad4bbf25e55?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dk"
                        }
                        alt={authDetails?.firstName}
                     />

                     <AvatarFallback>{authDetails?.firstName}</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
               </div>
            )}
         </Dropdown.Trigger>
         <Dropdown.Content className="mt-2 w-[15rem] border bg-white px-0  py-0 shadow-lg transition-all duration-300 ease-linear">
            <Dropdown.Item
               onClick={() => {
                  router.push("/dashboard");
               }}
               // key={crypto.randomUUID()}
               className=" flex cursor-pointer items-center gap-[0.75rem] px-[1.25rem] pt-[0.45rem] text-[0.9rem] leading-[1.3rem] tracking-[0.01rem] hover:!bg-primary-1"
            >
               <Text className="my-3 whitespace-nowrap font-semibold " size={"sm"}>
                  Dashboard
               </Text>
            </Dropdown.Item>
            <Dropdown.Item
               onClick={() => {
                  router.push("/dashboard");
               }}
               // key={crypto.randomUUID()}
               className=" flex cursor-pointer items-center gap-[0.75rem] px-[1.25rem] pb-[0.75rem]  text-[0.9rem] leading-[1.3rem] tracking-[0.01rem] hover:!bg-primary-1"
            >
               <Text className="mb-3 whitespace-nowrap  font-semibold capitalize" size={"sm"}>
                  {authDetails?.firstName} {authDetails.lastName}
               </Text>
            </Dropdown.Item>

            <hr />

            <hr />
            <Dropdown.Item
               // key={crypto.randomUUID()}
               onClick={() => {
                  setLoggedIn(false);
                  setCurrentUser(null);
                  setAuthDetails({});

                  router.push("/account/signin");
               }}
               className=" flex cursor-pointer items-center gap-[0.75rem] py-[0.75rem] text-[0.9rem] leading-[1.3rem] tracking-[0.01rem] hover:!bg-primary-1"
            >
               <Button variant={"link"} className=" whitespace-nowrap text-red-500 " size={"sm"}>
                  Log out
               </Button>
            </Dropdown.Item>
         </Dropdown.Content>
      </Dropdown>
   );
};

export default ProfileIconDropdown;
