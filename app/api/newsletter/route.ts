import axios, { AxiosInstance } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const dc = "us17";
const apikey = "abb503465dfd1a850eb5f161fc34491d-us17";
const listId = "7a3fe898a1";
const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;
const authString = Buffer.from(`anystring:${apikey}`).toString("base64");
const config = {
   headers: {
      Authorization: `Basic ${authString}`,
   },
};
export async function POST(req: Request, res: NextApiResponse) {
   const data = await req.json();
   const email = data.email;
   const name = data.name;
   const subscriberData = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
         FNAME: name,
      },
   };

   try {
      const response = await axios.post(url, subscriberData, config);
      console.log(response.data);
      return NextResponse.json({ success: true, data: "Success" });
   } catch (error: any) {
      if (error.response) {
         // Request made and server responded
         console.error("Error 1:", error.response.status, error.response.data);
      } else if (error.request) {
         // Request made but no response received
         console.error("Error 2:", error.request);
      } else {
         // Something else happened
         console.error("Error 2:", error.message);
      }
      return NextResponse.json({
         success: false,
         error: error.message,
         status: error.response.status,
      });
   }
}
