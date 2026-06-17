type ActiveWorker = {
  id: string;
  name: string;
  department: string;
  status: string;
};

type ActiveWorkersTableProps = {
  rows: ActiveWorker[];
};

export default function ActiveWorkersTable({ rows }: ActiveWorkersTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#EAECF0]">
      <table className="w-full text-left">
        <thead className="bg-[#F2F4F7] text-[12px] font-medium text-[#667085]">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[13px] text-[#475467]">
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[#EAECF0]">
              <td className="px-4 py-5 text-[#667085]">{row.id}</td>
              <td className="px-4 py-5 font-medium text-[#101828]">{row.name}</td>
              <td className="px-4 py-5">{row.department}</td>
              <td className="px-4 py-5">
                <span className="inline-flex rounded-full bg-[#EAF7EC] px-3 py-1 text-[12px] font-medium text-[#4E9765]">
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
