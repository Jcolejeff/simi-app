import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { formatToNaira } from "@/lib/utils";

export async function POST(req: Request, res: NextApiResponse) {
   try {
      const data = await req.json();
      const { email, amount, reference, lastName, firstName, transId, userId, status, name } = data;

      if (status !== "success") {
         return NextResponse.json(
            { success: false, data: "Payment failed" },
            { status: 400, statusText: "Bad Request" },
         );
      }

      const walletRef = doc(db, "wallets", userId);
      const walletSnap = await getDoc(walletRef);

      if (walletSnap.exists()) {
         // Update the wallet balance and totalDeposit if the document exists
         await updateDoc(walletRef, {
            balance: walletSnap.data().balance + amount,
            totalDeposit: (walletSnap.data().totalDeposit || 0) + amount,
         });
      } else {
         // Create a new wallet document if it doesn't exist
         await setDoc(walletRef, {
            userId,
            email,
            name: `${firstName || "user"} ${lastName || "user"}`,
            balance: amount,
            totalDeposit: amount,
            totalSpent: 0,
         });
      }

      // Update the transactions array in the user's transactions document
      const transactionsRef = doc(db, "transactions", userId);
      const transactionsSnap = await getDoc(transactionsRef);

      if (transactionsSnap.exists()) {
         // Add a new transaction to the transactions array
         await updateDoc(transactionsRef, {
            transactions: arrayUnion({
               amount,
               type: "credit",
               date: new Date(),
               reference,
               transId,
               status,
               firstName: firstName || "User",
               lastName: lastName || "User",
               email,
            }),
         });
      } else {
         // Create a new transactions document with the initial transaction
         await setDoc(transactionsRef, {
            userId,
            transactions: [
               {
                  amount,
                  type: "credit",
                  date: new Date(),
                  reference,
                  transId,
                  status,
                  firstName: firstName || "User",
                  lastName: lastName || "User",
                  email,
               },
            ],
         });
      }

      // Update the notifications array in the user's notifications document
      const notificationsRef = doc(db, "notifications", userId);
      const notificationsSnap = await getDoc(notificationsRef);

      if (notificationsSnap.exists()) {
         // Add a new notification to the notifications array
         await updateDoc(notificationsRef, {
            notifications: arrayUnion({
               message: `Your wallet has been credited with ${formatToNaira(amount)}`,
               type: "wallet_credit",
               date: new Date(),
               read: false,
               firstName,
               lastName,
               status,
               email,
            }),
         });
      } else {
         // Create a new notifications document with the initial notification
         await setDoc(notificationsRef, {
            userId,
            notifications: [
               {
                  message: `Your wallet has been credited with ${formatToNaira(amount)}`,
                  type: "wallet_credit",
                  date: new Date(),
                  read: false,
                  firstName,
                  lastName,
                  status,
                  email,
               },
            ],
         });
      }

      return NextResponse.json({ success: true, data: "Success" });
   } catch (error: any) {
      return NextResponse.json(
         {
            success: false,
            error: error.message,
            status: error.response ? error.response.status : 500,
         },
         {
            status: error.response ? error.response.status : 500,
            statusText: error.response ? error.response.statusText : "Internal Server Error",
         },
      );
   }
}
