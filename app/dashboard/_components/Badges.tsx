type BadgeItem = {
  title: string;
  description: string;
  earned?: string;
  progressLabel?: string;
  progressValue?: number;
  tone: "earned" | "progress";
  icon: "eye" | "shield" | "check";
};

const badges: BadgeItem[] = [
  {
    title: "Hazard Hunter",
    description: "Identify and report hazards proactively",
    progressLabel: "7/10",
    progressValue: 70,
    tone: "progress",
    icon: "eye",
  },
  {
    title: "Observation Champion",
    description: "Consistent safety observation reporting",
    earned: "Earned · Feb 12, 2026",
    tone: "earned",
    icon: "shield",
  },
  {
    title: "Response Pro",
    description: "Close corrective actions efficiently",
    earned: "Earned · Jan 28, 2026",
    tone: "earned",
    icon: "check",
  },
  {
    title: "Emergency Ready",
    description: "Participate in emergency preparedness",
    progressLabel: "2/3",
    progressValue: 67,
    tone: "progress",
    icon: "shield",
  },
  {
    title: "Compliance Leader",
    description: "Maintain PTW compliance consistency",
    progressLabel: "2/3",
    progressValue: 67,
    tone: "progress",
    icon: "shield",
  },
  {
    title: "Shift Guardian",
    description: "Consistent shift log submissions",
    earned: "Earned · Jan 28, 2026",
    tone: "progress",
    icon: "eye",
  },
];

function BadgeIcon({
  icon,
  earned,
}: {
  icon: BadgeItem["icon"];
  earned: boolean;
}) {
  const iconColor = earned ? "#D1E9FF" : "#D0D5DD";

  if (icon === "eye") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2.5 12C3.9 7.9 7.3 5.5 12 5.5C16.7 5.5 20.1 7.9 21.5 12C20.1 16.1 16.7 18.5 12 18.5C7.3 18.5 3.9 16.1 2.5 12Z"
          fill={iconColor}
        />
        <circle cx="12" cy="12" r="3" fill={earned ? "#053361" : "#98A2B3"} />
      </svg>
    );
  }

  if (icon === "check") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 2L20 6V12C20 17 16.8 20.8 12 22C7.2 20.8 4 17 4 12V6L12 2Z" fill={iconColor} />
        <path
          d="M8.5 12L11 14.5L15.5 10"
          stroke={earned ? "#053361" : "#98A2B3"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2L20 6V12C20 17 16.8 20.8 12 22C7.2 20.8 4 17 4 12V6L12 2Z" fill={iconColor} />
      <path
        d="M12 7V13"
        stroke={earned ? "#053361" : "#98A2B3"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.5" r="1" fill={earned ? "#053361" : "#98A2B3"} />
    </svg>
  );
}

export default function Badges() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {badges.map((badge) => {
        const isEarned = badge.tone === "earned";

        return (
          <article
            key={badge.title}
            className={`rounded-lg border p-4 ${
              isEarned
                ? "border-[#0B3D78] bg-[#053361] text-white"
                : "border-[#EAECF0] bg-[#F2F4F7] text-[#101828]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[22px] font-semibold leading-7">{badge.title}</h3>
                <p
                  className={`mt-1 text-[13px] ${
                    isEarned ? "text-[#D1E9FF]" : "text-[#98A2B3]"
                  }`}
                >
                  {badge.description}
                </p>
              </div>
              <span>
                <BadgeIcon icon={badge.icon} earned={isEarned} />
              </span>
            </div>

            {badge.progressValue ? (
              <div className="mt-8">
                <div className="flex items-center justify-between text-[12px] text-[#98A2B3]">
                  <span>{badge.progressLabel}</span>
                  <span>{badge.progressValue}%</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-[#E4E7EC]">
                  <div
                    className="h-3 rounded-full bg-[#F97316]"
                    style={{ width: `${badge.progressValue}%` }}
                  />
                </div>
              </div>
            ) : null}

            {badge.earned ? (
              <p className="mt-8 text-[12px] font-medium text-[#D1E9FF]">{badge.earned}</p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
