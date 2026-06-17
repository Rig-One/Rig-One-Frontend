"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type ActivateEmergencyModalProps = {
  open: boolean;
  onClose: () => void;
};

type ModalStep = "form" | "success";

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

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
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

export default function ActivateEmergencyModal({
  open,
  onClose,
}: ActivateEmergencyModalProps) {
  const [step, setStep] = useState<ModalStep>("form");
  const [emergencyType, setEmergencyType] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleClose = useCallback(() => {
    setStep("form");
    setEmergencyType("");
    setAdditionalInfo("");
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

  const canConfirm = useMemo(() => emergencyType.trim().length > 0, [emergencyType]);

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
              Emergency Activated
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-[#98A2B3]">
              All personnel have been told to muster immediately
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
            className="w-full max-w-[620px] rounded-2xl bg-white px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="text-[#667085]"
                aria-label="Close activate emergency modal"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="-mt-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-[#053361]">
                <WarningIcon />
              </div>
              <h2 className="mt-4 text-[28px] font-semibold text-[#053361]">
                Activate Emergency Protocol
              </h2>
              <p className="mt-2 text-[14px] text-[#667085]">
                This will notify all personnel to muster immediately at designated points
              </p>
            </div>

            <div className="mt-6 rounded-lg bg-[#FEF3F2] px-4 py-3">
              <div className="flex items-start gap-2 text-[#F97316]">
                <span className="mt-0.5">
                  <WarningIcon />
                </span>
                <div className="text-left">
                  <p className="text-[13px] font-semibold">This is a critical action</p>
                  <p className="mt-1 text-[12px] text-[#667085]">
                    All personnel will receive immediate notification to muster at designated points
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-[12px] font-medium text-[#344054]">
                Emergency Type
              </label>
              <input
                type="text"
                value={emergencyType}
                onChange={(event) => setEmergencyType(event.target.value)}
                placeholder="e.g Fire, Medical, Evacuation, etc."
                className="mt-2 h-12 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-[15px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
              />
            </div>

            <div className="mt-4">
              <label className="text-[12px] font-medium text-[#344054]">
                Additional Information
              </label>
              <textarea
                rows={4}
                value={additionalInfo}
                onChange={(event) => setAdditionalInfo(event.target.value)}
                placeholder="e.g Location, severity, instructions..."
                className="mt-2 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 py-3 text-[15px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-[14px] font-semibold text-[#344054]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!canConfirm}
                onClick={() => setStep("success")}
                className={`h-11 rounded-lg text-[14px] font-semibold text-white ${
                  canConfirm ? "bg-[#053361]" : "bg-[#8FA3B5]"
                } disabled:cursor-not-allowed`}
              >
                Confirm Activation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
