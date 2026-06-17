import ActionMenu from "./ActionMenu";

type PersonnelRow = {
  id: string;
  name: string;
  company: string;
  role: string;
  arrival: string;
  departure: string;
  status: "Active" | "Inactive";
};

type PersonnelTableProps = {
  rows: PersonnelRow[];
};

export default function PersonnelTable({ rows }: PersonnelTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#EAECF0]">
      <table className="w-full text-left">
        <thead className="bg-[#F2F4F7] text-[12px] font-medium text-[#667085]">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Arrival</th>
            <th className="px-4 py-3">Departure</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[13px] text-[#475467]">
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[#EAECF0]">
              <td className="px-4 py-4 font-medium text-[#101828]">{row.name}</td>
              <td className="px-4 py-4">{row.company}</td>
              <td className="px-4 py-4">{row.role}</td>
              <td className="px-4 py-4">{row.arrival}</td>
              <td className="px-4 py-4">{row.departure}</td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${
                    row.status === "Active"
                      ? "bg-[#EAF7EC] text-[#4E9765]"
                      : "bg-[#F2F4F7] text-[#667085]"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="inline-flex justify-center">
                  <ActionMenu />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

