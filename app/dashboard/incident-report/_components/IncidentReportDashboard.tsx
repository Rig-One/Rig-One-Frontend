"use client";

import { useState } from "react";

import IncidentDetailsModal from "./IncidentDetailsModal";
import IncidentTable, { type IncidentRow } from "./IncidentTable";
import ReportIncidentModal from "./ReportIncidentModal";

const initialRows: IncidentRow[] = [
  {
    id: "INC-001",
    type: "Near Miss",
    location: "Drill Floor",
    severity: "Medium",
    reportedBy: "John Smith",
    date: "2025-01-10",
    status: "Under Review",
    rootCauseTitle: "Inadequate communication between shift teams during handover",
    primaryCause: "Inadequate communication between shift teams during handover",
    contributingFactors: "Fatigue, time pressure, lack of standardized handover checklist",
    capa: [
      "Implement mandatory digital handover checklist",
      "Schedule overlap time between shifts for thorough handover",
      "Conduct fatigue management training for all personnel",
      "Review and update communication protocols",
    ],
    similarIncidents: [
      {
        id: "INC-089",
        title: "Near Miss (2024-12-15)",
        description: "Same location, similar contributing factors",
      },
      {
        id: "INC-072",
        title: "Handover Communication Gap (2024-11-21)",
        description: "Fatigue-related handover miss during shift change",
      },
      {
        id: "INC-058",
        title: "Shift Coordination Delay (2024-10-30)",
        description: "Checklist omission during fast handover window",
      },
    ],
  },
  {
    id: "INC-002",
    type: "Injury",
    location: "Storage Tank A",
    severity: "High",
    reportedBy: "Sarah Johnson",
    date: "2025-01-10",
    status: "Reported",
    rootCauseTitle: "Permit verification was skipped before entry preparation started",
    primaryCause: "Permit verification was skipped before entry preparation started",
    contributingFactors: "Procedure gap, rushed planning, incomplete supervisor briefing",
    capa: [
      "Reinforce permit verification before job setup",
      "Add supervisor sign-off to confined space preparation",
      "Conduct refresher briefing on entry controls",
      "Audit compliance for the next 30 days",
    ],
    similarIncidents: [
      {
        id: "INC-063",
        title: "Permit Deviation (2024-11-09)",
        description: "Storage area task with similar workflow breakdown",
      },
    ],
  },
  {
    id: "INC-003",
    type: "Working at Height",
    location: "Derrick",
    severity: "Low",
    reportedBy: "Tom Brown",
    date: "2025-01-10",
    status: "Closed",
    rootCauseTitle: "Dropped tool risk from incomplete tether confirmation",
    primaryCause: "Dropped tool risk from incomplete tether confirmation",
    contributingFactors: "Checklist omission and poor pre-task inspection",
    capa: [
      "Update pre-task checklist for tool tether confirmation",
      "Repeat toolbox talk for height work teams",
      "Track compliance during weekly site walks",
      "Review and improve inspection sign-off",
    ],
    similarIncidents: [
      {
        id: "INC-041",
        title: "Dropped Tool Alert (2024-10-02)",
        description: "Comparable derrick work setup and control gap",
      },
    ],
  },
  {
    id: "INC-004",
    type: "Unsafe Condition",
    location: "Mud Pump Bay",
    severity: "Medium",
    reportedBy: "Ada Victor",
    date: "2025-01-11",
    status: "Under Review",
    rootCauseTitle: "Oil residue created a slip hazard around the access path",
    primaryCause: "Oil residue created a slip hazard around the access path",
    contributingFactors: "Delayed cleanup, poor shift handover, weak housekeeping checks",
    capa: [
      "Increase housekeeping inspection frequency",
      "Assign spill response ownership per shift",
      "Introduce cleanup sign-off before handover",
      "Audit hazard reporting response time weekly",
    ],
    similarIncidents: [
      {
        id: "INC-052",
        title: "Slip Hazard Alert (2024-09-28)",
        description: "Pump area access route had similar residue buildup",
      },
    ],
  },
  {
    id: "INC-005",
    type: "Equipment Damage",
    location: "Generator Room",
    severity: "Low",
    reportedBy: "Daniel Obi",
    date: "2025-01-11",
    status: "Closed",
    rootCauseTitle: "Minor casing dent during tool transfer",
    primaryCause: "Minor casing dent during tool transfer",
    contributingFactors: "Tight working space and weak spotter positioning",
    capa: [
      "Review lifting path before equipment movement",
      "Assign fixed spotter positions during transfers",
      "Refresh manual handling training",
      "Improve generator room staging layout",
    ],
    similarIncidents: [
      {
        id: "INC-027",
        title: "Tool Transfer Contact (2024-08-04)",
        description: "Restricted area movement caused light equipment damage",
      },
    ],
  },
  {
    id: "INC-006",
    type: "Fire",
    location: "Workshop",
    severity: "Medium",
    reportedBy: "Musa Ali",
    date: "2025-01-12",
    status: "Under Review",
    rootCauseTitle: "Heat source was left near combustible packaging",
    primaryCause: "Heat source was left near combustible packaging",
    contributingFactors: "Poor storage discipline and weak pre-task inspection",
    capa: [
      "Separate heat sources from combustible materials",
      "Add workshop fire point inspection before shift start",
      "Retrain technicians on fire prevention controls",
      "Post updated fire prevention signage in the workshop",
    ],
    similarIncidents: [
      {
        id: "INC-035",
        title: "Workshop Smoke Event (2024-10-12)",
        description: "Poor segregation of heat source and storage materials",
      },
    ],
  },
  {
    id: "INC-007",
    type: "Spill",
    location: "Chemical Storage",
    severity: "Low",
    reportedBy: "Ifeoma Nwa",
    date: "2025-01-12",
    status: "Closed",
    rootCauseTitle: "Loose cap caused slow chemical leak in storage",
    primaryCause: "Loose cap caused slow chemical leak in storage",
    contributingFactors: "Container inspection gap and improper sealing check",
    capa: [
      "Add container seal check to storage inspection",
      "Introduce secondary tray verification",
      "Retrain storekeepers on chemical handling",
      "Document leak checks during receipt and issue",
    ],
    similarIncidents: [
      {
        id: "INC-019",
        title: "Storage Leak Event (2024-07-18)",
        description: "Similar storage sealing issue on receipt inspection",
      },
    ],
  },
  {
    id: "INC-008",
    type: "Near Miss",
    location: "Pipe Deck",
    severity: "Low",
    reportedBy: "Grace Edet",
    date: "2025-01-13",
    status: "Closed",
    rootCauseTitle: "Improperly secured load shifted during handling",
    primaryCause: "Improperly secured load shifted during handling",
    contributingFactors: "Weak load check and rushed deck preparation",
    capa: [
      "Reinforce pre-lift load security verification",
      "Add supervisor spot-check before deck movements",
      "Refresh lifting and rigging awareness training",
      "Review pipe deck staging arrangement",
    ],
    similarIncidents: [
      {
        id: "INC-012",
        title: "Pipe Deck Near Miss (2024-06-22)",
        description: "Load shift event with matching deck handling controls",
      },
    ],
  },
];

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#F5B726" />
      <path d="M12 10V16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="7" r="1" fill="#ffffff" />
    </svg>
  );
}

