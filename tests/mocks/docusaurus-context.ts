export default function useDocusaurusContext() {
  return {
    siteConfig: {
      title: 'Savant Chat — AI Smart Contract Auditor',
      tagline: 'Find Smart Contract Vulnerabilities Before Attackers Do',
      customFields: {
        signupUrl: 'pathname:///dashboard/login',
      },
    },
  };
}
