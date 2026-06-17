type StreakCard = {
  title: string;
  best: string;
  value: number;
  active?: boolean;
  restart?: boolean;
};

const streaks: StreakCard[] = [
  {
    title: "Shift Log Streak",
    best: "Best: 30 days",
    value: 13,
    active: true,
  },
  {
    title: "Safety Reporting",
    best: "Best: 12 days",
    value: 11,
    active: true,
  },
  {
    title: "PTW Compliance",
    best: "Best: 18 days",
    value: 0,
    restart: true,
  },
  {
    title: "Corrective Action Closure",
    best: "Best: 8 days",
    value: 10,
    active: true,
  },
];

function CircularProgress({ value }: { value: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / 14, 1);
  const strokeDashoffset = circumference - progress * circumference;
  const active = value > 0;

  return (
    <div className="relative h-[92px] w-[92px]">
      <svg viewBox="0 0 92 92" className="h-full w-full -rotate-90">
        <circle
          cx="46"
          cy="46"
          r={radius}
          stroke={active ? "#F3E0D8" : "#EAECF0"}
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="46"
          cy="46"
          r={radius}
          stroke={active ? "#D94808" : "#EAECF0"}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[28px] font-semibold text-[#F97316]">
        {value}
      </div>
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C14.22 4 16.24 4.9 17.69 6.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 4V9H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Streaks() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {streaks.map((streak) => (
        <article
          key={streak.title}
          className="flex items-center justify-between rounded-lg border border-[#EAECF0] bg-white px-4 py-5"
        >
          <div>
            <h3 className="text-[22px] font-semibold leading-7 text-[#101828]">
              {streak.title}
            </h3>
            <p className="mt-1 text-[13px] text-[#98A2B3]">{streak.best}</p>

            {streak.active ? (
              <span className="mt-12 inline-flex rounded-full bg-[#EAF7EC] px-3 py-1 text-[13px] font-medium text-[#4E9765]">
                Active
              </span>
            ) : null}

            {streak.restart ? (
              <button
                type="button"
                className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#DCEAFE] px-3 py-1 text-[13px] font-medium text-[#2F5B9A]"
              >
                <RefreshIcon />
                Restart Streak
              </button>
            ) : null}
          </div>

          <CircularProgress value={streak.value} />
        </article>
      ))}
    </div>
  );
}
