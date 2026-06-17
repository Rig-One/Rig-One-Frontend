import EmergencyActionMenu from "./EmergencyActionMenu";

export type MusterRow = {
  id: string;
  rfid: string;
  name: string;
  department: string;
  status: "Mustered" | "Not Mustered";
  timeLabel?: string;
  lastSeen?: string;
  details?: {
    name: string;
    rfid: string;
    department: string;
    cabin: string;
    contact: string;
    lastSeen: string;
  };
};

type EmergencyMusterTableProps = {
  rows: MusterRow[];
  mode: "total" | "mustered" | "unmustered";
  onViewDetails: (row: MusterRow) => void;
};

export default function EmergencyMusterTable({
  rows,
  mode,
  onViewDetails,
}: EmergencyMusterTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#EAECF0]">
      <table className="w-full text-left">
        <thead className="bg-[#F2F4F7] text-[12px] font-medium text-[#667085]">
          <tr>
            <th className="px-4 py-3">RFID</th>
            <th className="px-4 py-3">Personnel Name</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">
              {mode === "unmustered" ? "Last Seen" : "Muster Time"}
            </th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[13px] text-[#475467]">
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[#EAECF0]">
              <td className="px-4 py-4 text-[#98A2B3]">{row.rfid}</td>
              <td className="px-4 py-4 font-medium text-[#101828]">{row.name}</td>
              <td className="px-4 py-4">{row.department}</td>
              <td className="px-4 py-4">
                {mode === "unmustered" ? row.lastSeen : row.timeLabel}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${
                    row.status === "Mustered"
                      ? "bg-[#EAF7EC] text-[#4E9765]"
                      : "bg-[#FEF3F2] text-[#F04438]"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                {row.status === "Not Mustered" ? (
                  <div className="inline-flex justify-center">
                    <EmergencyActionMenu onViewDetails={() => onViewDetails(row)} />
                  </div>
                ) : (
                  <span className="text-[#D0D5DD]">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
