import IncidentActionMenu from "./IncidentActionMenu";

export type IncidentStatus = "Reported" | "Under Review" | "Closed";
export type IncidentSeverity = "High" | "Medium" | "Low";

export type IncidentRow = {
  id: string;
  type: string;
  location: string;
  severity: IncidentSeverity;
  reportedBy: string;
  date: string;
  status: IncidentStatus;
  rootCauseTitle: string;
  primaryCause: string;
  contributingFactors: string;
  capa: string[];
  similarIncidents: {
    id: string;
    title: string;
    description: string;
  }[];
};

type IncidentTableProps = {
  rows: IncidentRow[];
  onViewDetails: (id: string) => void;
};

function severityClasses(severity: IncidentSeverity) {
  if (severity === "High") return "bg-[#FEF3F2] text-[#F04438]";
  if (severity === "Medium") return "bg-[#FFF3DD] text-[#B76E00]";
  return "bg-[#EAF7EC] text-[#4E9765]";
}

function statusClasses(status: IncidentStatus) {
  if (status === "Reported") return "bg-[#EAF7EC] text-[#4E9765]";
  if (status === "Under Review") return "bg-[#FFF3DD] text-[#B76E00]";
  return "bg-[#EAECF5] text-[#475467]";
}

export default function IncidentTable({ rows, onViewDetails }: IncidentTableProps) {
  return (
    <div className="overflow-visible rounded-lg border border-[#EAECF0]">
      <table className="w-full text-left">
        <thead className="bg-[#F2F4F7] text-[12px] font-medium text-[#667085]">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Severity</th>
            <th className="px-4 py-3">Reported By</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[13px] text-[#475467]">
          {rows.map((row, index) => (
            <tr key={row.id} className="border-t border-[#EAECF0]">
              <td className="px-4 py-5 text-[#667085]">{row.id}</td>
              <td className="px-4 py-5 font-medium text-[#101828]">{row.type}</td>
              <td className="px-4 py-5">{row.location}</td>
              <td className="px-4 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${severityClasses(
                    row.severity,
                  )}`}
                >
                  {row.severity}
                </span>
              </td>
              <td className="px-4 py-5">{row.reportedBy}</td>
              <td className="px-4 py-5">{row.date}</td>
              <td className="px-4 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${statusClasses(
                    row.status,
                  )}`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-5 text-center">
                <div className="inline-flex justify-center">
                  <IncidentActionMenu
                    direction={index >= rows.length - 2 ? "up" : "down"}
                    onViewDetails={() => onViewDetails(row.id)}
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
