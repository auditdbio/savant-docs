import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Original from '@theme-original/DocTagDocListPage';
import type DocTagDocListPageType from '@theme/DocTagDocListPage';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof DocTagDocListPageType>;

// Excluded from sitemap.xml; noindex keeps crawlers from indexing the
// thin/duplicate-title page while still following its links.
export default function DocTagDocListPageWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Original {...props} />
    </>
  );
}
