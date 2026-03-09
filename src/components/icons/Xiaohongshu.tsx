interface XiaohongshuIconProps {
  className?: string;
}

export function XiaohongshuIcon({ className }: XiaohongshuIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <circle cx="8.5" cy="12" r="1.6" />
      <circle cx="15.5" cy="12" r="1.6" />
      <path d="M8 16c1 .8 2.4 1.2 4 1.2s3-.4 4-1.2" />
      <path d="M9 4.5c.8.7 1.2 1.5 1.3 2.5" />
      <path d="M15 4.5c-.8.7-1.2 1.5-1.3 2.5" />
    </svg>
  );
}
