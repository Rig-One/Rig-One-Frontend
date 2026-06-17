"use client";

import { useEffect, useState } from "react";

type BiometricStage = "fingerprint" | "rfid" | "complete";

type BiometricFlowProps = {
  onCancel: () => void;
  onComplete: () => void;
};

type ToastState = {
  title: string;
  message: string;
} | null;

function FingerprintIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 12C12 14.8 10.8 16.5 9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 9.5C15.8 10.3 16.2 11.3 16.2 12.6C16.2 14.7 15.6 16.1 14.7 17.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8.6 9C7.6 10 7 11.4 7 13C7 14.8 6.6 16.1 5.6 17.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 5.5C15.6 5.5 18.5 8.4 18.5 12V13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 5.5C8.4 5.5 5.5 8.4 5.5 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CardIcon({ state }: { state: "idle" | "success" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="2"
        fill={state === "success" ? "#D1FADF" : "currentColor"}
      />
      <path
        d="M4 10H20"
        stroke={state === "success" ? "#039855" : "#ffffff"}
        strokeWidth="2"
      />
      {state === "success" ? (
        <path
          d="M9 14L11 16L15 12"
          stroke="#039855"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
    </svg>
  );
}

function Toast({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed right-6 top-6 z-[60] w-[340px] overflow-hidden rounded-lg bg-white shadow-[0_18px_55px_rgba(0,0,0,0.22)]">
      <div className="flex items-start gap-3 border-l-4 border-[#F97316] px-4 py-3">
        <div className="flex-1">
          <p className="text-[12px] font-semibold text-[#101828]">{title}</p>
          <p className="mt-1 text-[12px] text-[#667085]">{message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-[#98A2B3]"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default function BiometricFlow({ onCancel, onComplete }: BiometricFlowProps) {
  const [stage, setStage] = useState<BiometricStage>("fingerprint");
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const isFingerprint = stage === "fingerprint";
  const isRfid = stage === "rfid";
  const isComplete = stage === "complete";

  return (
    <div className="fixed inset-0 z-50">
      {toast ? (
        <Toast title={toast.title} message={toast.message} onClose={() => setToast(null)} />
      ) : null}

      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="absolute inset-0 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[520px] rounded-2xl bg-white p-8 text-center shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-[#053361]">
            {isFingerprint ? <FingerprintIcon /> : null}
            {isRfid ? <CardIcon state="idle" /> : null}
            {isComplete ? <CardIcon state="success" /> : null}
          </div>

          <h2 className="mt-4 text-[14px] font-semibold text-[#053361]">
            {isFingerprint ? "Biometric Registration" : "RFID Card Registration"}
          </h2>
          <p className="mt-1 text-[12px] text-[#98A2B3]">
            {isFingerprint
              ? "Place the finger in the biometric device to check-in"
              : "Place the RFID Card on the reader"}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="h-10 rounded-lg border border-[#D0D5DD] bg-white text-[13px] font-semibold text-[#344054]"
            >
              Cancel
            </button>

            {isFingerprint ? (
              <button
                type="button"
                onClick={() => {
                  setToast({
                    title: "Biometric Captured",
                    message: "Fingerprint successfully registered.",
                  });
                  setStage("rfid");
                }}
                className="h-10 rounded-lg bg-[#053361] text-[13px] font-semibold text-white"
              >
                Simulate Biometric Scan
              </button>
            ) : null}

            {isRfid ? (
              <button
                type="button"
                onClick={() => {
                  setToast({
                    title: "RFID Registered",
                    message: "Card successfully registered.",
                  });
                  setStage("complete");
                }}
                className="h-10 rounded-lg bg-[#8FA3B5] text-[13px] font-semibold text-white"
              >
                Simulate Card Scan
              </button>
            ) : null}

            {isComplete ? (
              <button
                type="button"
                onClick={onComplete}
                className="col-span-2 h-10 rounded-lg bg-[#053361] text-[13px] font-semibold text-white"
              >
                Complete Check-in
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

