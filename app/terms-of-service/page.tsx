import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Savant Chat, the AI-based code auditing service operated by Novel Codes DMCC.",
  alternates: { canonical: "/terms-of-service/" },
};

export default function Page() {
  return (
    <div className="container-max py-12">
      <article className="prose-savant">
        <h1>Terms of Service</h1>

        <h2>Introduction</h2>
        <p>
          <strong>Novel Codes DMCC</strong> maintains the https://savant.chat/ Website
          (&quot;Site&quot;). United Arab of Emirates is our country of domicile. By using our
          services, you agree to these Terms of Service.
        </p>

        <h2>Experimental Beta Service (Provided &quot;AS IS&quot;)</h2>
        <p>
          <strong>Savant Chat</strong> is an <strong>experimental</strong> AI-based code auditing
          service provided on an &quot;as is&quot; and &quot;as available&quot; basis,{" "}
          <strong>without any warranties</strong> or guarantees of performance. We make{" "}
          <strong>no promise</strong> that the service will be uninterrupted or error-free. Given its
          beta and AI-driven nature, the service may <strong>fail</strong>, experience{" "}
          <strong>downtime</strong>, or be subject to <strong>DoS attacks</strong> or other
          disruptions. <strong>You assume full responsibility</strong> for using the service under
          these conditions.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, <strong>Novel Codes DMCC</strong> (the
          &quot;Company&quot;) shall <strong>not be liable</strong> for any financial or other losses
          arising from your use of, or inability to use, the audit results. This includes, but is not
          limited to, <strong>lost profits, lost revenues, lost or corrupted data</strong>, security
          breaches, or any other direct or indirect damages. Even if potential damages were
          foreseeable or the Company was advised of them, <strong>no liability</strong> will be
          accepted. You acknowledge that you use the audit outputs <strong>at your own risk</strong>{" "}
          and you are solely responsible for any actions you take based on those outputs.
        </p>

        <h2>AI Report Accuracy and User Verification</h2>
        <p>
          <strong>AI-generated audit reports</strong> provided by Savant Chat may contain{" "}
          <strong>false positives</strong> (flagging issues that are not actually problems) or may{" "}
          <strong>miss critical errors</strong> and vulnerabilities. The Company{" "}
          <strong>does not guarantee</strong> the accuracy, completeness, or reliability of the
          AI&apos;s findings. <strong>Users must verify</strong> and validate the audit report
          information themselves{" "}
          <strong>before taking any corrective or security actions</strong>.
        </p>

        <h2>No Sensitive Data in Submissions</h2>
        <p>
          Users <strong>must not include sensitive data</strong> when submitting code for audit.{" "}
          <strong>
            Do not upload or share any personal data, secrets, API keys, passwords, private
            credentials, or other confidential information
          </strong>{" "}
          in your code or related submission materials.
        </p>

        <h2>Use of Third-Party AI Providers</h2>
        <p>
          Savant Chat leverages external AI infrastructure to provide its code auditing
          functionality. By using Savant Chat, you give permission and consent for your code to be
          transmitted to and processed by these external AI engines as sub-processors on behalf of
          our service.
        </p>

        <h2>User&apos;s Rights to Submit Code</h2>
        <p>
          By submitting any code or content to Savant Chat for analysis, you{" "}
          <strong>represent and warrant</strong> that you have all necessary{" "}
          <strong>rights, licenses, and permissions</strong> to do so.
        </p>

        <h2>Lawful Use and Responsible Disclosure</h2>
        <p>
          You agree{" "}
          <strong>not to use the audit reports for any illegal or unauthorized activities</strong>.
          This service is intended to help developers improve software security and code quality; it
          must <strong>not be used</strong> to plan or execute hacking, exploitation of
          vulnerabilities, or any form of cyberattack.
        </p>

        <h2>Restricted Countries and Export Compliance</h2>
        <p>
          Savant Chat is{" "}
          <strong>
            not intended for use by individuals or entities in countries that are subject to trade
            sanctions, embargoes, or other restrictive measures
          </strong>{" "}
          under United Arab Emirates law, United States law, or other applicable international
          regulations. We will not trade with or provide any services to OFAC and sanctioned
          countries.
        </p>

        <h2>User Accounts and Responsibilities</h2>
        <p>
          User is responsible for maintaining the confidentiality of his account. Customer using the
          website who are Minor /under the age of 18 shall not register as a User of the website and
          shall not transact on or use the website.
        </p>

        <h2>Payment Terms</h2>
        <p>
          Visa or MasterCard debit and credit cards in AED will be accepted for payment. The
          displayed price and currency at the checkout page, will be the same price and currency
          printed on the Transaction Receipt and the amount charged to the card will be shown in your
          card currency. Cardholder must retain a copy of transaction records and
          https://savant.chat/pricing policies and rules. Once the payment is made, the confirmation
          notice will be sent to the client via email within 24 hours of receipt.
        </p>

        <h2>Changes to Terms of Service</h2>
        <p>
          The Company reserves the right to{" "}
          <strong>modify or update these Terms of Service</strong> at any time. Changes may be made
          for reasons including accommodating new features, legal requirements, or operational
          adjustments.
        </p>

        <h2>Governing Law and Jurisdiction</h2>
        <p>
          These Terms of Service and any dispute or claim arising from your use of Savant Chat are
          governed by the <strong>laws of the United Arab Emirates</strong>. Any purchase, dispute or
          claim arising out of or in connection with this website shall be governed and construed in
          accordance with the laws of UAE.
        </p>

        <h2>Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:hello@savant.chat">hello@savant.chat</a>.
        </p>
      </article>
    </div>
  );
}
