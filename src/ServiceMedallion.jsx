export function PassportIcon() {
  return (
    <svg viewBox="0 0 256 256" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
        <rect x="48" y="24" width="160" height="208" rx="16" />
        <path d="M92 64h72" />
        <circle cx="128" cy="148" r="44" />
        <ellipse cx="128" cy="148" rx="19" ry="44" />
        <path d="M84 148h88" />
      </g>
    </svg>
  );
}

export default function ServiceMedallion({ icon: Icon, weight = "fill" }) {
  return (
    <span className="icon-medallion service-medallion" aria-hidden="true">
      <Icon weight={weight} aria-hidden="true" focusable="false" />
    </span>
  );
}
