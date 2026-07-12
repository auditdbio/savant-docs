import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Original from '@theme-original/Blog/Pages/BlogAuthorsListPage';
import type BlogAuthorsListPageType from '@theme/Blog/Pages/BlogAuthorsListPage';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogAuthorsListPageType>;

// Excluded from sitemap.xml; noindex keeps crawlers from indexing the
// thin/duplicate-title page while still following its links.
export default function BlogAuthorsListPageWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Original {...props} />
    </>
  );
}
