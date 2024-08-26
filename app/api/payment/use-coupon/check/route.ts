import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase";
import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
   try {
      const { userId, couponCode, orderTotal } = await req.json();

      // Check if the coupon code exists
      const couponQuery = query(collection(db, "couponCodes"), where("code", "==", couponCode));
      const couponQuerySnapshot = await getDocs(couponQuery);

      if (couponQuerySnapshot.empty) {
         return NextResponse.json({ success: false, message: "Coupon not found" }, { status: 404 });
      }

      const couponDoc = couponQuerySnapshot.docs[0];
      const coupon = couponDoc.data();

      // Check if the user exists
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
         return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }

      const user = userSnap.data();

      // Check if the usedCoupons array exists
      if (!user.usedCoupons) {
         user.usedCoupons = [];
      }

      // Check if the coupon code is in the usedCoupons array
      const couponUsed = user.usedCoupons.includes(couponCode);

      // Calculate the discount
      let discount = 0;
      if (coupon.discountType === "percentage") {
         discount = (orderTotal * parseFloat(coupon.discountAmount)) / 100;
      } else if (coupon.discountType === "fixed") {
         discount = parseFloat(coupon.discountAmount);
      }

      // Ensure discount does not exceed the order total
      discount = Math.min(discount, orderTotal);

      return NextResponse.json({
         success: true,
         used: couponUsed,
         discountAmount: discount,
         discountType: coupon.discountType,
      });
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
