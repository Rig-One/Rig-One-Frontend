const overviewStats = [
  { title: "Total Near-Miss Reports", value: "87" },
  { title: "Most Earned Badge", value: "Shift Guardian" },
  { title: "Proactive:Reactive Ratio", value: "9:1" },
  { title: "Avg Engagement Score", value: "92%" },
];

const teamRows = [
  {
    team: "Shift A (Day)",
    sci: "128",
    reporting: "92%",
    drill: "100%",
    ptw: "96%",
    status: "Completed",
    tone: "blue",
  },
  {
    team: "Angel Rhiel Madsen",
    sci: "105",
    reporting: "70%",
    drill: "85%",
    ptw: "88%",
    status: "Pending",
    tone: "yellow",
  },
];

const contributors = [
  { name: "Adebayo O.", role: "Observation Champion", points: "145 pts" },
  { name: "Ibrahim K.", role: "Response Pro", points: "130 pts" },
  { name: "Fatima A.", role: "Shift Guardian", points: "125 pts" },
];

const chartHeights = [82, 94, 110, 124, 138, 160, 188, 220, 262, 310, 372, 450];
const barPairs = [
  [90, 128],
  [50, 85],
  [70, 118],
  [48, 78],
  [64, 92],
  [44, 73],
  [58, 98],
  [80, 128],
  [64, 112],
  [52, 75],
  [60, 88],
  [70, 96],
];

export default function SafetyOverview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <article key={stat.title} className="rounded-lg bg-[#F2F4F7] p-4">
            <p className="text-[12px] font-medium text-[#667085]">{stat.title}</p>
            <p className="mt-3 text-[28px] font-semibold text-[#101828]">{stat.value}</p>
          </article>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-[#EAECF0] bg-white">
        <table className="w-full text-left">
          <thead className="bg-[#F2F4F7] text-[12px] text-[#667085]">
            <tr>
              <th className="px-4 py-3 font-medium">Team</th>
              <th className="px-4 py-3 font-medium">Avg SCI</th>
              <th className="px-4 py-3 font-medium">Reporting %</th>
              <th className="px-4 py-3 font-medium">Drill %</th>
              <th className="px-4 py-3 font-medium">PTW %</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {teamRows.map((row) => (
              <tr key={row.team} className="border-t border-[#EAECF0] text-[13px] text-[#475467]">
                <td className="px-4 py-4 font-medium text-[#344054]">{row.team}</td>
                <td className="px-4 py-4">{row.sci}</td>
                <td className="px-4 py-4">{row.reporting}</td>
                <td className="px-4 py-4">{row.drill}</td>
                <td className="px-4 py-4">{row.ptw}</td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                      row.tone === "blue"
                        ? "bg-[#EFF8FF] text-[#175CD3]"
                        : "bg-[#FFFAEB] text-[#B54708]"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="rounded-lg border border-[#EAECF0] bg-white p-4">
        <p className="text-[13px] font-semibold text-[#053361]">Engagement Score Trend</p>
        <div className="mt-6 h-[220px] rounded-md bg-[linear-gradient(to_bottom,transparent_96%,#EAECF0_96%)] [background-size:100%_36px] px-4 pb-5 pt-2">
          <div className="relative h-full w-full">
            <svg viewBox="0 0 720 200" className="h-full w-full" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#F97316"
                strokeWidth="3"
                points={chartHeights
                  .map((height, index) => `${index * 60 + 12},${180 - height / 3}`)
                  .join(" ")}
              />
            </svg>
          </div>
          <div className="mt-2 grid grid-cols-12 text-center text-[11px] text-[#98A2B3]">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
              (month) => (
                <span key={month}>{month}</span>
              ),
            )}
          </div>
        </div>
      </article>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <article className="rounded-lg border border-[#EAECF0] bg-white p-4">
          <p className="text-[13px] font-semibold text-[#053361]">Top Contributors This Month</p>
          <div className="mt-4 divide-y divide-[#EAECF0]">
            {contributors.map((contributor, index) => (
              <div key={contributor.name} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-[13px] font-semibold text-[#344054]">
                    {index + 1}. {contributor.name}
                  </p>
                  <p className="mt-1 text-[12px] text-[#98A2B3]">{contributor.role}</p>
                </div>
                <p className="text-[13px] font-semibold text-[#053361]">{contributor.points}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-[#EAECF0] bg-white p-4">
          <p className="text-[13px] font-semibold text-[#053361]">Proactive vs Reactive Reports</p>
          <div className="mt-5 flex h-[220px] items-end gap-3">
            {barPairs.map(([first, second], index) => (
              <div key={`bars-${index}`} className="flex flex-1 items-end justify-center gap-1">
                <span className="w-2 rounded-t bg-[#F97316]" style={{ height: `${first}px` }} />
                <span className="w-2 rounded-t bg-[#C2410C]" style={{ height: `${second}px` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-12 text-center text-[11px] text-[#98A2B3]">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
              (month) => (
                <span key={month}>{month}</span>
              ),
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
