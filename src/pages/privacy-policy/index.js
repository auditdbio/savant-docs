import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function PrivacyPolicy() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Privacy Policy"
      description="Privacy Policy for Savant Chat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-8">Last Updated: February 16, 2025</p>
          
          <p className="mb-8">Your privacy is important to us. This Privacy Policy describes what information <strong>Savant Chat</strong> collects, how it is used, and what rights you have regarding your data when using our AI-based code auditing service.</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Minimal Use of Cookies</h2>
            <p className="mb-4">Savant Chat does <strong>not use any tracking or advertising cookies</strong> on its website. We only utilize cookies that are <strong>strictly necessary</strong> for the operation of the service – for example, a session cookie to keep you logged in during your visit and maintain your authentication session.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Anonymized Analytics Data</h2>
            <p className="mb-4">We may collect <strong>anonymized, aggregate usage data</strong> to help us improve the user experience and performance of Savant Chat. This could include metrics such as the number of audits performed, general usage patterns, error logs, and other statistical information.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User-Submitted Code and Data Handling</h2>
            <p className="mb-4">When you submit code to Savant Chat for auditing, the code (and any associated information you provide) is used <strong>only for the purpose of generating the audit report</strong>. We <strong>do not store</strong> your uploaded code or project files beyond the period necessary to process your request and deliver the results.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Personal Information and Account Data</h2>
            <p className="mb-4">To use Savant Chat, you may need to create an account or provide basic information (such as an email address for login). Any <strong>personal information</strong> you provide during registration or account use is used only for <strong>account management, authentication, and customer support</strong> purposes.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">We implement <strong>reasonable security measures</strong> (administrative, technical, and physical) designed to protect your information from unauthorized access or disclosure.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Retention and Deletion</h2>
            <p className="mb-4"><strong>Storage Duration:</strong> We retain personal account information (like your email and profile info) for as long as your account is active or as needed to provide you services. Anonymized analytics data may be retained indefinitely since it has no personal identifiers.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
            <p className="mb-4">Savant Chat operates primarily from the United Arab Emirates. If you are using the service from outside the UAE, be aware that your data may be transferred to and processed on servers in the UAE or in other countries where our affiliated companies or service providers are located.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Compliance and Children's Privacy</h2>
            <p className="mb-4">Savant Chat is intended for use by professionals and individuals over the age of 18. We do not knowingly collect personal information from children under 13 (or under the age of consent applicable in your jurisdiction).</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please contact us at: <a href="mailto:hello@savant.chat" className="text-secondary hover:text-secondary-hover">hello@savant.chat</a></p>
          </section>
        </div>
      </div>
    </Layout>
  );
} 
