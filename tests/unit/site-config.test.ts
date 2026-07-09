import config from '../../docusaurus.config';

type HeadTag = {
  tagName?: string;
  attributes?: Record<string, string>;
};

type NavbarItem = {
  label?: string;
  to?: string;
  href?: string;
  className?: string;
  type?: string;
};

type FooterItem = {
  label?: string;
  href?: string;
  to?: string;
};

type FooterLinkColumn = {
  title?: string;
  items?: FooterItem[];
};

function getHeadTags(): HeadTag[] {
  return Array.isArray(config.headTags) ? (config.headTags as HeadTag[]) : [];
}

const navbar = config.themeConfig.navbar;
const footer = config.themeConfig.footer;
const navbarItems = navbar.items as NavbarItem[];
const footerLinks = footer.links as FooterLinkColumn[];
const signupUrl = config.customFields?.signupUrl;

describe('Docusaurus theme config', () => {
  it('uses the savant.chat site identity', () => {
    expect(config.title).toContain('Savant Chat');
    expect(config.tagline).toBe('Find Smart Contract Vulnerabilities Before Attackers Do');
    expect(config.url).toBe('https://savant.chat');
  });

  it('uses the dashboard login signup URL', () => {
    expect(signupUrl).toBe('/dashboard/login');
    expect(String(signupUrl)).toMatch(/^\//);
  });

  it('allows the temporary dashboard route to remain unresolved until the app exists', () => {
    expect(config.onBrokenLinks).toBe('warn');
  });

  it('uses the savant favicon asset', () => {
    expect(config.favicon).toBe('img/savant-favicon.png');
  });

  it('defaults color mode to dark', () => {
    expect(config.themeConfig?.colorMode?.defaultMode).toBe('dark');
  });

  it('does not respect the OS color scheme', () => {
    expect(config.themeConfig?.colorMode?.respectPrefersColorScheme).toBe(false);
  });

  it('preconnects to fonts.googleapis.com', () => {
    expect(
      getHeadTags().some(
        tag =>
          tag.tagName === 'link' &&
          tag.attributes?.rel === 'preconnect' &&
          tag.attributes?.href === 'https://fonts.googleapis.com',
      ),
    ).toBe(true);
  });

  it('loads Geist and Geist Mono from Google Fonts css2', () => {
    expect(
      getHeadTags().some(tag => {
        const href = tag.attributes?.href ?? '';

        return (
          tag.tagName === 'link' &&
          tag.attributes?.rel === 'stylesheet' &&
          href.includes('fonts.googleapis.com/css2') &&
          href.includes('Geist') &&
          href.includes('Geist+Mono')
        );
      }),
    ).toBe(true);
  });
});

describe('savant.chat navbar config', () => {
  it('uses the savant.chat navbar title', () => {
    expect(navbar.title).toBe('savant.chat');
  });

  it('uses theme-aware savant logo assets', () => {
    expect(navbar.logo?.src).toBe('img/logo_short.svg');
    expect(navbar.logo?.srcDark).toBe('img/logo_short_dark.svg');
  });

  it.each([
    ['How it works', '/#pillars'],
    ['Proof', '/#proof'],
    ['Pricing', '/#pricing'],
    ['FAQ', '/#faq'],
    ['Blog', '/blog'],
  ])('includes the %s nav item', (label, to) => {
    expect(navbarItems.some(item => item.label === label && item.to === to)).toBe(true);
  });

  it('removes the Docs navbar item', () => {
    expect(navbarItems.some(item => item.label === 'Docs' || item.type === 'docSidebar')).toBe(false);
  });

  it('uses the signup URL for the navbar CTA', () => {
    expect(
      navbarItems.some(
        item =>
          item.label === 'Start free' &&
          item.to === signupUrl &&
          item.className?.split(/\s+/).includes('navbar-cta'),
      ),
    ).toBe(true);
  });

  it('does not enable hideOnScroll', () => {
    expect(navbar.hideOnScroll).not.toBe(true);
  });
});

describe('savant.chat footer config', () => {
  it.each(['PRODUCT', 'RESOURCES', 'COMPANY'])('includes the %s column', title => {
    expect(footerLinks.some(column => column.title === title)).toBe(true);
  });

  it.each([
    ['GitHub', 'https://github.com/auditdbio'],
    ['X', 'https://x.com/savantchat'],
    ['Privacy', 'https://savant.chat/privacy-policy'],
    ['Terms', 'https://savant.chat/terms-of-service'],
  ])('includes the %s footer link', (label, href) => {
    const allItems = footerLinks.flatMap(column => column.items ?? []);

    expect(allItems.some(item => item.label === label && item.href === href)).toBe(true);
  });

  it('uses the Novel Codes DMCC copyright', () => {
    expect(footer.copyright).toContain('Novel Codes DMCC');
  });
});
