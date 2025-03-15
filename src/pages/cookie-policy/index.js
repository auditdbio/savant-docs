import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function CookiePolicy() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Cookie Policy"
      description="Cookie Policy for Savant Chat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
            <p className="mb-4">Cookies are small text files that a website places on your device to store information about your session or preferences. There are different types of cookies: some are <strong>essential</strong> for a site's functionality, while others are used for analytics, advertising, or other purposes.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Use of Cookies</h2>
            <p className="mb-4">On the Savant Chat website, we <strong>only use essential cookies</strong> required for the service to function properly. In practice, this means we primarily use a <strong>session cookie</strong> to manage your login session (so that after you log in, you stay logged in as you navigate the site).</p>
            <p className="mb-4">We do <strong>not</strong> use any cookies for advertising, third-party tracking, or profiling purposes. There are <strong>no analytics or marketing cookies</strong> employed that would track your behavior across other sites or services.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
            <h3 className="text-xl font-semibold mb-2">Session Cookies (Essential)</h3>
            <p className="mb-4">When you log into Savant Chat, a secure session cookie is set on your browser. This cookie contains a unique identifier (a random token) that ties your browser to your logged-in session on our server. It allows you to navigate the service without having to log in on every page.</p>
            
            <h3 className="text-xl font-semibold mb-2">No Third-Party Cookies</h3>
            <p className="mb-4">We do not embed any third-party analytics services or social media plugins that set cookies on your device through our site.</p>
            
            <h3 className="text-xl font-semibold mb-2">No Tracking Cookies</h3>
            <p className="mb-4">Because we do not use advertising or analytics cookies, you can rest assured that Savant Chat is <strong>not tracking your activities</strong> beyond our site.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Consent</h2>
            <p className="mb-4">By using the Savant Chat website and service, you <strong>consent to the placement of the essential session cookie</strong> on your device. If you do not agree to the use of this cookie, unfortunately you will not be able to use the core functionality of the service (since it is needed for login).</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="mb-4">Because we only use essential cookies, there is no cookie banner or complex cookie settings on our site – the minimal cookies we use are considered necessary and thus are in use by default.</p>
            <p className="mb-4">If you still wish to control or delete cookies, you can do so through your browser settings. Most web browsers allow you to view, block, or delete cookies:</p>
            <ul className="list-disc pl-8 mb-4">
              <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data</li>
              <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Manage and delete cookies</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Updates to Cookie Policy</h2>
            <p className="mb-4">If our use of cookies changes in the future (for example, if we introduce analytics to help improve our service, or any new functionality that involves cookies), we will update this Cookie Policy accordingly and notify users of the change.</p>
          </section>
          
          <section>
            <p className="mb-4">For any questions about our Cookie Policy, you can contact us at <a href="mailto:hello@savant.chat" className="text-secondary hover:text-secondary-hover">hello@savant.chat</a></p>
          </section>
        </div>
      </div>
    </Layout>
  );
} 
