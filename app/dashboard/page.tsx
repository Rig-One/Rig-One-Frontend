type TeamMember = {
  name: string;
  code: string;
  role: string;
};

type Operation = {
  id: string;
  status: "Active" | "Completed";
  lastUpdated: string;
  title: string;
  location: string;
  started: string;
  personnel: number;
  team: TeamMember[];
  showAssignButton: boolean;
};

const operations: Operation[] = [
  {
    id: "idaja-field",
    status: "Active",
    lastUpdated: "2 hours ago",
    title: "Idaja Field - Well 42",
    location: "Lagos State, Nigeria",
    started: "2024-01-15",
    personnel: 87,
    team: [
      {
        name: "Debo Emmanuel",
        code: "SS-001",
        role: "Shift Supervisor",
      },
      {
        name: "Lanre Ola",
        code: "CB-001",
        role: "Welfare/Campboss",
      },
    ],
    showAssignButton: true,
  },
  {
    id: "obare-field",
    status: "Active",
    lastUpdated: "2 hours ago",
    title: "Obare Field - Well 28",
    location: "Rivers State, Nigeria",
    started: "2024-01-15",
    personnel: 87,
    team: [
      {
        name: "Emmanuel Debo",
        code: "SS-001",
        role: "Shift Supervisor",
      },
    ],
    showAssignButton: true,
  },
  {
    id: "tode-field",
    status: "Completed",
    lastUpdated: "Completed",
    title: "Tode Field - Well 15",
    location: "Bayelsa State, Nigeria",
    started: "2024-01-15",
    personnel: 87,
    team: [],
    showAssignButton: true,
  },
];

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21C12 21 18 15.2 18 10.5C18 7.46 15.31 5 12 5C8.69 5 6 7.46 6 10.5C6 15.2 12 21 12 21Z"
        fill="currentColor"
      />
      <circle cx="12" cy="10.5" r="2.25" fill="#F9FAFB" />
    </svg>
  );
}

function MetaIcon({ type }: { type: "calendar" | "person" }) {
  if (type === "calendar") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="4" y="6" width="16" height="14" rx="2" fill="currentColor" />
        <path
          d="M8 4V8"
          stroke="#F9FAFB"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 4V8"
          stroke="#F9FAFB"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="8.5" r="3" fill="currentColor" />
      <path
        d="M6.25 19C7.15 16.4 9.3 15 12 15C14.7 15 16.85 16.4 17.75 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 5V19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="7" cy="12" r="2" fill="currentColor" />
      <circle cx="17" cy="7" r="2" fill="currentColor" />
      <circle cx="17" cy="17" r="2" fill="currentColor" />
      <path
        d="M9 11L15 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 13L15 15.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <section>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] text-[#053361]">
            Operations
          </h1>
          <p className="mt-1 text-[18px] text-[#667085]">
            Manage and monitor rig operations
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#053361] px-6 py-3 text-[15px] font-semibold text-white"
        >
          <PlusIcon />
          Create New Operation
        </button>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {operations.map((operation) => (
          <article
            key={operation.id}
            className="rounded-xl border border-[#EAECF0] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <span
                className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                  operation.status === "Active"
                    ? "bg-[#ECFDF3] text-[#027A48]"
                    : "bg-[#EFF8FF] text-[#175CD3]"
                }`}
              >
                {operation.status}
              </span>
              <span className="text-[12px] text-[#F97316]">
                Last Updated: {operation.lastUpdated}
              </span>
            </div>

            <h2 className="mt-5 text-[18px] font-semibold text-[#053361]">
              {operation.title}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-[14px] text-[#667085]">
              <span className="text-[#98A2B3]">
                <MapPinIcon />
              </span>
              {operation.location}
            </p>

            <div className="mt-5 rounded-xl bg-[#F5F5F5] p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[14px] text-[#667085]">
                  <span className="flex items-center gap-2">
                    <span className="text-[#D0D5DD]">
                      <MetaIcon type="calendar" />
                    </span>
                    Started:
                  </span>
                  <span className="font-semibold text-[#667085]">
                    {operation.started}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[14px] text-[#667085]">
                  <span className="flex items-center gap-2">
                    <span className="text-[#D0D5DD]">
                      <MetaIcon type="person" />
                    </span>
                    Personnel:
                  </span>
                  <span className="font-semibold text-[#667085]">
                    {operation.personnel}
                  </span>
                </div>
              </div>

              {operation.team.length > 0 ? (
                <div className="mt-5">
                  <p className="text-[13px] font-medium text-[#98A2B3]">
                    Assigned Team
                  </p>

                  <div className="mt-3 space-y-3">
                    {operation.team.map((member) => (
                      <div
                        key={`${operation.id}-${member.code}`}
                        className="rounded-lg bg-white px-4 py-3 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[15px] font-medium text-[#344054]">
                              {member.name} ({member.code})
                            </p>
                            <p className="mt-1 text-[13px] text-[#98A2B3]">
                              {member.role}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="text-[18px] leading-none text-[#98A2B3]"
                            aria-label={`Remove ${member.name}`}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {operation.showAssignButton ? (
                <button
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FA8142] px-4 py-3 text-[14px] font-semibold text-white"
                >
                  <ShareIcon />
                  Assign Team Members
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
