import { StateCreator } from "zustand";
import { authDetailsInterface, planTypes } from "types";

export type AuthStateType = {
   authLoading: boolean;
   loggedIn: boolean;

   setLoggedIn: (arg: boolean) => void;

   setAuthLoading: (arg: boolean) => void;
   authDetails: authDetailsInterface;
   setAuthDetails: (arg: authDetailsInterface) => void;
   resetEmail: string;
   setResetEmail: (arg: string) => void;
   currentUser: any;
   setCurrentUser: (arg: any) => void;
};

const authSlice: StateCreator<AuthStateType, [["zustand/devtools", never]], []> = (set) => ({
   authLoading: true,
   resetEmail: "",
   loggedIn: false,

   currentUser: {},
   setCurrentUser: (arg) => {
      set({ currentUser: arg });
   },
   setResetEmail: (arg) => {
      set({ resetEmail: arg });
   },
   setAuthLoading: (arg) => {
      set({ authLoading: arg });
   },
   setLoggedIn: (arg) => {
      set({ loggedIn: arg });
   },

   authDetails: {},
   setAuthDetails: (arg) => {
      set({ authDetails: arg });
   },
});

export default authSlice;
