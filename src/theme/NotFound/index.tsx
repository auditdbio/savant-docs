import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Original from '@theme-original/NotFound';
import type NotFoundType from '@theme/NotFound';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof NotFoundType>;

// Excluded from sitemap.xml; noindex keeps crawlers from indexing the
// thin/duplicate-title page while still following its links.
export default function NotFoundWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Original {...props} />
    </>
  );
}
