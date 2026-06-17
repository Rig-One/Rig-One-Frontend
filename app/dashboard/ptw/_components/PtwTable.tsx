import PtwActionMenu from "./PtwActionMenu";

export type PtwStatus = "Approved" | "Pending" | "Closed";

export type PtwRow = {
  id: string;
  jobType: string;
  description: string;
  location: string;
  department: string;
  routedTo: string[];
  aiRisk: "High" | "Medium" | "Low";
  requestedBy: string;
  dateCreated: string;
  validity: string;
  controlMeasures: string[];
  reviewNote: string;
  reviewedBy?: string;
  reviewedAt?: string;
  status: PtwStatus;
};

type PtwTableProps = {
  rows: PtwRow[];
  onViewDetails: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

function statusClasses(status: PtwStatus) {
  if (status === "Approved") return "bg-[#EAF7EC] text-[#4E9765]";
  if (status === "Pending") return "bg-[#FFF3DD] text-[#B76E00]";
  return "bg-[#EAECF5] text-[#475467]";
}

function riskClasses(risk: PtwRow["aiRisk"]) {
  if (risk === "High") return "bg-[#FEF3F2] text-[#F04438]";
  if (risk === "Medium") return "bg-[#FFF3DD] text-[#B76E00]";
  return "bg-[#EAF7EC] text-[#4E9765]";
}

export default function PtwTable({ rows, onViewDetails, onApprove, onReject }: PtwTableProps) {
  return (
    <div className="overflow-visible rounded-lg border border-[#EAECF0]">
      <table className="w-full text-left">
        <thead className="bg-[#F2F4F7] text-[12px] font-medium text-[#667085]">
          <tr>
            <th className="px-4 py-3">PTW-ID</th>
            <th className="px-4 py-3">Job Type</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Routed To</th>
            <th className="px-4 py-3">AI Risk</th>
            <th className="px-4 py-3">Requested By</th>
            <th className="px-4 py-3">Date Created</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[13px] text-[#475467]">
          {rows.map((row, index) => (
            <tr key={row.id} className="border-t border-[#EAECF0]">
              <td className="px-4 py-5 text-[#667085]">{row.id}</td>
              <td className="px-4 py-5 font-medium text-[#101828]">{row.jobType}</td>
              <td className="px-4 py-5">{row.location}</td>
              <td className="px-4 py-5">
                <div className="flex flex-wrap gap-2">
                  {row.routedTo.map((person) => (
                    <span
                      key={person}
                      className="inline-flex rounded-full bg-[#F2F4F7] px-3 py-1 text-[12px] font-medium text-[#475467]"
                    >
                      {person}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${riskClasses(row.aiRisk)}`}
                >
                  {row.aiRisk}
                </span>
              </td>
              <td className="px-4 py-5">{row.requestedBy}</td>
              <td className="px-4 py-5">{row.dateCreated}</td>
              <td className="px-4 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${statusClasses(row.status)}`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-5 text-center">
                <div className="inline-flex justify-center">
                  <PtwActionMenu
                    status={row.status}
                    direction={index >= rows.length - 2 ? "up" : "down"}
                    onViewDetails={() => onViewDetails(row.id)}
                    onApprove={() => onApprove(row.id)}
                    onReject={() => onReject(row.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
