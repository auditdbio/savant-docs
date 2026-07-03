import type {ReactNode} from 'react';

import styles from './styles.module.css';
import {
  GearboxLogo,
  HexensLogo,
  LidoLogo,
  BgdLabsLogo,
  MellowLogo,
  MixBytesLogo,
  OneInchLogo,
  OxorioLogo,
  PessimisticLogo,
  TonCoreLogo,
} from './logos';

const partners = [
  {name: '1inch', Logo: OneInchLogo},
  {name: 'Lido', Logo: LidoLogo},
  {name: 'Pessimistic Security', Logo: PessimisticLogo},
  {name: 'OXORIO', Logo: OxorioLogo},
  {name: 'MixBytes', Logo: MixBytesLogo},
  {name: 'Gearbox', Logo: GearboxLogo},
  {name: 'Hexens', Logo: HexensLogo},
  {name: 'TON Core', Logo: TonCoreLogo},
  {name: 'Mellow Finance', Logo: MellowLogo},
  {name: 'BGD Labs', Logo: BgdLabsLogo},
];

export default function TrustLogos(): ReactNode {
  return (
    <section className={styles.trustLogos} data-testid="trust-logos">
      <p className={styles.label}>TRUSTED BY SECURITY TEAMS AT</p>
      <div className={styles.partnerLogos} aria-label="Trusted security teams">
        {partners.map(({name, Logo}) => (
          <span
            aria-label={`${name} logo`}
            className={styles.partnerLogo}
            data-testid="partner-logo"
            key={name}
            role="img"
          >
            <Logo />
          </span>
        ))}
      </div>
    </section>
  );
}