export default function IncidentReportDashboard() {
  const [rows] = useState(initialRows);
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const totalIncidents = rows.length;
  const critical = rows.filter((row) => row.severity === "High").length;
  const underReview = rows.filter((row) => row.status === "Under Review").length;
  const closed = rows.filter((row) => row.status === "Closed").length;
  const activeIncident = rows.find((row) => row.id === activeIncidentId) ?? null;

  return (
    <section>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#053361]">
            Incident Reporting
          </h1>
          <p className="mt-1 inline-flex items-center gap-2 text-[14px] text-[#667085]">
            Track and manage safety incidents
            <InfoIcon />
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#053361] px-5 text-[14px] font-semibold text-white"
        >
          <PlusIcon />
          New Incident Report
        </button>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Total incidents</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">{totalIncidents}</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Critical</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">{critical}</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Under Review</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">{underReview}</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Closed</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">{closed}</p>
        </article>
      </div>

      <div className="mt-8">
        <h2 className="text-[24px] font-semibold text-[#053361]">All Incidents</h2>
        <p className="mt-1 text-[14px] text-[#667085]">View and manage all incident reports</p>
      </div>

      <div className="mt-4">
        <IncidentTable rows={rows} onViewDetails={setActiveIncidentId} />
      </div>

      <ReportIncidentModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <IncidentDetailsModal
        open={activeIncident !== null}
        incident={activeIncident}
        onClose={() => setActiveIncidentId(null)}
      />
    </section>
  );
}
