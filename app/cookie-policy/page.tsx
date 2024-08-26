import WithRouteDisplay from "@/components/shared/with-route-display";
import { Text } from "@/components/ui/text";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
   title: "Cookies Policy | My Food Angels",
   description: "Cookies Policy | My Food Angels",
   applicationName: "My Food Angels",
   keywords: ["Cookies Policy", "My Food Angels"],
   openGraph: {
      title: "Cookies Policy | My Food Angels",
      description: "Cookies Policy | My Food Angels",
   },
};

function CookiesPolicyPage() {
   return (
      <div className="mt-10 md:mt-0">
         <WithRouteDisplay route="Cookies Policy" extraChildrenClassname="pb-8">
            <Text className="font-semibold leading-[110%] md:text-[0.5rem] lg:text-[1rem]">
               Cookies Policy
            </Text>
         </WithRouteDisplay>
         <div className="container p-container-base pt-8  md:p-container-lg">
            <Text className="text-base leading-relaxed">
               <strong>Introduction</strong>
               <br />
               My Food Angels (“us”, “we”, or “our”) uses cookies on our website MYFOODANGELS.COM
               (the “Service”). By using the Service, you consent to the use of cookies as described
               in this Cookies Policy. This Policy explains what cookies are, how we use them, how
               third-parties we may partner with use them, your choices regarding cookies, and
               further information about cookies.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>What Are Cookies</strong>
               <br />
               Cookies are small pieces of text sent by your web browser by a website you visit. A
               cookie file is stored in your web browser and allows the Service or a third-party to
               recognize you and make your next visit easier and the Service more useful to you.
               Cookies can be “persistent” or “session” cookies.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>How MYFOODANGELS.COM Uses Cookies</strong>
               <br />
               When you use and access the Service, we may place several cookies files in your web
               browser. We use cookies for the following purposes:
               <ul className="mt-2 list-inside list-disc">
                  <li>
                     <strong>Strictly Necessary Cookies:</strong> These cookies are essential for
                     the Service to function and enable you to use the features of the Service.
                     Without these cookies, we cannot provide the requested services. We use these
                     cookies to:
                     <ul className="mt-2 list-inside list-disc">
                        <li>
                           Identify you as being logged in to the MYFOODANGELS.COM and to
                           authenticate you.
                        </li>
                        <li>
                           Ensure you connect to the right service on the MYFOODANGELS.COM when we
                           make any changes to the way it works.
                        </li>
                     </ul>
                  </li>
                  <li>
                     <strong>Performance Cookies:</strong> These cookies collect information about
                     how you use MYFOODANGELS.COM, such as which pages you visit and if you
                     experience any errors. These cookies help us improve the Service and understand
                     user interests. We use performance cookies to:
                     <ul className="mt-2 list-inside list-disc">
                        <li>
                           Carry out web analytics and provide statistics on how MYFOODANGELS.COM is
                           used.
                        </li>
                        <li>
                           Perform affiliate tracking and provide feedback to affiliated entities.
                        </li>
                        <li>
                           Obtain data on the number of users of MYFOODANGELS.COM who have viewed a
                           product or service.
                        </li>
                        <li>
                           Help us improve MYFOODANGELS.COM by measuring any errors that occur and
                           testing different designs.
                        </li>
                     </ul>
                  </li>
                  <li>
                     <strong>Functionality Cookies:</strong> These cookies are used to remember your
                     settings and preferences to enhance your visit. We use functionality cookies
                     to:
                     <ul className="mt-2 list-inside list-disc">
                        <li>
                           Remember settings you’ve applied such as layout, text size, preferences,
                           and colors.
                        </li>
                        <li>Remember if we’ve already asked you to fill in a survey.</li>
                        <li>Show you when you’re logged in to MYFOODANGELS.COM.</li>
                        <li>Provide and show embedded video content.</li>
                     </ul>
                  </li>
                  <li>
                     <strong>Targeting Cookies:</strong> These cookies track your visit to
                     MYFOODANGELS.COM and other websites, apps, and online services, including the
                     pages you have visited and the links you have followed. We may use targeting
                     cookies to:
                     <ul className="mt-2 list-inside list-disc">
                        <li>Display targeted ads within MYFOODANGELS.COM.</li>
                        <li>
                           Improve how we deliver personalized ads and content, and measure the
                           success of ad campaigns.
                        </li>
                     </ul>
                  </li>
               </ul>
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Third-Party Cookies</strong>
               <br />
               In addition to our own cookies, we may also use various third-party cookies to report
               usage statistics of the Service, deliver advertisements on and through the Service,
               and more.
            </Text>
            <Text className="mt-4 text-base leading-relaxed">
               <strong>Your Choices Regarding Cookies</strong>
               <br />
               If you’d like to delete cookies or instruct your web browser to delete or refuse
               cookies, please visit the help pages of your web browser. Please note, however, that
               if you delete cookies or refuse to accept them, you might not be able to use all of
               the features we offer, you may not be able to store your preferences, and some of our
               pages might not display properly.
            </Text>
         </div>
      </div>
   );
}

export default CookiesPolicyPage;
