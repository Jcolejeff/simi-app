import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { formatToNaira } from "@/lib/utils";

export async function POST(req: Request, res: NextApiResponse) {
   try {
      const data = await req.json();
      const { email, lastName, firstName, userId, name } = data;

      // Check user document in referrals collection
      const referralRef = doc(db, "referrals", userId);
      const referralSnap = await getDoc(referralRef);

      if (!referralSnap.exists() || referralSnap.data().points <= 0) {
         return NextResponse.json(
            { success: false, data: "No points available or user does not exist in referrals" },
            { status: 400, statusText: "Bad Request" },
         );
      }

      const points = referralSnap.data().points;

      // Check or create user document in wallets collection
      const walletRef = doc(db, "wallets", userId);
      const walletSnap = await getDoc(walletRef);

      let newBalance = points;
      let totalDeposit = points;
      if (walletSnap.exists()) {
         newBalance += walletSnap.data().balance;
         totalDeposit += walletSnap.data().totalDeposit || 0;
      } else {
         await setDoc(walletRef, {
            userId,
            email,
            name: `${firstName || "user"} ${lastName || "user"}`,
            balance: points,
            totalDeposit: points,
            totalSpent: 0,
         });
      }

      // If wallet exists, update wallet balance and totalDeposit
      if (walletSnap.exists()) {
         await updateDoc(walletRef, {
            balance: newBalance,
            totalDeposit,
         });
      }

      // Reset points in referral document
      await updateDoc(referralRef, {
         points: 0,
      });

      // Create a new transaction
      const transactionsRef = doc(db, "transactions", userId);
      const transactionsSnap = await getDoc(transactionsRef);

      const transactionData = {
         type: "credit",
         date: new Date(),
         amount: points,
         status: "success",
         firstName: firstName || "User",
         lastName: lastName || "User",
         email,
      };

      if (transactionsSnap.exists()) {
         // Add a new transaction to the transactions array
         await updateDoc(transactionsRef, {
            transactions: arrayUnion(transactionData),
         });
      } else {
         // Create a new transactions document with the initial transaction
         await setDoc(transactionsRef, {
            userId,
            transactions: [transactionData],
         });
      }

      // Create a new notification
      const notificationsRef = doc(db, "notifications", userId);
      const notificationsSnap = await getDoc(notificationsRef);

      const notificationData = {
         message: `You have successfully redeemed ${formatToNaira(points)} to your wallet balance`,
         type: "wallet_credit",
         date: new Date(),
         read: false,
         firstName,
         lastName,
         email,
      };

      if (notificationsSnap.exists()) {
         // Add a new notification to the notifications array
         await updateDoc(notificationsRef, {
            notifications: arrayUnion(notificationData),
         });
      } else {
         // Create a new notifications document with the initial notification
         await setDoc(notificationsRef, {
            userId,
            notifications: [notificationData],
         });
      }

      return NextResponse.json({ success: true, data: "Points redeemed successfully" });
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
