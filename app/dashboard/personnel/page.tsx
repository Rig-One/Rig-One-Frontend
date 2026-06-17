"use client";

import { useMemo, useState } from "react";

import BulkUploadModal from "./_components/BulkUploadModal";
import CheckInPersonnelModal from "./_components/CheckInPersonnelModal";
import PersonnelTable from "./_components/PersonnelTable";

type PersonnelRow = {
  id: string;
  name: string;
  company: string;
  role: string;
  arrival: string;
  departure: string;
  status: "Active" | "Inactive";
};

const rows: PersonnelRow[] = [
  {
    id: "john-smith",
    name: "John Smith",
    company: "Acme Drilling",
    role: "Driller",
    arrival: "2024-01-15",
    departure: "2024-02-15",
    status: "Active",
  },
  {
    id: "sarah-johnson-1",
    name: "Sarah Johnson",
    company: "Safety First Ltd",
    role: "Safety Officer",
    arrival: "2024-01-10",
    departure: "2024-02-15",
    status: "Active",
  },
  {
    id: "sarah-johnson-2",
    name: "Sarah Johnson",
    company: "Safety First Ltd",
    role: "Safety Officer",
    arrival: "2024-01-15",
    departure: "2024-02-15",
    status: "Active",
  },
  {
    id: "sarah-johnson-3",
    name: "Sarah Johnson",
    company: "Safety First Ltd",
    role: "Safety Officer",
    arrival: "2024-01-15",
    departure: "2024-02-15",
    status: "Active",
  },
  {
    id: "sarah-johnson-4",
    name: "Sarah Johnson",
    company: "Safety First Ltd",
    role: "Safety Officer",
    arrival: "2024-01-15",
    departure: "2024-02-15",
    status: "Inactive",
  },
  {
    id: "sarah-johnson-5",
    name: "Sarah Johnson",
    company: "Safety First Ltd",
    role: "Safety Officer",
    arrival: "2024-01-15",
    departure: "2024-02-15",
    status: "Inactive",
  },
  {
    id: "sarah-johnson-6",
    name: "Sarah Johnson",
    company: "Safety First Ltd",
    role: "Safety Officer",
    arrival: "2024-01-15",
    departure: "2024-02-15",
    status: "Inactive",
  },
  {
    id: "sarah-johnson-7",
    name: "Sarah Johnson",
    company: "Safety First Ltd",
    role: "Safety Officer",
    arrival: "2024-01-15",
    departure: "2024-02-15",
    status: "Inactive",
  },
  {
    id: "sarah-johnson-8",
    name: "Sarah Johnson",
    company: "Safety First Ltd",
    role: "Safety Officer",
    arrival: "2024-01-15",
    departure: "2024-02-15",
    status: "Inactive",
  },
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

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 3V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 7L12 3L16 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 14V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 5V19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PersonnelPage() {
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return rows;

    return rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(trimmed) ||
        row.company.toLowerCase().includes(trimmed) ||
        row.role.toLowerCase().includes(trimmed)
      );
    });
  }, [query]);

  return (
    <section>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#053361]">
            Personnel Management
          </h1>
          <p className="mt-1 text-[14px] text-[#667085]">
            Manage onboard personnel and track assignments
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCheckInOpen(true)}
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#053361] px-5 py-3 text-[14px] font-semibold text-white"
        >
          <PlusIcon />
          Check-in Personnel
        </button>
      </div>

      <div className="mt-6 rounded-lg border border-[#EAECF0] bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative w-full max-w-[420px]">
            <span className="absolute inset-y-0 left-3 flex items-center text-[#98A2B3]">
              <SearchIcon />
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, role..."
              className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-10 pr-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsBulkUploadOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-[13px] font-medium text-[#344054]"
          >
            <UploadIcon />
            Bulk Upload
          </button>
        </div>

        <div className="mt-4">
          <PersonnelTable rows={filteredRows} />
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

      <CheckInPersonnelModal
        open={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
      />
      <BulkUploadModal
        open={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
      />
    </section>
  );
}
