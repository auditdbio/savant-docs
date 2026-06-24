import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for Savant Chat, explaining how we use only essential cookies required for the service to function properly.",
  alternates: { canonical: "/cookie-policy/" },
};

export default function Page() {
  return (
    <div className="container-max py-12">
      <article className="prose-savant">
        <h1>Cookie Policy</h1>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that a website places on your device to store information
          about your session or preferences. There are different types of cookies: some are{" "}
          <strong>essential</strong> for a site&apos;s functionality, while others are used for
          analytics, advertising, or other purposes.
        </p>

        <h2>Our Use of Cookies</h2>
        <p>
          On the Savant Chat website, we <strong>only use essential cookies</strong> required for the
          service to function properly. In practice, this means we primarily use a{" "}
          <strong>session cookie</strong> to manage your login session (so that after you log in, you
          stay logged in as you navigate the site).
        </p>
        <p>
          We do <strong>not</strong> use any cookies for advertising, third-party tracking, or
          profiling purposes. There are <strong>no analytics or marketing cookies</strong> employed
          that would track your behavior across other sites or services.
        </p>

        <h2>Types of Cookies We Use</h2>
        <h3>Session Cookies (Essential)</h3>
        <p>
          When you log into Savant Chat, a secure session cookie is set on your browser. This cookie
          contains a unique identifier (a random token) that ties your browser to your logged-in
          session on our server. It allows you to navigate the service without having to log in on
          every page.
        </p>

        <h3>No Third-Party Cookies</h3>
        <p>
          We do not embed any third-party analytics services or social media plugins that set cookies
          on your device through our site.
        </p>

        <h3>No Tracking Cookies</h3>
        <p>
          Because we do not use advertising or analytics cookies, you can rest assured that Savant
          Chat is <strong>not tracking your activities</strong> beyond our site.
        </p>

        <h2>Your Consent</h2>
        <p>
          By using the Savant Chat website and service, you{" "}
          <strong>consent to the placement of the essential session cookie</strong> on your device.
          If you do not agree to the use of this cookie, unfortunately you will not be able to use the
          core functionality of the service (since it is needed for login).
        </p>

        <h2>Managing Cookies</h2>
        <p>
          Because we only use essential cookies, there is no cookie banner or complex cookie settings
          on our site – the minimal cookies we use are considered necessary and thus are in use by
          default.
        </p>
        <p>
          If you still wish to control or delete cookies, you can do so through your browser settings.
          Most web browsers allow you to view, block, or delete cookies:
        </p>
        <ul>
          <li>
            <strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site
            data
          </li>
          <li>
            <strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data
          </li>
          <li>
            <strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data
          </li>
          <li>
            <strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Manage and delete
            cookies
          </li>
        </ul>

        <h2>Updates to Cookie Policy</h2>
        <p>
          If our use of cookies changes in the future (for example, if we introduce analytics to help
          improve our service, or any new functionality that involves cookies), we will update this
          Cookie Policy accordingly and notify users of the change.
        </p>

        <p>
          For any questions about our Cookie Policy, you can contact us at{" "}
          <a href="mailto:hello@savant.chat">hello@savant.chat</a>
        </p>
      </article>
    </div>
  );
}
