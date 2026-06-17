"use client";

import { useState } from "react";

import LiveHealthTable, { type LiveHealthRow } from "./LiveHealthTable";
import LogMedicVisitModal from "./LogMedicVisitModal";
import MedicVisitsTable, { type MedicVisitRow } from "./MedicVisitsTable";

const tabs = ["Health Monitoring", "Medic Visits"] as const;
type MedicTab = (typeof tabs)[number];

const liveHealthRows: LiveHealthRow[] = [
  {
    personnel: "John Smith",
    position: "Driller",
    heartRate: "85 bpm",
    heartRateTone: "normal",
    temperature: "37.2°C",
    temperatureTone: "normal",
    bloodPressure: "120/80",
    lastUpdate: "2 mins ago",
    status: "Normal",
  },
  {
    personnel: "Sarah Johnson",
    position: "Assistant Driller",
    heartRate: "105 bpm",
    heartRateTone: "critical",
    temperature: "37.8°C",
    temperatureTone: "warning",
    bloodPressure: "135/85",
    lastUpdate: "1 min ago",
    status: "Warning",
  },
  {
    personnel: "Tom Brown",
    position: "Roughneck",
    heartRate: "78 bpm",
    heartRateTone: "normal",
    temperature: "36.8°C",
    temperatureTone: "normal",
    bloodPressure: "118/75",
    lastUpdate: "3 mins ago",
    status: "Critical",
  },
];

const initialVisits: MedicVisitRow[] = [
  {
    personnel: "John Smith",
    complaint: "Headache and mild fever",
    diagnosis: "Common cold",
    treatment: "Paracetamol 500mg,...",
    medic: "120/80",
    visitDate: "2024-11-03 14:30",
    followUp: "2024-11-05",
  },
  {
    personnel: "Sarah Johnson",
    complaint: "Chest pain, difficulty breathing",
    diagnosis: "Heat exhaustion",
    treatment: "IV fluids, cooling...",
    medic: "135/85",
    visitDate: "2024-11-03 09:15",
    followUp: "2024-11-05",
  },
  {
    personnel: "Tom Brown",
    complaint: "Minor cut on hand",
    diagnosis: "Laceration - right hand",
    treatment: "Cleaned, dressed,...",
    medic: "118/75",
    visitDate: "2024-11-02 16:45",
    followUp: "-",
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

export default function MedicDashboard() {
  const [activeTab, setActiveTab] = useState<MedicTab>("Health Monitoring");
  const [isLogVisitOpen, setIsLogVisitOpen] = useState(false);
  const [visitRows, setVisitRows] = useState(initialVisits);

  return (
    <section>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#053361]">Medic</h1>
          <p className="mt-1 text-[14px] text-[#667085]">
            Health monitoring and medical records
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsLogVisitOpen(true)}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#053361] px-5 text-[14px] font-semibold text-white"
        >
          <PlusIcon />
          Log Medic Visit
        </button>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Total Personnel</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">24</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Normal</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">20</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Warning</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">3</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Critical</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">1</p>
        </article>
      </div>

      <div className="mt-8 rounded-lg border border-[#EAECF0] bg-white p-4">
        <div className="flex gap-6 border-b border-[#EAECF0]">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-2 pb-3 text-[12px] font-medium transition ${
                activeTab === tab
                  ? "border-[#F97316] text-[#F97316]"
                  : "border-transparent text-[#98A2B3] hover:text-[#667085]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Health Monitoring" ? (
          <div className="mt-6">
            <h2 className="text-[28px] font-semibold text-[#053361]">Live Health Data</h2>
            <p className="mt-1 text-[14px] text-[#667085]">Real-time vitals from RFID wearables</p>
            <div className="mt-4">
              <LiveHealthTable rows={liveHealthRows} />
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="text-[28px] font-semibold text-[#053361]">Medic Visit History</h2>
            <p className="mt-1 text-[14px] text-[#667085]">
              Record of all medical consultations and treatments
            </p>
            <div className="mt-4">
              <MedicVisitsTable rows={visitRows} />
            </div>
          </div>
        )}
      </div>

      <LogMedicVisitModal
        open={isLogVisitOpen}
        onClose={() => setIsLogVisitOpen(false)}
        onSubmit={(values) => {
          setVisitRows((current) => [
            {
              personnel: values.personnel,
              complaint: values.complaint,
              diagnosis: values.diagnosis,
              treatment:
                values.treatment.length > 20 ? `${values.treatment.slice(0, 20)}...` : values.treatment,
              medic: values.medicName,
              visitDate: values.visitDate || "-",
              followUp: values.followUpDate ? formatFollowUp(values.followUpDate) : "-",
            },
            ...current,
          ]);
        }}
      />
    </section>
  );
}

function formatFollowUp(value: string) {
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${year}-${month}-${day}`;
}
