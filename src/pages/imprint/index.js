import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '../../pages/index.module.css';
import styles from '../terms-of-service/styles.module.css';

export default function Imprint() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`Imprint - ${siteConfig.title}`}
      description="Imprint and Legal Information for Savant.Chat">
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className={styles.policyContainer}>
              <h1 className={styles.policyTitle}>Imprint</h1>
              
              <h2>Service Operator</h2>
              <p>
                This AI-based code auditing service "Savant Chat" is operated by NOVEL CODES DMCC, 
                a company registered in Dubai, United Arab Emirates.
              </p>
              
              <h2>Company Information</h2>
              <p>
                <strong>Company Name:</strong> Novel Codes DMCC<br />
                <strong>Registered Office:</strong> Unit No. 1409, Preatoni Tower (Plot No. JLT-PH1-L2A), 
                Jumeirah Lakes Towers (JLT), Dubai, UAE.<br />
                <strong>Trade License / Registration Number:</strong> DMCC193534 (Registered with Dubai Multi Commodities Centre)<br />
                <strong>Legal Form:</strong> DMCC Free Zone Company (Dubai Multi Commodities Centre)
              </p>
              
              <h2>Representation</h2>
              <p>
                <strong>Represented By:</strong> Igor Gulamov, General Manager
              </p>
              
              <h2>Contact Information</h2>
              <p>
                <strong>Email:</strong> <a href="mailto:hello@savant.chat">hello@savant.chat</a> (for general inquiries)<br />
                <strong>Website:</strong> <a href="https://savant.chat" target="_blank" rel="noopener noreferrer">https://savant.chat</a>
              </p>
              
              <h2>Liability for Content</h2>
              <p>
                The contents of our website have been created with utmost care. However, we cannot guarantee the accuracy, 
                completeness, or timeliness of the content. As a service provider, we are responsible for our own content 
                on these pages according to general laws. We are not obliged to monitor transmitted or stored third-party 
                information or to investigate circumstances that indicate illegal activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 