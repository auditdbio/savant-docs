import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Imprint and legal information for Savant Chat, the AI-based code auditing service operated by Novel Codes DMCC, registered in Dubai, United Arab Emirates.",
  alternates: { canonical: "/imprint/" },
};

export default function Page() {
  return (
    <div className="container-max py-12">
      <article className="prose-savant">
        <h1>Imprint</h1>

        <h2>Service Operator</h2>
        <p>
          This AI-based code auditing service &quot;Savant Chat&quot; is operated by{" "}
          <strong>NOVEL CODES DMCC</strong>, a company registered in Dubai, United Arab Emirates.
        </p>

        <ul>
          <li>
            <strong>Company Name</strong>
            <br />
            Novel Codes DMCC
          </li>
          <li>
            <strong>Registered Office</strong>
            <br />
            Unit No. 1409, Preatoni Tower (Plot No. JLT-PH1-L2A), Jumeirah Lakes Towers (JLT), Dubai,
            UAE.
          </li>
          <li>
            <strong>Trade License / Registration Number</strong>
            <br />
            DMCC193534 (Registered with Dubai Multi Commodities Centre)
          </li>
          <li>
            <strong>Legal Form</strong>
            <br />
            DMCC Free Zone Company (Dubai Multi Commodities Centre)
          </li>
          <li>
            <strong>Represented By</strong>
            <br />
            <strong>Igor Gulamov</strong>, General Manager
          </li>
        </ul>

        <h2>Contact Information</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:hello@savant.chat">hello@savant.chat</a> (for general inquiries)
        </p>
      </article>
    </div>
  );
}
