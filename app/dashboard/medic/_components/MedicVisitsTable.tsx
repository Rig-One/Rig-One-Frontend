export type MedicVisitRow = {
  personnel: string;
  complaint: string;
  diagnosis: string;
  treatment: string;
  medic: string;
  visitDate: string;
  followUp: string;
};

type MedicVisitsTableProps = {
  rows: MedicVisitRow[];
};

export default function MedicVisitsTable({ rows }: MedicVisitsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#EAECF0]">
      <table className="w-full text-left">
        <thead className="bg-[#F2F4F7] text-[12px] font-medium text-[#667085]">
          <tr>
            <th className="px-4 py-3">Personnel</th>
            <th className="px-4 py-3">Complaint</th>
            <th className="px-4 py-3">Diagnosis</th>
            <th className="px-4 py-3">Treatment</th>
            <th className="px-4 py-3">Medic</th>
            <th className="px-4 py-3">Visit Date</th>
            <th className="px-4 py-3">Follow-up</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[13px] text-[#475467]">
          {rows.map((row, index) => (
            <tr key={`${row.personnel}-${index}`} className="border-t border-[#EAECF0]">
              <td className="px-4 py-5 font-medium text-[#344054]">{row.personnel}</td>
              <td className="px-4 py-5">{row.complaint}</td>
              <td className="px-4 py-5">{row.diagnosis}</td>
              <td className="px-4 py-5">{row.treatment}</td>
              <td className="px-4 py-5">{row.medic}</td>
              <td className="px-4 py-5">{row.visitDate}</td>
              <td className="px-4 py-5">
                {row.followUp === "-" ? (
                  <span className="text-[#98A2B3]">-</span>
                ) : (
                  <span className="inline-flex rounded-full bg-[#D9ECFF] px-3 py-1 text-[12px] font-medium text-[#175CD3]">
                    {row.followUp}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
