export type FeedingLogRow = {
  personnel: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  method: string;
};

type FeedingLogTableProps = {
  rows: FeedingLogRow[];
};

export default function FeedingLogTable({ rows }: FeedingLogTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#EAECF0]">
      <table className="w-full text-left">
        <thead className="bg-[#F2F4F7] text-[12px] font-medium text-[#667085]">
          <tr>
            <th className="px-4 py-3">Personnel</th>
            <th className="px-4 py-3">Breakfast</th>
            <th className="px-4 py-3">Lunch</th>
            <th className="px-4 py-3">Dinner</th>
            <th className="px-4 py-3">Method</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[13px] text-[#475467]">
          {rows.map((row) => (
            <tr key={row.personnel} className="border-t border-[#EAECF0]">
              <td className="px-4 py-5 font-medium text-[#344054]">{row.personnel}</td>
              <td className="px-4 py-5">{row.breakfast}</td>
              <td className="px-4 py-5">{row.lunch}</td>
              <td className="px-4 py-5">{row.dinner}</td>
              <td className="px-4 py-5">
                <span className="inline-flex rounded-full bg-[#F2F4F7] px-3 py-1 text-[12px] font-medium text-[#667085]">
                  {row.method}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
