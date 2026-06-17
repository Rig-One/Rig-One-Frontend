export type HealthStatus = "Normal" | "Warning" | "Critical";

export type LiveHealthRow = {
  personnel: string;
  position: string;
  heartRate: string;
  heartRateTone: "normal" | "warning" | "critical";
  temperature: string;
  temperatureTone: "normal" | "warning" | "critical";
  bloodPressure: string;
  lastUpdate: string;
  status: HealthStatus;
};

type LiveHealthTableProps = {
  rows: LiveHealthRow[];
};

function textToneClasses(tone: LiveHealthRow["heartRateTone"]) {
  if (tone === "critical") return "text-[#F04438]";
  if (tone === "warning") return "text-[#F79009]";
  return "text-[#16B364]";
}

function statusClasses(status: HealthStatus) {
  if (status === "Warning") return "bg-[#FFF3DD] text-[#B76E00]";
  if (status === "Critical") return "bg-[#FEF3F2] text-[#F04438]";
  return "bg-[#EAF7EC] text-[#4E9765]";
}

export default function LiveHealthTable({ rows }: LiveHealthTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#EAECF0]">
      <table className="w-full text-left">
        <thead className="bg-[#F2F4F7] text-[12px] font-medium text-[#667085]">
          <tr>
            <th className="px-4 py-3">Personnel</th>
            <th className="px-4 py-3">Position</th>
            <th className="px-4 py-3">Heart Rate</th>
            <th className="px-4 py-3">Temperature</th>
            <th className="px-4 py-3">Blood Pressure</th>
            <th className="px-4 py-3">Last Update</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[13px] text-[#475467]">
          {rows.map((row) => (
            <tr key={row.personnel} className="border-t border-[#EAECF0]">
              <td className="px-4 py-5 font-medium text-[#344054]">{row.personnel}</td>
              <td className="px-4 py-5">{row.position}</td>
              <td className={`px-4 py-5 font-medium ${textToneClasses(row.heartRateTone)}`}>
                {row.heartRate}
              </td>
              <td className={`px-4 py-5 font-medium ${textToneClasses(row.temperatureTone)}`}>
                {row.temperature}
              </td>
              <td className="px-4 py-5">{row.bloodPressure}</td>
              <td className="px-4 py-5">{row.lastUpdate}</td>
              <td className="px-4 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${statusClasses(
                    row.status,
                  )}`}
                >
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
