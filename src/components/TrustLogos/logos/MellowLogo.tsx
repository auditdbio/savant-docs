import type {HTMLAttributes} from 'react';

import styles from '../styles.module.css';

export default function MellowLogo(props: HTMLAttributes<HTMLSpanElement>) {
  return <span className={styles.mellowLogo} aria-hidden="true" {...props} />;
}
