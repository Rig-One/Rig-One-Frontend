"use client";

import { useMemo, useState } from "react";

import EmergencyMusterTable, { type MusterRow } from "./EmergencyMusterTable";
import PlanDrillModal from "./PlanDrillModal";
import UnmusteredDetailsModal from "./UnmusteredDetailsModal";

const tabs = ["Total Personnel", "Mustered", "Unmustered"] as const;
type EmergencyTab = (typeof tabs)[number];

const musteredRows: MusterRow[] = [
  {
    id: "m1",
    rfid: "RFID-1234",
    name: "Michael Johnson",
    department: "Drilling Operations",
    status: "Mustered",
    timeLabel: "45 sec ago",
  },
  {
    id: "m2",
    rfid: "RFID-5678",
    name: "Sarah Johnson",
    department: "Safety & HSE",
    status: "Mustered",
    timeLabel: "45 sec ago",
  },
  {
    id: "m3",
    rfid: "RFID-9012",
    name: "Sarah Williams",
    department: "Maintenance",
    status: "Mustered",
    timeLabel: "1 min ago",
  },
  {
    id: "m4",
    rfid: "RFID-3456",
    name: "Robert Brown",
    department: "Maintenance",
    status: "Mustered",
    timeLabel: "1 min ago",
  },
  {
    id: "m5",
    rfid: "RFID-7890",
    name: "Emily Davis",
    department: "Catering",
    status: "Mustered",
    timeLabel: "2 min ago",
  },
  {
    id: "m6",
    rfid: "RFID-2468",
    name: "James Wilson",
    department: "Catering",
    status: "Mustered",
    timeLabel: "2 min ago",
  },
  {
    id: "m7",
    rfid: "RFID-1357",
    name: "Patricia Martinez",
    department: "Drilling Operations",
    status: "Mustered",
    timeLabel: "3 min ago",
  },
  {
    id: "m8",
    rfid: "RFID-1358",
    name: "David Lee",
    department: "Medical",
    status: "Mustered",
    timeLabel: "24 min ago",
  },
  {
    id: "m9",
    rfid: "RFID-2469",
    name: "Sarah Johnson",
    department: "Medical",
    status: "Mustered",
    timeLabel: "1 hr ago",
  },
];

const unmusteredRows: MusterRow[] = [
  {
    id: "u1",
    rfid: "RFID-1234",
    name: "Michael Johnson",
    department: "Drilling Operations",
    status: "Not Mustered",
    lastSeen: "Cabin A-305 - 15 min ago",
    details: {
      name: "Michael Johnson",
      rfid: "RFID-1234",
      department: "Drilling Operations",
      cabin: "A-305",
      contact: "+234 0704 123 3456",
      lastSeen: "Cabin A-305 - 15 min ago",
    },
  },
  {
    id: "u2",
    rfid: "RFID-5678",
    name: "Sarah Johnson",
    department: "Safety & HSE",
    status: "Not Mustered",
    lastSeen: "Cabin A-305 - 15 min ago",
    details: {
      name: "Sarah Johnson",
      rfid: "RFID-5678",
      department: "Safety & HSE",
      cabin: "A-305",
      contact: "+234 0704 123 3456",
      lastSeen: "Cabin A-305 - 15 min ago",
    },
  },
  {
    id: "u3",
    rfid: "RFID-9012",
    name: "Sarah Williams",
    department: "Maintenance",
    status: "Not Mustered",
    lastSeen: "Cabin A-305 - 15 min ago",
    details: {
      name: "Sarah Williams",
      rfid: "RFID-9012",
      department: "Maintenance",
      cabin: "A-305",
      contact: "+234 0704 123 3456",
      lastSeen: "Cabin A-305 - 15 min ago",
    },
  },
  {
    id: "u4",
    rfid: "RFID-3456",
    name: "Robert Brown",
    department: "Maintenance",
    status: "Not Mustered",
    lastSeen: "Cabin A-305 - 15 min ago",
    details: {
      name: "Robert Brown",
      rfid: "RFID-3456",
      department: "Maintenance",
      cabin: "A-305",
      contact: "+234 0704 123 3456",
      lastSeen: "Cabin A-305 - 15 min ago",
    },
  },
  {
    id: "u5",
    rfid: "RFID-7890",
    name: "Emily Davis",
    department: "Catering",
    status: "Not Mustered",
    lastSeen: "Cabin A-305 - 15 min ago",
    details: {
      name: "Emily Davis",
      rfid: "RFID-7890",
      department: "Catering",
      cabin: "A-305",
      contact: "+234 0704 123 3456",
      lastSeen: "Cabin A-305 - 15 min ago",
    },
  },
  {
    id: "u6",
    rfid: "RFID-2468",
    name: "James Wilson",
    department: "Catering",
    status: "Not Mustered",
    lastSeen: "Engine Room - 8 min ago",
    details: {
      name: "James Wilson",
      rfid: "RFID-7890",
      department: "Drilling Operations",
      cabin: "A-305",
      contact: "+234 0704 123 3456",
      lastSeen: "Cabin A-305 - 15 min ago",
    },
  },
  {
    id: "u7",
    rfid: "RFID-1357",
    name: "Patricia Martinez",
    department: "Drilling Operations",
    status: "Not Mustered",
    lastSeen: "Engine Room - 8 min ago",
    details: {
      name: "Patricia Martinez",
      rfid: "RFID-1357",
      department: "Drilling Operations",
      cabin: "Engine Room",
      contact: "+234 0704 123 3456",
      lastSeen: "Engine Room - 8 min ago",
    },
  },
  {
    id: "u8",
    rfid: "RFID-1357",
    name: "David Lee",
    department: "Medical",
    status: "Not Mustered",
    lastSeen: "Medical Bay - 22 min ago",
    details: {
      name: "David Lee",
      rfid: "RFID-1357",
      department: "Medical",
      cabin: "Medical Bay",
      contact: "+234 0704 123 3456",
      lastSeen: "Medical Bay - 22 min ago",
    },
  },
  {
    id: "u9",
    rfid: "RFID-2468",
    name: "Sarah Johnson",
    department: "Medical",
    status: "Not Mustered",
    lastSeen: "Medical Bay - 22 min ago",
    details: {
      name: "Sarah Johnson",
      rfid: "RFID-2468",
      department: "Medical",
      cabin: "Medical Bay",
      contact: "+234 0704 123 3456",
      lastSeen: "Medical Bay - 22 min ago",
    },
  },
];

