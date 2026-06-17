"use client";

import { useMemo, useState } from "react";

import FeedingLogTable, { type FeedingLogRow } from "./FeedingLogTable";
import HousekeepingLogTable, { type HousekeepingLogRow } from "./HousekeepingLogTable";

const tabs = ["Feeding", "Housekeeping"] as const;
type FeedingTab = (typeof tabs)[number];

const feedingRows: FeedingLogRow[] = [
  {
    personnel: "Emily Davis",
    breakfast: "-",
    lunch: "12:15 PM",
    dinner: "06:15 pm",
    method: "Biometrics",
  },
  {
    personnel: "James Wilson",
    breakfast: "07:45 AM",
    lunch: "12:45 PM",
    dinner: "06:45 pm",
    method: "Biometrics",
  },
  {
    personnel: "Michael Johnson",
    breakfast: "07:15 AM",
    lunch: "-",
    dinner: "-",
    method: "Biometrics",
  },
];

const housekeepingRows: HousekeepingLogRow[] = [
  {
    personnel: "Emily Davis",
    service: "Laundry",
    time: "12:15 PM",
    items: "3 Items",
  },
  {
    personnel: "James Wilson",
    service: "Room Cleaning",
    time: "12:45 PM",
    items: "-",
  },
  {
    personnel: "Michael Johnson",
    service: "Linen Change",
    time: "03:15 PM",
    items: "5 Items",
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
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M5 7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
      <path d="M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 11.5L12 8L15.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 19H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FeedingDashboard() {
  const [activeTab, setActiveTab] = useState<FeedingTab>("Feeding");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeedingRows = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return feedingRows;
    return feedingRows.filter((row) => row.personnel.toLowerCase().includes(trimmed));
  }, [searchQuery]);

  const filteredHousekeepingRows = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return housekeepingRows;
    return housekeepingRows.filter((row) => row.personnel.toLowerCase().includes(trimmed));
  }, [searchQuery]);

  return (
    <section>
      <div>
        <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#053361]">
          Feeding Management
        </h1>
        <p className="mt-1 text-[14px] text-[#667085]">Track meal service and attendance logs</p>
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

        {activeTab === "Feeding" ? (
          <div className="mt-4">
            <div className="grid gap-4 xl:grid-cols-3">
              <article className="rounded-lg bg-[#F2F4F7] p-4">
                <p className="text-[16px] text-[#344054]">Breakfast</p>
                <p className="mt-3 text-[34px] font-semibold text-[#101828]">84</p>
                <p className="text-[12px] text-[#98A2B3]">Meals served today</p>
              </article>
              <article className="rounded-lg bg-[#F2F4F7] p-4">
                <p className="text-[16px] text-[#344054]">Lunch</p>
                <p className="mt-3 text-[34px] font-semibold text-[#101828]">87</p>
                <p className="text-[12px] text-[#98A2B3]">Meals served today</p>
              </article>
              <article className="rounded-lg bg-[#F2F4F7] p-4">
                <p className="text-[16px] text-[#344054]">Dinner</p>
                <p className="mt-3 text-[34px] font-semibold text-[#101828]">77</p>
                <p className="text-[12px] text-[#98A2B3]">Meals served today</p>
              </article>
            </div>

            <div className="mt-8">
              <h2 className="text-[28px] font-semibold text-[#053361]">Live Feeding Log</h2>
              <p className="mt-1 text-[14px] text-[#667085]">View and manage all work permits</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#98A2B3]">
                  <SearchIcon />
                </span>
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by name, role..."
                  className="h-10 w-[280px] rounded-lg border border-[#D0D5DD] bg-white pl-10 pr-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3]"
                />
              </div>

              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 text-[13px] font-medium text-[#667085]"
              >
                <SortIcon />
                Sort by Name
                <ChevronDownIcon />
              </button>

              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 text-[13px] font-medium text-[#667085]"
              >
                <UploadIcon />
                Bulk Upload
              </button>

              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 text-[13px] font-medium text-[#667085]"
              >
                <DownloadIcon />
                Export
              </button>
            </div>

            <div className="mt-4">
              <FeedingLogTable rows={filteredFeedingRows} />
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <div className="grid gap-4 xl:grid-cols-2">
              <article className="rounded-lg bg-[#F2F4F7] p-4">
                <p className="text-[16px] text-[#344054]">Laundry</p>
                <p className="mt-3 text-[34px] font-semibold text-[#101828]">42</p>
                <p className="text-[12px] text-[#98A2B3]">Service Today</p>
              </article>
              <article className="rounded-lg bg-[#F2F4F7] p-4">
                <p className="text-[16px] text-[#344054]">Room Cleaning</p>
                <p className="mt-3 text-[34px] font-semibold text-[#101828]">87</p>
                <p className="text-[12px] text-[#98A2B3]">Service Today</p>
              </article>
            </div>

            <div className="mt-8 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[28px] font-semibold text-[#053361]">Live Feeding Log</h2>
              </div>
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 text-[13px] font-medium text-[#667085]"
              >
                <DownloadIcon />
                Export
              </button>
            </div>

            <div className="mt-4">
              <HousekeepingLogTable rows={filteredHousekeepingRows} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
