import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Original from '@theme-original/DocTagsListPage';
import type DocTagsListPageType from '@theme/DocTagsListPage';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof DocTagsListPageType>;

// Excluded from sitemap.xml; noindex keeps crawlers from indexing the
// thin/duplicate-title page while still following its links.
export default function DocTagsListPageWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Original {...props} />
    </>
  );
}
