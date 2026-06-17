export type HousekeepingLogRow = {
  personnel: string;
  service: string;
  time: string;
  items: string;
};

type HousekeepingLogTableProps = {
  rows: HousekeepingLogRow[];
};

export default function HousekeepingLogTable({ rows }: HousekeepingLogTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#EAECF0]">
      <table className="w-full text-left">
        <thead className="bg-[#F2F4F7] text-[12px] font-medium text-[#667085]">
          <tr>
            <th className="px-4 py-3">Personnel</th>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Items</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[13px] text-[#475467]">
          {rows.map((row) => (
            <tr key={`${row.personnel}-${row.time}`} className="border-t border-[#EAECF0]">
              <td className="px-4 py-5 font-medium text-[#344054]">{row.personnel}</td>
              <td className="px-4 py-5">
                <span className="inline-flex rounded-full bg-[#F2F4F7] px-3 py-1 text-[12px] font-medium text-[#667085]">
                  {row.service}
                </span>
              </td>
              <td className="px-4 py-5">{row.time}</td>
              <td className="px-4 py-5">{row.items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
