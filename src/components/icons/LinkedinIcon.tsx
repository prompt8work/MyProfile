/**
 * lucide-react 1.x dropped all brand/logo glyphs (Linkedin, Github, etc.) —
 * kept locally instead of pinning to an old lucide major version against React 19.
 */
export default function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-1.74.33-3.42 2.48-3.42 2.12 0 2.15 1.98 2.15 3.53V21H22v-7.19c0-3.47-.75-6.14-4.8-6.14-1.95 0-3.25 1.07-3.79 2.08h-.05V8.48Z" />
    </svg>
  );
}
