"use client";

import { useMemo, useRef, useState } from "react";

type ReportIncidentModalProps = {
  open: boolean;
  onClose: () => void;
};

const incidentOptions = [
  "Injury",
  "Near Miss",
  "Equipment Damage",
  "Unsafe Condition",
  "Fire",
  "Spill",
];

type Severity = "Low" | "Medium" | "High";

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

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 16.5H7C4.79 16.5 3 14.71 3 12.5C3 10.43 4.57 8.73 6.59 8.52C7.13 5.95 9.41 4 12.14 4C15.25 4 17.8 6.39 17.98 9.45C19.74 9.83 21 11.4 21 13.25C21 15.4 19.25 17.15 17.1 17.15H16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 20V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.5 14.5L12 11L15.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
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

export default function ReportIncidentModal({ open, onClose }: ReportIncidentModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity | "">("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const canSubmit = useMemo(() => incidentType !== "" && severity !== "", [incidentType, severity]);

  function handleClose() {
    setIncidentType("");
    setDescription("");
    setSeverity("");
    setSelectedFileName("");
    setShowTypeOptions(false);
    setShowSuccess(false);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div className="absolute inset-0 overflow-y-auto px-4 py-10">
        <div className="flex min-h-full items-center justify-center">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-[420px] rounded-[12px] bg-white px-4 pb-4 pt-3 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="text-[#667085]"
                aria-label="Close report incident modal"
              >
                <CloseIcon />
              </button>
            </div>

            {showSuccess ? (
              <div className="px-4 pb-3 text-center">
                <div className="mx-auto mt-2 flex h-24 w-24 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16B364]">
                  <CheckIcon />
                </div>
                <h2 className="mt-8 text-[24px] font-semibold text-[#053361]">Report Submitted</h2>
                <p className="mx-auto mt-3 max-w-[250px] text-[14px] leading-6 text-[#667085]">
                  You have successfully submitted an incident report.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mx-auto mt-8 flex h-11 w-full max-w-[180px] items-center justify-center rounded-[10px] bg-[#053361] px-5 text-[15px] font-semibold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="-mt-1 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-[#0B4A8B]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCEBFA]">
                      <AlertIcon />
                    </div>
                  </div>
                  <h2 className="mt-4 text-[14px] font-semibold text-[#053361]">Report Incident</h2>
                  <p className="mt-1 text-[12px] text-[#98A2B3]">Apr 9, 2026 • 11:19 AM • Auto-Location</p>
                </div>

                <div className="mt-6">
                  <label className="text-[12px] font-medium text-[#344054]">
                    What Type of Incident <span className="text-[#F04438]">*</span>
                  </label>
                  <div className="relative mt-2">
                    <button
                      type="button"
                      onClick={() => setShowTypeOptions((current) => !current)}
                      className="flex h-11 w-full items-center justify-between rounded-[8px] border border-[#D0D5DD] px-3 text-[14px] text-[#98A2B3]"
                    >
                      <span className={incidentType ? "text-[#344054]" : ""}>
                        {incidentType || "Select"}
                      </span>
                      <ChevronDownIcon />
                    </button>

                    {showTypeOptions ? (
                      <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-10 max-h-[234px] overflow-y-auto rounded-[10px] border border-[#EAECF0] bg-white py-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                        {incidentOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setIncidentType(option);
                              setShowTypeOptions(false);
                            }}
                            className="w-full px-4 py-3 text-left text-[14px] text-[#344054] hover:bg-[#F9FAFB]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-[12px] font-medium text-[#344054]">
                    Capture Evidence (Optional)
                  </label>
                  <div className="mt-2 flex items-center justify-between rounded-[8px] bg-[#EEF4FF] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0B4A8B]">
                        <UploadIcon />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#053361]">Upload Photo</p>
                        <p className="mt-1 text-[11px] text-[#98A2B3]">
                          {selectedFileName || "Jpeg, PNG format • Max. 5MB"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="h-10 rounded-[8px] bg-[#053361] px-4 text-[13px] font-semibold text-white"
                    >
                      Choose File
                    </button>
                    <input
                      ref={inputRef}
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      className="hidden"
                      onChange={(event) =>
                        setSelectedFileName(event.target.files?.[0]?.name ?? "")
                      }
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-[12px] font-medium text-[#344054]">
                    Description (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Briefly describe what happened..."
                    className="mt-2 w-full rounded-[8px] border border-[#D0D5DD] px-3 py-3 text-[14px] text-[#344054] outline-none placeholder:text-[#98A2B3]"
                  />
                </div>

                <div className="mt-5">
                  <label className="text-[12px] font-medium text-[#344054]">
                    Severity Level<span className="text-[#F04438]">*</span>
                  </label>
                  <div className="mt-3 flex gap-2">
                    {(["Low", "Medium", "High"] as Severity[]).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSeverity(level)}
                        className={`h-10 rounded-[8px] border px-4 text-[13px] font-medium ${
                          severity === level
                            ? "border-[#053361] bg-[#EEF4FF] text-[#053361]"
                            : "border-[#D0D5DD] bg-white text-[#475467]"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="h-10 rounded-[8px] border border-[#D0D5DD] bg-white px-4 text-[14px] font-semibold text-[#475467]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSuccess(true)}
                    disabled={!canSubmit}
                    className="h-10 rounded-[8px] bg-[#053361] px-4 text-[14px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Submit Report
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
