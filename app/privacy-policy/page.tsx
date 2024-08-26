import WithRouteDisplay from "@/components/shared/with-route-display";
import { Text } from "@/components/ui/text";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
   title: "Privacy Policy | My Food Angels",
   description:
      "Privacy Policy for My Food Angels, detailing how we collect, use, and protect your information.",
   applicationName: "My Food Angels",
   keywords: ["Privacy Policy", "My Food Angels", "Data Protection"],
   openGraph: {
      title: "Privacy Policy | My Food Angels",
      description:
         "Privacy Policy for My Food Angels, detailing how we collect, use, and protect your information.",
   },
};

function PrivacyPolicyPage() {
   return (
      <div className="mt-10 md:mt-0">
         <WithRouteDisplay route="Privacy Policy" extraChildrenClassname="pb-8">
            <Text className="font-semibold leading-[110%] md:text-[0.5rem] lg:text-[1rem]">
               Privacy Policy
            </Text>
         </WithRouteDisplay>
         <div className="container p-container-base pt-8  md:p-container-lg">
            <Text className="text-base leading-relaxed">
               <strong>Effective Date – June 10, 2022</strong>
               <br />
               Welcome to MYFOODANGELS.COM (the “Site”). We understand that privacy online is
               important to users of our Site, especially when conducting business. This statement
               governs our privacy policies with respect to those users of the Site (“Visitors”) who
               visit without transacting business and Visitors who register to transact business on
               the Site and make use of the various services offered by My Food Angels
               (collectively, “Services”) (“Authorized Customers”).
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Personally Identifiable Information</strong>
               <br />
               “Personally Identifiable Information” refers to any information that identifies or
               can be used to identify, contact, or locate the person to whom such information
               pertains, including, but not limited to, name, address, phone number, fax number,
               email address, financial profiles, social security number, and credit card
               information. Personally Identifiable Information does not include information that is
               collected anonymously (that is, without identification of the individual user) or
               demographic information not connected to an identified individual.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>What Personally Identifiable Information Is Collected?</strong>
               <br />
               We may collect basic user profile information from all of our Visitors. For
               Authorized Customers, we collect names, addresses, phone numbers, email addresses,
               the nature and size of the business, and the nature and size of the advertising
               inventory intended to purchase or sell.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>What Organizations Are Collecting the Information?</strong>
               <br />
               In addition to our direct collection of information, third-party service vendors
               (such as credit card companies, clearinghouses, and banks) may collect this
               information. We do not control how these third parties use such information, but we
               ask them to disclose their use of personal information provided by Visitors and
               Authorized Customers.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>How Does the Site Use Personally Identifiable Information?</strong>
               <br />
               We use Personally Identifiable Information to customize the Site, make appropriate
               service offerings, and fulfill buying and selling requests. We may also use it to
               contact Visitors and Authorized Customers about research, purchase, and selling
               opportunities or to respond to inquiries.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>With Whom May the Information Be Shared?</strong>
               <br />
               Personally Identifiable Information about Authorized Customers may be shared with
               other Authorized Customers for evaluating transactions. We may share aggregated
               information about our Visitors with affiliated agencies and third-party vendors. You
               can opt-out of receiving unsolicited information from us or our partners.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>How Is Personally Identifiable Information Stored?</strong>
               <br />
               Personally Identifiable Information collected by My Food Angels is securely stored
               and is not accessible to third parties or unauthorized employees.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>
                  What Choices Are Available to Visitors Regarding Collection, Use, and Distribution
                  of the Information?
               </strong>
               <br />
               Visitors and Authorized Customers may opt-out of receiving unsolicited information by
               responding to emails or contacting us at info@myfoodangels.com.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Cookies</strong>
               <br />A cookie is a string of information stored on a visitor’s computer, which the
               browser provides to the website each time the visitor returns. We use cookies for
               various reasons including obtaining information about Visitor preferences and
               ensuring security. If you prefer not to have cookies, you should set your browser to
               refuse cookies, but note that some features of the Site may not function properly.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Cookies Used by Our Service Providers</strong>
               <br />
               Our service providers may also use cookies, and you can find more details about these
               cookies in our cookies info page.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>How Does MY FOOD ANGELS Use Login Information?</strong>
               <br />
               We use login information, such as IP addresses and browser types, to analyze trends,
               administer the Site, and gather demographic information.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>
                  What Partners or Service Providers Have Access to Personally Identifiable
                  Information?
               </strong>
               <br />
               My Food Angels partners with vendors who may have access to Personally Identifiable
               Information on a need-to-know basis. Our privacy policy does not cover their
               collection or use of this information.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>How Does the Site Keep Personally Identifiable Information Secure?</strong>
               <br />
               We maintain strict security measures including password protection and encryption
               protocols. While we strive to protect the information, we cannot guarantee that
               breaches will not occur.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>
                  How Can Visitors Correct Any Inaccuracies in Personally Identifiable Information?
               </strong>
               <br />
               Visitors and Authorized Customers can contact us at info@myfoodangels.com to update
               or correct inaccuracies in Personally Identifiable Information.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>
                  Can a Visitor Delete or Deactivate Personally Identifiable Information Collected
                  by the Site?
               </strong>
               <br />
               We offer mechanisms to delete or deactivate Personally Identifiable Information, but
               some residual information may remain due to backups.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Your Rights</strong>
               <br />
               Under data protection law, you have rights including the right to access,
               rectification, erasure, restriction of processing, objection to processing, data
               portability, complaint to a supervisory authority, and withdrawal of consent.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>What Happens if the Privacy Policy Changes?</strong>
               <br />
               We will inform Visitors and Authorized Customers of any changes to our privacy policy
               by posting updates on the Site. If changes affect information previously requested
               not to be disclosed, we will notify affected individuals.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Links</strong>
               <br />
               MYFOODANGELS.COM may contain links to other websites. We encourage you to read the
               privacy statements of these linked sites as their policies may differ from ours.
            </Text>
         </div>
      </div>
   );
}

export default PrivacyPolicyPage;
