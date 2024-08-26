import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import {
   doc,
   getDoc,
   setDoc,
   collection,
   addDoc,
   updateDoc,
   query,
   where,
   getDocs,
   serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

const checkUserBoughtProduct = async (userId: string, productId: string): Promise<boolean> => {
   try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
         throw new Error("User not found");
      }

      const userData = userSnap.data();
      const productsBought = userData.productsBought || [];

      return productsBought.includes(productId);
   } catch (error) {
      console.error("Error checking if user has bought product:", error);
      return false;
   }
};

export async function POST(req: Request, res: NextApiResponse) {
   try {
      const { userId, productId, text, rating, firstName, lastName, title, image } =
         await req.json();

      // Check if the user has bought the product
      const hasBought = await checkUserBoughtProduct(userId, productId);

      if (!hasBought) {
         return NextResponse.json(
            { success: false, message: "User has not bought this product" },
            { status: 400, statusText: "Bad Request" },
         );
      }

      // Create a new review in the reviews collection
      const reviewData = {
         userId,
         productId,
         text,
         rating,
         firstName,
         lastName,
         title,
         image,
         createdDate: new Date(),
         isApproved: true,
         created_date: serverTimestamp(),
      };

      const reviewsCollectionRef = collection(db, "reviews");
      await addDoc(reviewsCollectionRef, reviewData);

      // Get the product from the products collection
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
         throw new Error("Product not found");
      }

      // Query all reviews for the product to calculate the average rating
      const reviewsQuery = query(reviewsCollectionRef, where("productId", "==", productId));
      const reviewsSnapshot = await getDocs(reviewsQuery);

      let totalRating = 0;
      const totalReviews = reviewsSnapshot.size;

      reviewsSnapshot.forEach((reviewDoc) => {
         const review = reviewDoc.data();
         totalRating += review.rating;
      });

      // Calculate and round the average rating
      const averageRating = totalReviews > 0 ? Math.round(totalRating / totalReviews) : 0;
      // Update the product's rating and ratingCount fields
      await updateDoc(productRef, {
         rating: averageRating,
         ratingCount: totalReviews,
      });

      return NextResponse.json(
         { success: true, message: "Review created successfully and product updated" },
         { status: 201 },
      );
   } catch (error: any) {
      console.error("Error creating review:", error);
      return NextResponse.json(
         {
            success: false,
            message: error.message,
            status: error.response ? error.response.status : 500,
         },
         {
            status: error.response ? error.response.status : 500,
            statusText: error.response ? error.response.statusText : "Internal Server Error",
         },
      );
   }
}
