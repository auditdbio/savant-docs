import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Original from '@theme-original/Blog/Pages/BlogAuthorsPostsPage';
import type BlogAuthorsPostsPageType from '@theme/Blog/Pages/BlogAuthorsPostsPage';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogAuthorsPostsPageType>;

// Excluded from sitemap.xml; noindex keeps crawlers from indexing the
// thin/duplicate-title page while still following its links.
export default function BlogAuthorsPostsPageWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Original {...props} />
    </>
  );
}
