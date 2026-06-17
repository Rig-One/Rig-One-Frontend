"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type BulkUploadModalProps = {
  open: boolean;
  onClose: () => void;
};

type ModalStep = "select" | "success";

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UploadCloudIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 18H17C19.21 18 21 16.21 21 14C21 11.99 19.52 10.32 17.59 10.03C17.05 7.16 14.53 5 11.5 5C7.99 5 5.09 7.61 5 11.1C3.24 11.57 2 13.17 2 15C2 16.66 3.34 18 5 18H8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 10V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 12.5L12 10L14.5 12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#12B76A" />
      <path
        d="M8 12.5L10.5 15L16 9.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-12 w-12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#D1FADF" />
      <path
        d="M17 24.5L21.5 29L31 19.5"
        stroke="#12B76A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      <path
        d="M12 3V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 10L12 14L16 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 3H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 7V18C8 19.1 8.9 20 10 20H14C15.1 20 16 19.1 16 18V7"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function formatSize(size: number) {
  const sizeInMb = size / (1024 * 1024);
  if (sizeInMb >= 1) {
    return `${sizeInMb.toFixed(0)}MB`;
  }

  const sizeInKb = size / 1024;
  return `${Math.max(1, Math.round(sizeInKb))}KB`;
}

export default function BulkUploadModal({ open, onClose }: BulkUploadModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<ModalStep>("select");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClose = useCallback(() => {
    setStep("select");
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleClose, open]);

  const fileMeta = useMemo(() => {
    if (!selectedFile) return null;
    const now = new Date();
    return {
      name: selectedFile.name,
      date: formatDate(now),
      time: formatTime(now),
      size: formatSize(selectedFile.size || 13 * 1024 * 1024),
    };
  }, [selectedFile]);

  function handleDownloadTemplate() {
    const csvContent =
      "first_name,last_name,gender,role,department,company_name,company_type,arrival_date,expected_departure,room_assignment\nJohn,Smith,Male,Driller,Operations,Acme Drilling,Contractor,2026-09-12,Undefined(Long-term),A-101(4-man)\n";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "personnel-upload-template.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div className="absolute inset-0 flex items-center justify-center px-4 py-10">
        {step === "success" ? (
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-[420px] rounded-2xl bg-white px-8 py-10 text-center shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
          >
            <div className="mx-auto flex justify-center">
              <SuccessIcon />
            </div>
            <h2 className="mt-4 text-[28px] font-semibold text-[#053361]">
              Upload Successful
            </h2>
            <p className="mt-2 text-[14px] text-[#98A2B3]">
              You have successfully uploaded a file
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mx-auto mt-8 inline-flex h-11 min-w-[140px] items-center justify-center rounded-lg bg-[#053361] px-6 text-[14px] font-semibold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-[520px] rounded-2xl bg-white px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="text-[#667085]"
                aria-label="Close bulk upload modal"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="-mt-2 text-center">
              <h2 className="text-[18px] font-semibold text-[#053361]">
                Bulk Upload Personnel
              </h2>
              <p className="mt-2 text-[14px] text-[#98A2B3]">
                Upload a CSV file to import multiple records at once
              </p>
            </div>

            <div className="mt-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-semibold text-[#344054]">
                  Download Template
                </p>
                <p className="mt-1 text-[12px] text-[#98A2B3]">
                  Get the CSV template with required columns
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#F97316]"
              >
                <DownloadIcon />
                Download
              </button>
            </div>

            <div className="mt-4">
              <input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx,.xls,.pdf"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setSelectedFile(file);
                }}
              />

              {selectedFile && fileMeta ? (
                <div className="flex items-center justify-between rounded-xl bg-[#EEF5FC] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#12B76A]">
                      <CheckIcon />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold text-[#053361]">
                        {fileMeta.name}
                      </p>
                      <p className="mt-1 text-[12px] text-[#98A2B3]">
                        {fileMeta.date} &nbsp; {fileMeta.time} &nbsp; • &nbsp;
                        {fileMeta.size}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      if (inputRef.current) {
                        inputRef.current.value = "";
                      }
                    }}
                    className="text-[#F04438]"
                    aria-label="Remove selected file"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl bg-[#EEF5FC] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#053361]">
                      <UploadCloudIcon />
                    </span>
                    <div>
                      <p className="text-[16px] font-semibold text-[#053361]">
                        Upload CSV File
                      </p>
                      <p className="mt-1 text-[12px] text-[#98A2B3]">
                        CSV format • Max. 5MB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-[#053361] px-4 text-[13px] font-semibold text-white"
                  >
                    Choose File
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-[13px] font-semibold text-[#344054]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!selectedFile}
                onClick={() => setStep("success")}
                className={`h-11 rounded-lg text-[13px] font-semibold text-white disabled:cursor-not-allowed ${
                  selectedFile
                    ? "bg-[#053361]"
                    : "bg-[#D0D5DD] text-[#98A2B3]"
                }`}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
