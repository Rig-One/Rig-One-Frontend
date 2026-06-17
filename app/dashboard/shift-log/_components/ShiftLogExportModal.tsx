"use client";

import { useCallback, useEffect } from "react";

type ShiftLogExportModalProps = {
  open: boolean;
  onClose: () => void;
};

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

function DayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path d="M12 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.9 4.9L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 17L19.1 19.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 7L19.1 4.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.9 19.1L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#12B76A" />
      <path
        d="M7.5 12L10.5 15L16.5 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XCircle() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#F04438" />
      <path d="M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 9L9 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function OkPill() {
  return (
    <span className="inline-flex rounded-full bg-[#EAF7EC] px-3 py-1 text-[12px] font-medium text-[#4E9765]">
      OK
    </span>
  );
}

export default function ShiftLogExportModal({
  open,
  onClose,
}: ShiftLogExportModalProps) {
  const handleClose = useCallback(() => {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div className="absolute inset-0 flex items-center justify-center px-4 py-10">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-[720px] rounded-2xl bg-white px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="text-[#667085]"
              aria-label="Close shift log export modal"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="-mt-2 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF3DD] text-[#B76E00]">
              <DayIcon />
            </div>
            <h2 className="mt-4 text-[28px] font-semibold text-[#053361]">Day Shift Log</h2>
            <p className="mt-2 text-[14px] text-[#667085]">
              SL-001 • 2025-01-10 • 06:00 - 18:00
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <article className="rounded-lg bg-[#F2F4F7] p-4">
              <p className="text-[12px] text-[#344054]">Incidents</p>
              <p className="mt-3 text-[32px] font-semibold text-[#12B76A]">0</p>
            </article>
            <article className="rounded-lg bg-[#F2F4F7] p-4">
              <p className="text-[12px] text-[#344054]">Safety Score</p>
              <p className="mt-3 text-[32px] font-semibold text-[#101828]">100%</p>
            </article>
            <article className="rounded-lg bg-[#F2F4F7] p-4">
              <p className="text-[12px] text-[#344054]">Equipment Issues</p>
              <p className="mt-3 text-[32px] font-semibold text-[#12B76A]">0</p>
            </article>
            <article className="rounded-lg bg-[#F2F4F7] p-4">
              <p className="text-[12px] text-[#344054]">Shift Risk</p>
              <p className="mt-3 text-[32px] font-semibold text-[#12B76A]">Green</p>
            </article>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <section className="rounded-lg border border-[#EAECF0] p-4">
              <h3 className="text-[22px] font-semibold text-[#053361]">Safety Observations</h3>
              <div className="mt-4 space-y-3 text-[14px] font-medium text-[#667085]">
                <div className="flex items-center gap-2">
                  <CheckCircle />
                  PPE Compliance good
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle />
                  Housekeeping satisfactory
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle />
                  Toolbox talks completed
                </div>
                <div className="flex items-center gap-2">
                  <XCircle />
                  Unsafe acts observed
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-[#EAECF0] p-4">
              <h3 className="text-[22px] font-semibold text-[#053361]">Equipment Status</h3>
              <div className="mt-4 space-y-4 text-[14px] text-[#667085]">
                <div className="flex items-center justify-between">
                  <span>Top Drive</span>
                  <OkPill />
                </div>
                <div className="flex items-center justify-between">
                  <span>Mud Pumps</span>
                  <OkPill />
                </div>
                <div className="flex items-center justify-between">
                  <span>BOP</span>
                  <OkPill />
                </div>
                <div className="flex items-center justify-between">
                  <span>Power System</span>
                  <OkPill />
                </div>
              </div>
            </section>
          </div>

          <section className="mt-4 rounded-lg border border-[#EAECF0] p-4">
            <h3 className="text-[22px] font-semibold text-[#053361]">Handover Notes</h3>
            <p className="mt-4 text-[14px] text-[#667085]">Top Drive</p>
          </section>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-[14px] font-semibold text-[#344054]"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#053361] text-[14px] font-semibold text-white"
            >
              <DownloadIcon />
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
