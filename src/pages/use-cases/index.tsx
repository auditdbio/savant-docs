import React, { type ReactElement, useEffect } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import CTASection from "../../components/CTASection";

export default function UseCases(): ReactElement {
  const useCasesData = [
    {
      id: "developers",
      title: "For Developers",
      subtitle: "Integrate security into your development workflow",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
      items: [
        {
          title: "Pre-Deployment Security Audit",
          description: "Run a comprehensive security audit before deploying your smart contracts to mainnet. Catch vulnerabilities early and save on gas costs from redeployments. Works with Solidity, Vyper, and Rust (Near & Solana).",
          features: ["Automated vulnerability scanning", "Gas optimization recommendations", "Best practices compliance", "Multi-language support"]
        },
        {
          title: "Continuous Security in Your CI/CD Pipeline",
          description: "Integrate with your CI/CD pipeline to automatically scan every pull request and code change. Maintain security standards throughout your development lifecycle.",
          features: ["GitHub Actions integration", "Pull request security checks", "Team collaboration features"]
        },
        {
          title: "Security Learning Tool for Web3 Developers",
          description: "Learn about smart contract security patterns and anti-patterns. Get detailed explanations of potential issues and how to fix them.",
          features: ["Educational security insights", "Code improvement suggestions", "Industry best practices"]
        }
      ]
    },
    {
      id: "audit-companies",
      title: "For Audit Companies",
      subtitle: "Enhance your audit workflow with AI assistance",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
      items: [
        {
          title: "Pre-Audit Screening",
          description: "Quickly assess project complexity and find low-hanging fruit before starting a manual review.",
          features: []
        },
        {
          title: "AI-Powered Audit Acceleration",
          description: "Let our AI audit tool handle routine checks while your experts focus on complex business logic.",
          features: []
        },
        {
          title: "Quality Assurance",
          description: "Use AI as a second opinion to ensure comprehensive coverage and reduce false negatives.",
          features: []
        },
        {
          title: "Client Value-Add",
          description: "Offer clients additional AI-powered insights and faster turnaround times.",
          features: []
        }
      ]
    },
    {
      id: "investors",
      title: "For Investors",
      subtitle: "Make informed investment decisions with AI security insights",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
      items: [
        {
          title: "Due Diligence Security Scan",
          description: "Quickly assess the security posture of potential Web3 investments before you commit.",
          features: []
        },
        {
          title: "Portfolio Monitoring",
          description: "Continuously monitor your portfolio companies' smart contract security health.",
          features: []
        },
        {
          title: "Risk Assessment",
          description: "Understand technical risks and potential security vulnerabilities in your investments.",
          features: []
        },
        {
          title: "Competitive Analysis",
          description: "Compare security standards across different projects and protocols in your sector.",
          features: []
        }
      ]
    },
    {
      id: "enterprise",
      title: "For Enterprise",
      subtitle: "Scale security across your organization",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
      items: [
        {
          title: "Regular Security Reviews",
          description: "Implement regular security assessments across all your smart contract deployments. Maintain consistent security standards organization-wide.",
          features: ["Automated security reporting", "Compliance tracking", "Multi-project management"]
        },
        {
          title: "Custom Security Policies",
          description: "Define and enforce organization-specific security policies and standards. Get customized reports aligned with your governance requirements.",
          features: ["Custom rule configurations", "Enterprise-grade reporting", "Team collaboration tools"]
        }
      ]
    }
  ];

  // Instant anchor scrolling - no animation, immediate jump
  useEffect(() => {
    const handleAnchorScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # symbol
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          // Instant scroll without animation
          element.scrollIntoView({
            behavior: 'auto',
            block: 'start',
            inline: 'nearest'
          });
        }
      }
    };

    // Immediate scroll on load - no delay
    handleAnchorScroll();

    // Also try to scroll immediately in case DOM isn't ready
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1);
      // Try to scroll multiple times to catch the element as soon as it's available
      const attempts = [0, 10, 50];
      attempts.forEach(delay => {
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({
              behavior: 'auto',
              block: 'start',
              inline: 'nearest'
            });
          }
        }, delay);
      });
    }

    // Handle hash changes (if user clicks another anchor link)
    window.addEventListener('hashchange', handleAnchorScroll);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleAnchorScroll);
    };
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Smart Contract Security Use Cases & Solutions - Savant Chat",
    description: "Discover how Savant Chat serves developers, audit companies, investors, and enterprises with AI-powered smart contract security",
    url: "https://savant.chat/use-cases",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": useCasesData.map((section, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": section.title,
        "description": section.subtitle
      }))
    }
  };

  return (
    <Layout
      title="Smart Contract Security Use Cases & Solutions"
      description="Discover how Savant Chat serves developers, audit companies, investors, and enterprises with AI-powered smart contract security"
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Smart Contract Security Use Cases
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Tailored AI-powered smart contract security solutions for every role
            </p>
          </div>
        </section>

        {/* Use Cases Sections */}
        {useCasesData.map(section => (
          <section key={section.id} id={section.id} className={`py-20 bg-gradient-to-br from-${section.id === 'developers' ? 'primary' : section.id === 'audit-companies' ? 'secondary' : section.id === 'investors' ? 'primary' : 'secondary'}-50 to-${section.id === 'developers' ? 'primary' : section.id === 'audit-companies' ? 'secondary' : section.id === 'investors' ? 'primary' : 'secondary'}-100`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-${section.id === 'developers' ? 'primary' : section.id === 'audit-companies' ? 'secondary' : section.id === 'investors' ? 'primary' : 'secondary'} text-white mx-auto mb-6`}>
                  {section.icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-xl text-gray-600">{section.subtitle}</p>
              </div>
              <div className={`grid md:grid-cols-${section.items.length === 4 ? 2 : 3} lg:grid-cols-${section.items.length} gap-6`}>
                {section.items.map(item => (
                  <div key={item.title} className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-${section.id === 'developers' ? 'primary' : section.id === 'audit-companies' ? 'secondary' : section.id === 'investors' ? 'primary' : 'secondary'}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    {item.features && (
                      <ul className="text-sm text-gray-600 space-y-2">
                        {item.features.map(feature => <li key={feature}>• {feature}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <CTASection 
          title="Ready to Get Started?"
          description="Join thousands of users who trust Savant Chat for their smart contract security needs"
        />
      </div>
    </Layout>
  );
} 