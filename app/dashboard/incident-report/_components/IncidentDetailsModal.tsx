"use client";

import type { IncidentRow } from "./IncidentTable";

type IncidentDetailsModalProps = {
  open: boolean;
  incident: IncidentRow | null;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 3L21 19H3L12 3Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}

function statusClasses(status: IncidentRow["status"]) {
  if (status === "Reported") return "bg-[#EAF7EC] text-[#4E9765]";
  if (status === "Under Review") return "bg-[#FFF3DD] text-[#B76E00]";
  return "bg-[#EAECF5] text-[#475467]";
}

function riskClasses(severity: IncidentRow["severity"]) {
  if (severity === "High") return "bg-[#FEF3F2] text-[#F04438]";
  if (severity === "Medium") return "bg-[#FFF3DD] text-[#B76E00]";
  return "bg-[#EAF7EC] text-[#4E9765]";
}

export default function IncidentDetailsModal({
  open,
  incident,
  onClose,
}: IncidentDetailsModalProps) {
  if (!open || !incident) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-0 overflow-y-auto px-4 py-10">
        <div className="flex min-h-full items-center justify-center">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-[470px] rounded-[12px] bg-white px-4 pb-4 pt-3 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="text-[#667085]"
                aria-label="Close incident details modal"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="-mt-1 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-[#0B4A8B]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCEBFA]">
                  <AlertIcon />
                </div>
              </div>
              <h2 className="mt-4 text-[14px] font-semibold text-[#053361]">
                Incident Report Details
              </h2>
              <p className="mt-1 text-[12px] text-[#98A2B3]">Incident ID: {incident.id}</p>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-3 border-b border-[#EAECF0] pb-4">
              <div>
                <p className="text-[10px] text-[#667085]">Type</p>
                <p className="mt-1 text-[12px] font-medium text-[#344054]">{incident.type}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#667085]">AI Risk Level</p>
                <span
                  className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${riskClasses(
                    incident.severity,
                  )}`}
                >
                  {incident.severity}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-[#667085]">Location</p>
                <p className="mt-1 text-[12px] font-medium text-[#344054]">{incident.location}</p>
              </div>
              <div className="flex justify-end">
                <span
                  className={`inline-flex h-fit rounded-full px-3 py-1 text-[11px] font-medium ${statusClasses(
                    incident.status,
                  )}`}
                >
                  {incident.status}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-[8px] border border-[#EAECF0] bg-[#F9FAFB] p-4">
              <h3 className="text-[12px] font-semibold text-[#053361]">
                AI Root Cause Analysis
              </h3>
              <div className="mt-4 space-y-3 text-[12px] leading-6 text-[#667085]">
                <p>
                  <span className="font-semibold text-[#475467]">Primary Cause:</span>{" "}
                  {incident.primaryCause}
                </p>
                <p>
                  <span className="font-semibold text-[#475467]">Contributing Factors:</span>{" "}
                  {incident.contributingFactors}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[8px] border border-[#EAECF0] bg-[#F9FAFB] p-4">
              <h3 className="text-[12px] font-semibold text-[#053361]">
                AI-Suggested CAPA (Corrective & Preventive Actions)
              </h3>
              <div className="mt-4 space-y-3 text-[12px] leading-6 text-[#667085]">
                {incident.capa.map((item, index) => (
                  <p key={item}>
                    {index + 1}. {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <h3 className="text-[12px] font-semibold text-[#053361]">Similar Past Incidents</h3>
              <p className="mt-2 text-[10px] text-[#98A2B3]">
                {incident.similarIncidents.length} similar incidents found in the last 6 months
              </p>
              <div className="mt-3 space-y-2 border-b border-[#EAECF0] pb-3">
                {incident.similarIncidents.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[8px] border border-[#EAECF0] bg-white px-3 py-2"
                  >
                    <p className="text-[12px] font-medium text-[#344054]">
                      {item.id} - {item.title}
                    </p>
                    <p className="mt-1 text-[10px] text-[#98A2B3]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
