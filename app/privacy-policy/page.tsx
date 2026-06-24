import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy describing what information Savant Chat collects, how it is used, and what rights you have regarding your data when using our AI-based code auditing service.",
  alternates: { canonical: "/privacy-policy/" },
};

export default function Page() {
  return (
    <div className="container-max py-12">
      <article className="prose-savant">
        <h1>Privacy Policy</h1>

        <p>Last Updated: April 8, 2025</p>

        <p>
          Your privacy is important to us. This Privacy Policy describes what information{" "}
          <strong>Savant Chat</strong> collects, how it is used, and what rights you have regarding
          your data when using our AI-based code auditing service.
        </p>

        <h2>Minimal Use of Cookies</h2>
        <p>
          Savant Chat does <strong>not use any tracking or advertising cookies</strong> on its
          website. We only utilize cookies that are <strong>strictly necessary</strong> for the
          operation of the service – for example, a session cookie to keep you logged in during your
          visit and maintain your authentication session.
        </p>

        <h2>Anonymized Analytics Data</h2>
        <p>
          We may collect <strong>anonymized, aggregate usage data</strong> to help us improve the
          user experience and performance of Savant Chat. This could include metrics such as the
          number of audits performed, general usage patterns, error logs, and other statistical
          information.
        </p>

        <h2>User-Submitted Code and Data Handling</h2>
        <p>
          When you submit code to Savant Chat for auditing, the code (and any associated information
          you provide) is used <strong>only for the purpose of generating the audit report</strong>.
          We <strong>do not store</strong> your uploaded code or project files beyond the period
          necessary to process your request and deliver the results.
        </p>

        <h2>Personal Information and Account Data</h2>
        <p>
          To use Savant Chat, you may need to create an account or provide basic information (such as
          an email address for login). Any <strong>personal information</strong> you provide during
          registration or account use is used only for{" "}
          <strong>account management, authentication, and customer support</strong> purposes.
        </p>
        <p>
          All credit/debit cards&apos; details and personally identifiable information will NOT be
          stored, sold, shared, rented or leased to any third parties. https://savant.chat/ will not
          pass any debit/credit card details to third parties.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement <strong>reasonable security measures</strong> (administrative, technical, and
          physical) designed to protect your information from unauthorized access or disclosure.
        </p>
        <p>
          https://savant.chat/ takes appropriate steps to ensure data privacy and security including
          through various hardware and software methodologies. However, https://savant.chat/
          (website) cannot guarantee the security of any information that is disclosed online.
        </p>

        <h2>Data Retention and Deletion</h2>
        <p>
          <strong>Storage Duration:</strong> We retain personal account information (like your email
          and profile info) for as long as your account is active or as needed to provide you
          services. Anonymized analytics data may be retained indefinitely since it has no personal
          identifiers.
        </p>

        <h2>International Data Transfers</h2>
        <p>
          Savant Chat operates primarily from the United Arab Emirates. If you are using the service
          from outside the UAE, be aware that your data may be transferred to and processed on
          servers in the UAE or in other countries where our affiliated companies or service
          providers are located.
        </p>

        <h2>Third-Party Websites</h2>
        <p>
          https://savant.chat/ is not responsible for the privacy policies of websites to which it
          links. If you provide any information to such third parties different rules regarding the
          collection and use of your personal information may apply. You should contact these
          entities directly if you have any questions about their use of the information that they
          collect.
        </p>

        <h2>Compliance and Children&apos;s Privacy</h2>
        <p>
          Savant Chat is intended for use by professionals and individuals over the age of 18. We do
          not knowingly collect personal information from children under 13 (or under the age of
          consent applicable in your jurisdiction).
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or
          for other operational, legal, or regulatory reasons.
        </p>
        <p>
          The Website Policies and Terms &amp; Conditions may be changed or updated occasionally to
          meet the requirements and standards. Therefore, the Customers&apos; are encouraged to
          frequently visit these sections to be updated about the changes on the website.
          Modifications will be effective on the day they are posted.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or how your
          data is handled, please contact us at:{" "}
          <a href="mailto:hello@savant.chat">hello@savant.chat</a>
        </p>
      </article>
    </div>
  );
}
