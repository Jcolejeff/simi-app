import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/firebase";
import {
   getDoc,
   doc,
   setDoc,
   updateDoc,
   arrayUnion,
   collection,
   query,
   where,
   getDocs,
} from "firebase/firestore";
import { formatToNaira } from "@/lib/utils";

export async function POST(req: Request, res: NextApiResponse) {
   try {
      const { userId, couponCode, orderTotal } = await req.json();

      // Query to find the coupon by its code
      const couponQuery = query(collection(db, "couponCodes"), where("code", "==", couponCode));
      const couponQuerySnapshot = await getDocs(couponQuery);

      if (couponQuerySnapshot.empty) {
         return NextResponse.json({ success: false, message: "Coupon not found" }, { status: 404 });
      }

      const couponDoc = couponQuerySnapshot.docs[0];
      const coupon = couponDoc.data();

      // Check if the coupon is active and not expired
      if (!coupon.isActive || coupon.expirationDate.toDate() < new Date()) {
         return NextResponse.json(
            { success: false, message: "Coupon is not valid" },
            { status: 400 },
         );
      }

      // Check if the order total meets the minimum spend
      if (orderTotal < coupon.minSpend) {
         return NextResponse.json(
            { success: false, message: `Minimum spend of ${coupon.minSpend} is required` },
            { status: 400 },
         );
      }

      // Check if the user has already used the coupon
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
         return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }

      const user = userSnap.data();

      // Initialize usedCoupons array if it doesn't exist
      if (!user.usedCoupons) {
         user.usedCoupons = [];
      }

      if (user.usedCoupons.includes(couponCode)) {
         return NextResponse.json(
            { success: false, message: "Coupon has already been used" },
            { status: 400 },
         );
      }

      // Calculate the discount
      let discount = 0;
      if (coupon.discountType === "percentage") {
         discount = (orderTotal * parseFloat(coupon.discountAmount)) / 100;
      } else if (coupon.discountType === "fixed") {
         discount = parseFloat(coupon.discountAmount);
      }

      // Ensure discount does not exceed the order total
      discount = Math.min(discount, orderTotal);

      // Mark the coupon as used for the user
      await updateDoc(userRef, {
         usedCoupons: arrayUnion(couponCode),
      });

      // Create a new notification
      const notificationsRef = doc(db, "notifications", userId);
      const notificationsSnap = await getDoc(notificationsRef);

      const notificationData = {
         message: `You have successfully used the coupon code ${couponCode} and saved ${formatToNaira(discount)}`,
         type: "coupon_used",
         date: new Date(),
         read: false,
         firstName: user.firstName || "User",
         lastName: user.lastName || "User",
         email: user.email,
      };

      if (notificationsSnap.exists()) {
         await updateDoc(notificationsRef, {
            notifications: arrayUnion(notificationData),
         });
      } else {
         await setDoc(notificationsRef, {
            userId,
            notifications: [notificationData],
         });
      }

      return NextResponse.json({ success: true, discount }, { status: 200 });
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
