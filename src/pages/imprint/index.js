import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Imprint() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Imprint"
      description="Imprint and Legal Information for Savant Chat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-8">Imprint</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Operator</h2>
            <p className="mb-4">
              This AI-based code auditing service "Savant Chat" is operated by <strong>NOVEL CODES DMCC</strong>, 
              a company registered in Dubai, United Arab Emirates.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="font-semibold">Company Name</dt>
                  <dd>Novel Codes DMCC</dd>
                </div>
                
                <div>
                  <dt className="font-semibold">Registered Office</dt>
                  <dd>Unit No. 1409, Preatoni Tower (Plot No. JLT-PH1-L2A), Jumeirah Lakes Towers (JLT), Dubai, UAE.</dd>
                </div>
                
                <div>
                  <dt className="font-semibold">Trade License / Registration Number</dt>
                  <dd>DMCC193534 (Registered with Dubai Multi Commodities Centre)</dd>
                </div>
                
                <div>
                  <dt className="font-semibold">Legal Form</dt>
                  <dd>DMCC Free Zone Company (Dubai Multi Commodities Centre)</dd>
                </div>
                
                <div>
                  <dt className="font-semibold">Represented By</dt>
                  <dd><strong>Igor Gulamov</strong>, General Manager</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              <strong>Email:</strong> <a href="mailto:hello@savant.chat" className="text-secondary hover:text-secondary-hover">hello@savant.chat</a> (for general inquiries)
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
} 
