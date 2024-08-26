import WithRouteDisplay from "@/components/shared/with-route-display";
import { Text } from "@/components/ui/text";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
   title: "Privacy Policy | My Food Angels",
   description: "Privacy Policy for My Food Angels Facebook App and Fan Page",
   applicationName: "My Food Angels",
   keywords: ["Privacy Policy", "Facebook App", "Fan Page", "My Food Angels"],
   openGraph: {
      title: "Privacy Policy | My Food Angels",
      description: "Privacy Policy for My Food Angels Facebook App and Fan Page",
   },
};

function FBPolicyPage() {
   return (
      <div className="mt-10 md:mt-0">
         <WithRouteDisplay route="Privacy Policy" extraChildrenClassname="pb-8">
            <Text className="font-semibold leading-[110%] md:text-[0.5rem] lg:text-[1rem]">
               FB Policy
            </Text>
         </WithRouteDisplay>
         <div className="container p-container-base pt-8  md:p-container-lg">
            <Text className="text-base leading-relaxed">
               <strong>Introduction</strong>
               <br />
               My Food Angels (“we,” “us,” “our”) takes its users (“user”, “you,” “your”) privacy
               seriously. This Privacy Policy is designed to let you know what information we
               collect through our Facebook App and/or Fan Page.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               We collect information in accordance with this Privacy Policy, and this Privacy
               Policy only applies to our information collection practices on Facebook. We intend to
               comply with the requirements outlined by Facebook as it pertains to Developers as
               outlined here{" "}
               <a
                  href="https://developers.facebook.com/policy/"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  https://developers.facebook.com/policy/
               </a>
               .
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               As required by Facebook’s Privacy Policy, we have to let you know that we do not sell
               your data. However, if we are acquired or merged, we may transfer this data. You may
               request the removal of your data at any time by contacting us via email, but we ask
               that you give us a reasonable amount of time to fulfill this request once it is made.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               By using our Application and/or Page, you agree that you are granting us the right to
               use, copy, display, distribute, deliver, render, and publicly perform any content
               that you provide to us. The use of our Application and/or Page is also prohibited in
               certain countries, specifically those that have blocked the use of Facebook or where
               your use or our content would be prohibited.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Type of Information We Automatically Collect from Users:</strong>
               <br />
               The information we collect depends on the information you allow others to view on
               your Facebook profile. However, we will collect at least the following information
               about you:
               <ul className="ml-6 mt-2 list-disc">
                  <li>Name</li>
                  <li>Email</li>
                  <li>Gender</li>
                  <li>Birthday</li>
                  <li>Current City</li>
                  <li>Your profile picture</li>
                  <li>IP Address</li>
                  <li>Browser Type</li>
                  <li>Interactions with our App or Facebook Page</li>
               </ul>
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>
                  Type of Information We Might Collect if You Have Authorized Us to Collect:
               </strong>
               <br />
               As we said before, we may collect more information depending on whether you have
               allowed us to collect it based on your user settings. This includes:
               <ul className="ml-6 mt-2 list-disc">
                  <li>Networks</li>
                  <li>Friends List</li>
                  <li>Pages</li>
                  <li>Interests</li>
                  <li>Information about how you interact with your friends</li>
                  <li>Profile information</li>
                  <li>Posts you have “liked”</li>
                  <li>Contact information</li>
                  <li>Status Updates</li>
                  <li>Calendar of Events</li>
                  <li>Whether or not you are online</li>
                  <li>“Check-ins” and friends that have checked you in</li>
                  <li>Posts or pictures you are tagged in</li>
               </ul>
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>How We Use Your Information:</strong>
               <br />
               <strong>Application Partners and Third Party Service Providers:</strong> We may share
               your information with third parties we have partnered with specifically for our
               Application and/or Fan Page. In addition, we may hire outside companies or third
               parties to help us manage, create, or maintain our Application and/or Fan Page. These
               parties are contractually obligated to keep your information confidential, and they
               will only have access to information that is needed to perform their job.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Other Users:</strong> If you have given us permission, and if one of the
               functions of our Application and/or Fan Page is to allow you to interact with others,
               you are granting us the ability to share certain information with other users.
               However, we only share this information if you have allowed us to and if it is
               allowed by Facebook. We may also analyze how you interact with other users and then
               aggregate this information, in an anonymized form, to allow us to see how you use our
               Application and/or Page.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Legal Uses:</strong> We may disclose your information if required by a
               subpoena, through any legal process, to comply with any law or regulation, or by
               request of any law enforcement agency. We may also disclose your information if we
               reasonably believe it is necessary to prevent harm or injury or loss, in any way, to
               us or any third party.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Business Acquisition or Merger:</strong> If we are acquired or sell our
               business, we may transfer your information. You may contact us in the event this
               happens if you have any concerns with the transfer of your data.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Controlling Your Data:</strong> You may request that we delete any data about
               you at any time. Unless you do so, however, we may retain your data until you ask us
               to delete it, even if we discontinue the Application and/or Page. You may also stop
               us from collecting information about you if you uninstall our App or remove yourself
               from our Page or if your account is deleted. We may provide you with the ability to
               review, correct, or delete your information.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Other Disclosures and Assurances:</strong> We DO NOT sell/transfer/give
               information about your use of Facebook to third parties unless authorized in this
               Agreement. We use reasonable safeguards and protections to protect your data. We may
               have servers located in different jurisdictions, so you are consenting to the
               transfer of this information from your residence to our servers.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               We do not allow users under 13 to use our Application or Fan Page and will delete
               anyone we suspect is underage. We may update this Privacy Policy as needed. If we do,
               we will post a notice here of the changes and when this Policy was last updated.
            </Text>
         </div>
      </div>
   );
}

export default FBPolicyPage;
