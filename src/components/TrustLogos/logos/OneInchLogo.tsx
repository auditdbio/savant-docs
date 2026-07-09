import type {SVGProps} from 'react';

export default function OneInchLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 108 56" fill="currentColor" aria-hidden="true" focusable="false" {...props} style={{color: 'var(--logo-ink, currentColor)', ...props.style}}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        transform="translate(0 14) scale(0.0546875)"
        d="M512 0H0V512H512V0ZM169.713 383.699H342.638V346.984L278.789 346.985V128.301H241.011C239.555 158.888 230.742 166.611 188.868 166.611H169.713V201.196H233.562V346.985H169.713V383.699ZM360.729 201.196V128.301H324.016V201.196H360.729ZM425.111 201.196V128.301H388.397V201.196H425.111Z"
      />
      <text x="40" y="35" fill="currentColor" fontFamily="Geist, ui-sans-serif, system-ui, sans-serif" fontSize="24" fontWeight="700">
        1inch
      </text>
    </svg>
  );
}
