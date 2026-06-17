const sciStats = [
  {
    title: "Monthly SCI",
    value: "105",
    note: "Progress",
    footer: "105/150",
    hasProgress: true,
  },
  {
    title: "Lifetime Score",
    value: "1240",
    note: "2 standards",
    footer: "",
    hasProgress: false,
  },
  {
    title: "Shift Rank",
    value: "#4",
    note: "Day Shift · 12 members",
    footer: "",
    hasProgress: false,
  },
];

const contributions = [
  { title: "Submitted safety observation", date: "Today, 09:15", points: "+5" },
  { title: "Shift log submitted on time", date: "Today, 06:12", points: "+5" },
  { title: "Near-miss report validated", date: "Yesterday", points: "+10" },
  { title: "Corrective action closed", date: "3 days ago", points: "+15" },
  { title: "Corrective action closed", date: "3 days ago", points: "+15" },
];

const ranking = [
  { name: "Adebayo O.", points: "145 pts" },
  { name: "Ibrahim K.", points: "130 pts" },
  { name: "Fatima A.", points: "125 pts" },
  { name: "Fatima A.", points: "125 pts" },
  { name: "Fatima A.", points: "125 pts" },
];

const pointsEarned = [
  { label: "Near-miss report (validated)", points: "+10" },
  { label: "Unsafe act/condition (verified)", points: "+15" },
  { label: "Corrective action closed on time", points: "+15" },
  { label: "PTW compliance confirmation", points: "+5" },
  { label: "Safety observation submitted", points: "+5" },
  { label: "Emergency drill participation", points: "+5" },
  { label: "Shift log submitted on time", points: "+5" },
];

export default function SciScore() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-3">
        {sciStats.map((stat) => (
          <article key={stat.title} className="rounded-lg bg-[#F2F4F7] p-4">
            <p className="text-[12px] font-medium text-[#667085]">{stat.title}</p>
            <p className="mt-3 text-[32px] font-semibold text-[#101828]">{stat.value}</p>
            {stat.hasProgress ? (
              <div className="mt-4">
                <div className="h-2 rounded-full bg-[#EAECF0]">
                  <div className="h-2 w-[32%] rounded-full bg-[#F97316]" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-[#98A2B3]">
                  <span>{stat.note}</span>
                  <span>{stat.footer}</span>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-[11px] text-[#98A2B3]">{stat.note}</p>
            )}
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-lg border border-[#EAECF0] bg-white p-4">
          <p className="text-[13px] font-semibold text-[#053361]">Recent Contributions</p>
          <div className="mt-4 divide-y divide-[#EAECF0]">
            {contributions.map((item) => (
              <div key={`${item.title}-${item.date}`} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-[13px] font-semibold text-[#344054]">{item.title}</p>
                  <p className="mt-1 text-[12px] text-[#98A2B3]">{item.date}</p>
                </div>
                <p className="text-[13px] font-semibold text-[#053361]">{item.points}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-[#EAECF0] bg-white p-4">
          <p className="text-[13px] font-semibold text-[#053361]">Shift Ranking</p>
          <div className="mt-4 divide-y divide-[#EAECF0]">
            {ranking.map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center justify-between py-4">
                <p className="text-[13px] font-semibold text-[#344054]">
                  {index + 1}. {item.name}
                </p>
                <p className="text-[13px] font-semibold text-[#053361]">{item.points}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="rounded-lg border border-[#EAECF0] bg-white p-4">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-[#053361]">
          <span className="text-[#175CD3]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M12 8V12L15 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          How Points Are Earned
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-4">
          {pointsEarned.map((item) => (
            <div key={item.label} className="rounded-lg bg-[#F2F4F7] p-4">
              <p className="text-[12px] font-medium leading-5 text-[#667085]">{item.label}</p>
              <p className="mt-4 text-[28px] font-semibold text-[#101828]">{item.points}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
