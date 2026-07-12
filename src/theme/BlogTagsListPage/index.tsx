import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Original from '@theme-original/BlogTagsListPage';
import type BlogTagsListPageType from '@theme/BlogTagsListPage';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogTagsListPageType>;

// Excluded from sitemap.xml; noindex keeps crawlers from indexing the
// thin/duplicate-title page while still following its links.
export default function BlogTagsListPageWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Original {...props} />
    </>
  );
}
