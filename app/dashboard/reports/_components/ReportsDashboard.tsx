"use client";

import { useState } from "react";

import CustomReportModal from "./CustomReportModal";
import ReportGeneratorCard from "./ReportGeneratorCard";

const quickReports = [
  {
    title: "Daily Feeding Report",
    description: "Meal service logs and attendance",
    defaultValue: "Today",
    options: ["Today", "Last 7 Days", "Last 30 Days"],
  },
  {
    title: "Housekeeping & Laundry Report",
    description: "Meal service logs and attendance",
    defaultValue: "Today",
    options: ["Today", "Last 7 Days", "Last 30 Days"],
  },
  {
    title: "Muster Drill Report",
    description: "Emergency drill history and performance",
    defaultValue: "Last Drill",
    options: ["Last Drill", "All Drills", "Custom Range"],
  },
  {
    title: "Crew Change Report",
    description: "Personnel movements and timeline",
    defaultValue: "Last Change",
    options: ["Last Change", "Last 30 Days", "Custom Range"],
  },
  {
    title: "Personnel History",
    description: "Individual rig visit records",
    defaultValue: "By Person",
    options: ["By Person", "By Company", "Full History"],
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

export default function ReportsDashboard() {
  const [isCustomReportOpen, setIsCustomReportOpen] = useState(false);

  return (
    <section>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#053361]">
            Reports & Analytics
          </h1>
          <p className="mt-1 text-[14px] text-[#667085]">
            Generate and export operational reports
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCustomReportOpen(true)}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#053361] px-5 text-[14px] font-semibold text-white"
        >
          <PlusIcon />
          Create Custom Report
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-[24px] font-semibold text-[#053361]">Custom Report Generator</h2>
        <p className="mt-1 text-[14px] text-[#667085]">
          Generate custom reports for specific date ranges and criteria
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-3">
        {quickReports.map((report) => (
          <ReportGeneratorCard
            key={report.title}
            title={report.title}
            description={report.description}
            defaultValue={report.defaultValue}
            options={report.options}
            onGenerate={() => {}}
          />
        ))}
      </div>

      <CustomReportModal
        open={isCustomReportOpen}
        onClose={() => setIsCustomReportOpen(false)}
      />
    </section>
  );
}
