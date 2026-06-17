"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CustomReportModalProps = {
  open: boolean;
  onClose: () => void;
};

const reportTypeOptions = [
  "Operations Summary",
  "Personnel Report",
  "Feeding & Housekeeping",
  "Safety & Emergency",
  "Comprehensive Report",
];

const dateRangeOptions = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "Custom Date",
];

const metricsOptions = [
  "Personnel Count",
  "Meal Distribution",
  "Emergency Drills",
  "Room Occupancy",
  "Check-in/Check-out Times",
  "Housekeeping Services",
  "Safety Compliance",
];

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

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 3.5H13L17.5 8V19C17.5 20.1 16.6 21 15.5 21H8.5C7.4 21 6.5 20.1 6.5 19V5.5C6.5 4.4 7.4 3.5 8.5 3.5H8Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M13 3.5V8H17.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 12H14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.5 15.5H14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

function CheckSuccessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-9 w-9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 12L10.5 15.5L17 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SelectField({
  label,
  value,
  open,
  options,
  onToggle,
  onSelect,
}: {
  label: string;
  value: string;
  open: boolean;
  options: string[];
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="relative">
      <label className="text-[12px] font-medium text-[#344054]">
        {label} <span className="text-[#F04438]">*</span>
      </label>
      <button
        type="button"
        onClick={onToggle}
        className="mt-2 flex h-11 w-full items-center justify-between rounded-[8px] border border-[#D0D5DD] bg-white px-3 text-[14px]"
      >
        <span className={value ? "text-[#344054]" : "text-[#98A2B3]"}>{value || "Select"}</span>
        <span className="text-[#98A2B3]">
          <ChevronDownIcon />
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[10px] border border-[#EAECF0] bg-white py-2 shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="flex w-full px-4 py-3 text-left text-[13px] font-medium text-[#344054] hover:bg-[#F9FAFB]"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function CustomReportModal({ open, onClose }: CustomReportModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [openSelect, setOpenSelect] = useState<"report-type" | "date-range" | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const canSubmit = useMemo(
    () => reportType !== "" && dateRange !== "" && selectedMetrics.length > 0,
    [dateRange, reportType, selectedMetrics],
  );

  useEffect(() => {
    function onDocumentMouseDown(event: MouseEvent) {
      const target = event.target as Node;
      if (!ref.current?.contains(target)) {
        setOpenSelect(null);
      }
    }

    if (!open) return;
    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, [open]);

  function handleClose() {
    setReportType("");
    setDateRange("");
    setSelectedMetrics([]);
    setOpenSelect(null);
    setShowSuccess(false);
    onClose();
  }

  function toggleMetric(metric: string) {
    setSelectedMetrics((current) =>
      current.includes(metric) ? current.filter((item) => item !== metric) : [...current, metric],
    );
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div className="absolute inset-0 overflow-y-auto px-4 py-10">
        <div className="flex min-h-full items-center justify-center">
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            className="w-full max-w-[430px] rounded-[12px] bg-white px-4 pb-4 pt-3 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="text-[#667085]"
                aria-label="Close custom report modal"
              >
                <CloseIcon />
              </button>
            </div>

            {showSuccess ? (
              <div className="px-4 pb-3 text-center">
                <div className="mx-auto mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16B364]">
                  <CheckSuccessIcon />
                </div>
                <h2 className="mt-6 text-[18px] font-semibold text-[#053361]">Report Generated</h2>
                <p className="mx-auto mt-2 max-w-[210px] text-[12px] leading-5 text-[#667085]">
                  Your custom personnel report is ready for download.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mx-auto mt-6 flex h-10 w-full max-w-[140px] items-center justify-center rounded-[10px] bg-[#053361] px-5 text-[14px] font-semibold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="-mt-1 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-[#0B4A8B]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCEBFA]">
                      <DocumentIcon />
                    </div>
                  </div>
                  <h2 className="mt-4 text-[14px] font-semibold text-[#053361]">
                    Custom Report Generator
                  </h2>
                  <p className="mx-auto mt-1 max-w-[270px] text-[12px] leading-5 text-[#98A2B3]">
                    Create a customized report with selected metrics and date ranges
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <SelectField
                    label="Report Type"
                    value={reportType}
                    open={openSelect === "report-type"}
                    options={reportTypeOptions}
                    onToggle={() =>
                      setOpenSelect((current) =>
                        current === "report-type" ? null : "report-type",
                      )
                    }
                    onSelect={(value) => {
                      setReportType(value);
                      setOpenSelect(null);
                    }}
                  />
                  <SelectField
                    label="Date Range"
                    value={dateRange}
                    open={openSelect === "date-range"}
                    options={dateRangeOptions}
                    onToggle={() =>
                      setOpenSelect((current) =>
                        current === "date-range" ? null : "date-range",
                      )
                    }
                    onSelect={(value) => {
                      setDateRange(value);
                      setOpenSelect(null);
                    }}
                  />
                </div>

                <div className="mt-5">
                  <p className="text-[12px] font-medium text-[#344054]">Select Metrics to Include</p>
                  <div className="mt-3 grid gap-x-6 gap-y-3 md:grid-cols-2">
                    {metricsOptions.map((metric) => {
                      const checked = selectedMetrics.includes(metric);

                      return (
                        <label key={metric} className="flex items-center gap-2 text-[12px] text-[#475467]">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleMetric(metric)}
                            className="h-4 w-4 rounded border border-[#D0D5DD] text-[#175CD3]"
                          />
                          <span>{metric}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="h-10 rounded-[8px] border border-[#D0D5DD] bg-white px-4 text-[14px] font-semibold text-[#475467]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!canSubmit}
                    onClick={() => setShowSuccess(true)}
                    className="h-10 rounded-[8px] bg-[#053361] px-4 text-[14px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Generate Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
