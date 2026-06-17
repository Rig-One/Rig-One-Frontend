"use client";

import { useEffect, useState } from "react";

import ActiveWorkersTable from "./ActiveWorkersTable";
import EndShiftModal from "./EndShiftModal";
import ShiftLogExportModal from "./ShiftLogExportModal";
import ShiftLogsTable from "./ShiftLogsTable";
import StartShiftModal from "./StartShiftModal";

const tabs = ["Active Workers", "Shift Logs"] as const;
type ShiftLogTab = (typeof tabs)[number];

const activeWorkers = [
  {
    id: "W-001",
    name: "Michael Johnson",
    department: "Drilling Operations",
    status: "Active",
  },
  {
    id: "W-002",
    name: "Sarah Johnson",
    department: "Safety & HSE",
    status: "Active",
  },
  {
    id: "W-003",
    name: "Sarah Williams",
    department: "Maintenance",
    status: "Active",
  },
  {
    id: "W-004",
    name: "Robert Brown",
    department: "Maintenance",
    status: "Active",
  },
];

const shiftLogs = [
  {
    id: "SL-001",
    supervisor: "Michael Johnson",
    shift: "Day" as const,
    incidents: 0,
    risk: "Green" as const,
    date: "2024-01-15",
  },
  {
    id: "SL-002",
    supervisor: "Sarah Johnson",
    shift: "Day" as const,
    incidents: 2,
    risk: "Green" as const,
    date: "2024-01-15",
  },
  {
    id: "SL-003",
    supervisor: "Sarah Williams",
    shift: "Night" as const,
    incidents: 2,
    risk: "Amber" as const,
    date: "2024-01-15",
  },
  {
    id: "SL-004",
    supervisor: "Robert Brown",
    shift: "Night" as const,
    incidents: 1,
    risk: "Amber" as const,
    date: "2024-01-15",
  },
];

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8 6L18 12L8 18V6Z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 19H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ToastCloseIcon() {
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

export default function ShiftLogDashboard() {
  const [activeTab, setActiveTab] = useState<ShiftLogTab>("Active Workers");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isStartShiftOpen, setIsStartShiftOpen] = useState(false);
  const [isEndShiftOpen, setIsEndShiftOpen] = useState(false);
  const [startShiftToast, setStartShiftToast] = useState<{
    workerName: string;
    location: string;
  } | null>(null);
  const [endShiftToast, setEndShiftToast] = useState<{
    workerName: string;
    location: string;
  } | null>(null);

  useEffect(() => {
    if (!startShiftToast) return;
    const timeout = window.setTimeout(() => setStartShiftToast(null), 3500);
    return () => window.clearTimeout(timeout);
  }, [startShiftToast]);

  useEffect(() => {
    if (!endShiftToast) return;
    const timeout = window.setTimeout(() => setEndShiftToast(null), 3500);
    return () => window.clearTimeout(timeout);
  }, [endShiftToast]);

  return (
    <section>
      {startShiftToast ? (
        <div className="fixed right-6 top-6 z-[60] w-[320px] overflow-hidden rounded-lg bg-white shadow-[0_18px_55px_rgba(0,0,0,0.22)]">
          <div className="flex items-start gap-3 border-l-4 border-[#F97316] px-4 py-3">
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-[#101828]">Shift Started</p>
              <p className="mt-1 text-[12px] text-[#667085]">
                {startShiftToast.workerName} • {startShiftToast.location}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStartShiftToast(null)}
              className="text-[#98A2B3]"
              aria-label="Close shift started toast"
            >
              <ToastCloseIcon />
            </button>
          </div>
        </div>
      ) : null}
      {endShiftToast ? (
        <div className="fixed right-6 top-6 z-[60] w-[320px] overflow-hidden rounded-lg bg-white shadow-[0_18px_55px_rgba(0,0,0,0.22)]">
          <div className="flex items-start gap-3 border-l-4 border-[#F04438] px-4 py-3">
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-[#101828]">Shift Ended</p>
              <p className="mt-1 text-[12px] text-[#667085]">
                {endShiftToast.workerName} • {endShiftToast.location}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEndShiftToast(null)}
              className="text-[#98A2B3]"
              aria-label="Close shift ended toast"
            >
              <ToastCloseIcon />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#053361]">
            Shift Log
          </h1>
          <p className="mt-1 text-[14px] text-[#667085]">Apr 8, 2026 • Day Shift</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setIsStartShiftOpen(true)}
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#16B364] px-5 text-[14px] font-semibold text-white"
          >
            <PlayIcon />
            Start Shift
            <span className="text-[12px] font-medium text-white/90">Tap to clock in</span>
          </button>
          <button
            type="button"
            onClick={() => setIsEndShiftOpen(true)}
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#F04438] px-5 text-[14px] font-semibold text-white"
          >
            <StopIcon />
            End Shift
            <span className="text-[12px] font-medium text-white/90">Tap to clock out</span>
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">On Shift Now</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">4</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Off Shift</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">2</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Incidents Today</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">1</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Shift Risk</p>
          <p className="mt-3 text-[34px] font-semibold text-[#F97316]">Amber</p>
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

        {activeTab === "Active Workers" ? (
          <div className="mt-6">
            <h2 className="text-[28px] font-semibold text-[#053361]">Currently On Shift</h2>
            <p className="mt-1 text-[14px] text-[#667085]">4 workers active</p>
            <div className="mt-4">
              <ActiveWorkersTable rows={activeWorkers} />
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[28px] font-semibold text-[#053361]">Shift Logs</h2>
                <p className="mt-1 text-[14px] text-[#667085]">Recent shift log history</p>
              </div>
              <button
                type="button"
                onClick={() => setIsExportOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 text-[13px] font-medium text-[#667085]"
              >
                <DownloadIcon />
                Export
              </button>
            </div>

            <div className="mt-4">
              <ShiftLogsTable rows={shiftLogs} />
            </div>
          </div>
        )}
      </div>

      <ShiftLogExportModal
        open={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
      <StartShiftModal
        open={isStartShiftOpen}
        onClose={() => setIsStartShiftOpen(false)}
        onSubmit={(values) => {
          setStartShiftToast(values);
        }}
      />
      <EndShiftModal
        open={isEndShiftOpen}
        onClose={() => setIsEndShiftOpen(false)}
        onSubmit={(values) => {
          setEndShiftToast(values);
        }}
      />
    </section>
  );
}
