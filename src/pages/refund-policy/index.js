import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function RefundPolicy() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Refund Policy"
      description="Refund Policy for Savant Chat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
          
          <p className="mb-8">We strive to be fair and transparent with our billing. This Refund Policy outlines the circumstances under which we provide refunds for payments or deposits made for the Savant Chat service.</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Accidental Deposit Refunds</h2>
            <p className="mb-4">If you have <strong>mistakenly deposited funds</strong> into your Savant Chat account (for example, you intended one amount but paid another, or you deposited money into the system by error), you may request a refund of that deposit.</p>
            <p className="mb-4">Refunds for mistaken deposits are only considered when the request is made in a timely manner. Specifically, a refund request must be submitted <strong>within two (2) weeks (14 calendar days) from the date of the original deposit</strong>. Requests made after this period will generally <strong>not be eligible</strong> for a refund.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conditions for Refund Approval</h2>
            <p className="mb-4">In your refund request, please provide details of the mistaken payment, including the date, amount, and reason it is believed to be made in error. We reserve the right to investigate the claim and confirm that the deposit was indeed made by mistake.</p>
            <p className="mb-4">If the deposit was used (fully or partially) to pay for services (e.g., audits) during that two-week period, we may pro-rate or deny the refund accordingly, since services may have already been rendered.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Exclusion of Processing Fees</h2>
            <p className="mb-4">Approved refunds will be processed <strong>minus any third-party payment processing fees</strong> or charges incurred. This means that if our payment processor (such as a credit card gateway or bank) does not return the transaction fee to us, that fee will be deducted from the refunded amount.</p>
            <p className="mb-4">We only refund the <strong>net amount</strong> that we actually received and are able to return. For example, if you deposited $100 and the payment provider's fee was $3, we might only be able to refund $97.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">No Refunds for Completed Services</h2>
            <p className="mb-4">Aside from deposits made in error, <strong>we do not offer refunds for services that have been delivered</strong>. Once an AI audit report or any consulting service is provided to the user, the associated costs and efforts have been expended.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Timeline for Refund Processing</h2>
            <p className="mb-4">If a refund is approved, we will process it as quickly as possible. Please allow some time for the refund to be reflected in your original payment method. Typically, once approved, we will issue the refund within a few business days, but your bank or credit card provider might take an additional 5-10 business days to post the credit to your account.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Method of Refund</h2>
            <p className="mb-4">Refunds will be made using the same payment method which was used for the original deposit whenever possible. For instance, if you paid via credit card, the refund will be credited back to that card; if you paid via bank transfer, we will return the funds to the same bank account.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact for Refunds</h2>
            <p className="mb-4">To request a refund for a mistaken deposit, please contact our billing support at <a href="mailto:hello@savant.chat" className="text-secondary hover:text-secondary-hover">hello@savant.chat</a>. Include your account details, payment reference, date of payment, and an explanation of the mistake.</p>
          </section>
          
          <section>
            <p className="mb-4"><strong>Note:</strong> Nothing in this policy affects any <strong>statutory rights</strong> you may have under law. If applicable law provides you a right to cancel or refund that is broader than this policy (for example, certain consumer protection laws), we will honor the applicable law.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
} 
