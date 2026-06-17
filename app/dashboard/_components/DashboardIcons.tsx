type IconProps = {
  className?: string;
};

export function DashboardGridIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 4H10V10H4V4Z" fill="currentColor" />
      <path d="M14 4H20V10H14V4Z" fill="currentColor" />
      <path d="M4 14H10V20H4V14Z" fill="currentColor" />
      <path d="M14 14H20V20H14V14Z" fill="currentColor" />
    </svg>
  );
}

export function FieldIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 18C6.2 15.3 8.54 13.5 11.25 13.5C13.96 13.5 16.3 15.3 17.5 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="11.25" cy="8.5" r="2.75" fill="currentColor" />
      <path
        d="M3 18.75H19.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PersonnelIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" fill="currentColor" />
      <circle cx="16.5" cy="9.5" r="2.5" fill="currentColor" />
      <path
        d="M3.5 18C4.6 15.4 6.6 14 9 14C11.4 14 13.4 15.4 14.5 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13.75 18C14.45 16.2 15.85 15.25 17.5 15.25C19.15 15.25 20.55 16.2 21.25 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FeedingIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 7H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7.5 11V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 3C15.5 5 15 7 15 9V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AlertIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 4L21 20H3L12 4Z" fill="currentColor" />
      <path d="M12 9V13" stroke="#001B44" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="#001B44" />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" fill="currentColor" />
      <path
        d="M12 8V12L15 14"
        stroke="#001B44"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DocumentIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M7 3H14L19 8V21H7V3Z" fill="currentColor" />
      <path d="M14 3V8H19" stroke="#001B44" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 12H16" stroke="#001B44" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MedicIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 5H18V21H6V5Z" fill="currentColor" />
      <path d="M10 3H14V7H10V3Z" fill="#001B44" />
      <path d="M12 10V16" stroke="#001B44" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 13H15" stroke="#001B44" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 10V8C7 5.79 8.79 4 11 4C13.21 4 15 5.79 15 8V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="5" y="10" width="12" height="10" rx="2" fill="currentColor" />
    </svg>
  );
}

export function BellIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 4C9.79 4 8 5.79 8 8V10.5C8 11.8 7.5 13.05 6.6 13.97L5 15.6H19L17.4 13.97C16.5 13.05 16 11.8 16 10.5V8C16 5.79 14.21 4 12 4Z"
        fill="currentColor"
      />
      <path d="M10 18C10.4 19.2 11.05 20 12 20C12.95 20 13.6 19.2 14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronIcon({
  className = "h-4 w-4",
  open = false,
}: IconProps & { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} transition ${open ? "rotate-180" : ""}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
