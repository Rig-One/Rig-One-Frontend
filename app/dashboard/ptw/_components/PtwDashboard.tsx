"use client";

import { useState } from "react";

import CreatePtwModal from "./CreatePtwModal";
import PtwTable, { type PtwRow } from "./PtwTable";

const initialRows: PtwRow[] = [
  {
    id: "PTW-001",
    jobType: "Hot Work",
    location: "Drill Floor",
    routedTo: ["HSE Officer", "Shift Supervisor"],
    aiRisk: "High",
    requestedBy: "John Smith",
    dateCreated: "2025-01-10",
    status: "Approved",
  },
  {
    id: "PTW-002",
    jobType: "Confined Space Entry",
    location: "Storage Tank A",
    routedTo: ["Shift Supervisor"],
    aiRisk: "Medium",
    requestedBy: "Sarah Johnson",
    dateCreated: "2025-01-10",
    status: "Pending",
  },
  {
    id: "PTW-003",
    jobType: "Working at Height",
    location: "Derrick",
    routedTo: ["OPM/Toolpusher"],
    aiRisk: "Low",
    requestedBy: "Tom Brown",
    dateCreated: "2025-01-10",
    status: "Closed",
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

export default function PtwDashboard() {
  const [rows, setRows] = useState(initialRows);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const totalPtw = rows.length;
  const pendingApproval = rows.filter((row) => row.status === "Pending").length;
  const active = rows.filter((row) => row.status === "Approved").length;
  const closed = rows.filter((row) => row.status === "Closed").length;

  return (
    <section>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#053361]">
            Permit to Work (PTW)
          </h1>
          <p className="mt-1 inline-flex items-center gap-2 text-[14px] text-[#667085]">
            Manage work permits and safety authorizations
            <InfoIcon />
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#053361] px-5 text-[14px] font-semibold text-white"
        >
          <PlusIcon />
          Create New PTW
        </button>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Total PTW</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">{totalPtw}</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Pending Approval</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">{pendingApproval}</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Active</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">{active}</p>
        </article>
        <article className="rounded-lg bg-[#F2F4F7] p-4">
          <p className="text-[12px] text-[#344054]">Closed</p>
          <p className="mt-3 text-[34px] font-semibold text-[#101828]">{closed}</p>
        </article>
      </div>

      <div className="mt-8">
        <h2 className="text-[24px] font-semibold text-[#053361]">All Permits</h2>
        <p className="mt-1 text-[14px] text-[#667085]">View and manage all work permits</p>
      </div>

      <div className="mt-4">
        <PtwTable
          rows={rows}
          onApprove={(id) => {
            setRows((current) =>
              current.map((row) =>
                row.id === id ? { ...row, status: "Approved" } : row,
              ),
            );
          }}
          onReject={(id) => {
            setRows((current) =>
              current.map((row) =>
                row.id === id ? { ...row, status: "Closed" } : row,
              ),
            );
          }}
        />
      </div>

      <CreatePtwModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </section>
  );
}