const totalRows: MusterRow[] = [
  ...musteredRows.slice(0, 5),
  ...unmusteredRows.slice(5, 9).map((row) => ({
    ...row,
    timeLabel: "-",
  })),
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10.5 18C14.64 18 18 14.64 18 10.5C18 6.36 14.64 3 10.5 3C6.36 3 3 6.36 3 10.5C3 14.64 6.36 18 10.5 18Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.5 16.5L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2L20 6V12C20 17 16.8 20.8 12 22C7.2 20.8 4 17 4 12V6L12 2Z" fill="currentColor" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 4L21 20H3L12 4Z" fill="currentColor" />
      <path d="M12 9V13" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="#ffffff" />
    </svg>
  );
}

export default function EmergencyDashboard() {
  const [activeTab, setActiveTab] = useState<EmergencyTab>("Total Personnel");
  const [query, setQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<MusterRow | null>(null);
  const [isPlanDrillOpen, setIsPlanDrillOpen] = useState(false);

  const sourceRows =
    activeTab === "Mustered"
      ? musteredRows
      : activeTab === "Unmustered"
        ? unmusteredRows
        : totalRows;

  const filteredRows = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return sourceRows;

    return sourceRows.filter((row) => {
      return (
        row.rfid.toLowerCase().includes(trimmed) ||
        row.name.toLowerCase().includes(trimmed) ||
        row.department.toLowerCase().includes(trimmed)
      );
    });
  }, [query, sourceRows]);

  return (
    <section>
      <div>
        <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#053361]">
          Emergency Management
        </h1>
        <p className="mt-1 text-[14px] text-[#667085]">
          Muster zones, drills, and emergency response
        </p>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <article className="rounded-lg bg-[#EEF5FC] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold text-[#344054]">Plan Drill</p>
              <p className="mt-1 max-w-[320px] text-[11px] text-[#667085]">
                Schedule a routine muster drill to ensure all personnel are familiar with emergency procedures.
              </p>
            </div>
            <span className="text-[#D1E9FF]">
              <ShieldIcon />
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsPlanDrillOpen(true)}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-[#053361] px-5 text-[13px] font-semibold text-white"
          >
            Schedule Drill
          </button>
        </article>

        <article className="rounded-lg bg-[#FEF3F2] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold text-[#344054]">Activate Emergency</p>
              <p className="mt-1 max-w-[340px] text-[11px] text-[#667085]">
                Activate emergency muster protocol. All personnel will be alerted to muster immediately using RFID cards.
              </p>
            </div>
            <span className="text-[#FCA19B]">
              <WarningIcon />
            </span>
          </div>
          <button
            type="button"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-[#D92D20] px-5 text-[13px] font-semibold text-white"
          >
            Activate Emergency
          </button>
        </article>
      </div>

      <div className="mt-8">
        <h2 className="text-[20px] font-semibold text-[#053361]">
          Personnel Muster Dashboard
        </h2>

        <div className="mt-4 grid gap-4 xl:grid-cols-3">
          <article className="rounded-lg bg-[#F2F4F7] p-4">
            <p className="text-[12px] text-[#667085]">Total Personnel</p>
            <p className="mt-3 text-[34px] font-semibold text-[#101828]">7</p>
          </article>
          <article className="rounded-lg bg-[#F2F4F7] p-4">
            <p className="text-[12px] text-[#667085]">Mustered</p>
            <p className="mt-3 text-[34px] font-semibold text-[#101828]">4</p>
          </article>
          <article className="rounded-lg bg-[#F2F4F7] p-4">
            <p className="text-[12px] text-[#667085]">Unmustered</p>
            <p className="mt-3 text-[34px] font-semibold text-[#101828]">3</p>
          </article>
        </div>
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

        <div className="mt-4">
          <div className="relative w-full max-w-[260px]">
            <span className="absolute inset-y-0 left-3 flex items-center text-[#98A2B3]">
              <SearchIcon />
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, department..."
              className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-10 pr-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
            />
          </div>

          <div className="mt-4">
            <EmergencyMusterTable
              rows={filteredRows}
              mode={
                activeTab === "Mustered"
                  ? "mustered"
                  : activeTab === "Unmustered"
                    ? "unmustered"
                    : "total"
              }
              onViewDetails={setSelectedRow}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-[12px] text-[#667085]">
            <p>Page 1 of 10</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-[12px] font-medium text-[#344054]"
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-[12px] font-medium text-[#344054]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <UnmusteredDetailsModal
        open={Boolean(selectedRow)}
        person={selectedRow?.details ?? null}
        onClose={() => setSelectedRow(null)}
      />
      <PlanDrillModal
        open={isPlanDrillOpen}
        onClose={() => setIsPlanDrillOpen(false)}
      />
    </section>
  );
}
