import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { getDoc, doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { formatToNaira, addProductsToUserSoTheyCanReview } from "@/lib/utils";

export async function POST(req: Request, res: NextApiResponse) {
   try {
      const data = await req.json();
      const {
         email,
         amount,
         reference,
         lastName,
         firstName,
         userId,
         name,
         address,
         phone,
         message,
         cartItems,
      } = data;
      const walletRef = doc(db, "wallets", userId);
      const walletSnap = await getDoc(walletRef);

      if (!walletSnap.exists() || walletSnap.data().balance < amount) {
         return NextResponse.json(
            { success: false, data: "Insufficient balance or wallet does not exist" },
            { status: 400, statusText: "Bad Request" },
         );
      }

      const newBalance = walletSnap.data().balance - amount;

      // Create a new order
      const orderRef = await setDoc(doc(db, "orders", reference), {
         userId,
         email,
         totalAmount: amount,
         orderId: reference,
         name: name || "User",
         paymentReference: reference,
         date: new Date(),
         status: "pending",
         firstName: firstName || "User",
         lastName: lastName || "User",
         address,
         phone,
         message,
         cartItems,
         created_date: serverTimestamp(),
      });

      // Update the wallet balance and totalSpent
      await updateDoc(walletRef, {
         balance: newBalance,
         totalSpent: (walletSnap.data().totalSpent || 0) + amount,
      });
      await addProductsToUserSoTheyCanReview(userId, cartItems);

      // Update the transactions array in the user's transactions document
      const transactionsRef = doc(db, "transactions", userId);
      const transactionsSnap = await getDoc(transactionsRef);

      if (transactionsSnap.exists()) {
         // Add a new transaction to the transactions array
         await updateDoc(transactionsRef, {
            transactions: arrayUnion({
               amount,
               type: "debit",
               date: new Date(),
               reference,
               transId: reference,
               status: "success",
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
                  type: "debit",
                  date: new Date(),
                  reference,
                  transId: reference,
                  status: "success",
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
               message: `Your wallet has been debited with ${formatToNaira(amount)}`,
               type: "wallet_debit",
               date: new Date(),
               read: false,
               firstName,
               lastName,
               email,
            }),
         });
      } else {
         // Create a new notifications document with the initial notification
         await setDoc(notificationsRef, {
            userId,
            notifications: [
               {
                  message: `Your wallet has been debited with ${formatToNaira(amount)}`,
                  type: "wallet_debit",
                  date: new Date(),
                  read: false,
                  firstName,
                  lastName,
                  email,
               },
            ],
         });
      }

      return NextResponse.json({ success: true, data: "Payment processed successfully" });
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
