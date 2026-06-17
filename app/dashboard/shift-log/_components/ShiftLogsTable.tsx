type ShiftLogRow = {
  id: string;
  supervisor: string;
  shift: "Day" | "Night";
  incidents: number;
  risk: "Green" | "Amber";
  date: string;
};

type ShiftLogsTableProps = {
  rows: ShiftLogRow[];
};

function DayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path d="M12 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.9 4.9L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 17L19.1 19.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 7L19.1 4.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.9 19.1L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15.5 3.8C14.8 3.3 14 3 13.1 3C9.2 3 6 6.2 6 10.1C6 14.6 9.5 18 14 18C16.6 18 18.9 16.8 20.3 14.9C16.5 15 13.4 11.9 13.4 8.1C13.4 6.5 13.9 5 15 3.8H15.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ShiftLogsTable({ rows }: ShiftLogsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#EAECF0]">
      <table className="w-full text-left">
        <thead className="bg-[#F2F4F7] text-[12px] font-medium text-[#667085]">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Supervisor</th>
            <th className="px-4 py-3">Shift</th>
            <th className="px-4 py-3">Incident</th>
            <th className="px-4 py-3">Risk</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[13px] text-[#475467]">
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[#EAECF0]">
              <td className="px-4 py-5 text-[#667085]">{row.id}</td>
              <td className="px-4 py-5 font-medium text-[#101828]">{row.supervisor}</td>
              <td className="px-4 py-5">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-medium ${
                    row.shift === "Day"
                      ? "bg-[#FFF3DD] text-[#B76E00]"
                      : "bg-[#EAECF5] text-[#475467]"
                  }`}
                >
                  {row.shift === "Day" ? <DayIcon /> : <NightIcon />}
                  {row.shift}
                </span>
              </td>
              <td className="px-4 py-5">{row.incidents}</td>
              <td className="px-4 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${
                    row.risk === "Green"
                      ? "bg-[#EAF7EC] text-[#4E9765]"
                      : "bg-[#FEF0E8] text-[#F97316]"
                  }`}
                >
                  {row.risk}
                </span>
              </td>
              <td className="px-4 py-5">{row.date}</td>
              <td className="px-4 py-5 text-center text-[#98A2B3]">•••</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
