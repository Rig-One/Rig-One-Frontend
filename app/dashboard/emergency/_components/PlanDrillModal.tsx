"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import EmergencySelectDropdown from "./EmergencySelectDropdown";

type PlanDrillModalProps = {
  open: boolean;
  onClose: () => void;
};

type ModalStep = "form" | "success";

const dayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
].map((value) => ({ label: value, value }));

const drillTypeOptions = [
  "Muster Drill",
  "Fire Drill",
  "Man Overboard",
  "Abandon Rig",
  "H2S Emergency",
  "Medical Emergency",
].map((value) => ({ label: value, value }));

const frequencyOptions = ["Daily", "Weekly", "Bi-Weekly", "Monthly", "One-Time"].map(
  (value) => ({ label: value, value }),
);

const zoneOptions = [
  "All Zones",
  "Primary Lifeboat Station A",
  "Primary Lifeboat Station B",
  "Secondary Assembly Point",
].map((value) => ({ label: value, value }));

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

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2L20 6V12C20 17 16.8 20.8 12 22C7.2 20.8 4 17 4 12V6L12 2Z" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 10H20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M12 7V12L15 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
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

const initialDate = "2026-06-24";

export default function PlanDrillModal({ open, onClose }: PlanDrillModalProps) {
  const [step, setStep] = useState<ModalStep>("form");
  const [values, setValues] = useState({
    drillType: "",
    frequency: "",
    dayOfWeek: "",
    time: "",
    startDate: "",
    expectedDuration: "",
    musterZone: "",
    notes: "",
  });

  const handleClose = useCallback(() => {
    setStep("form");
    setValues({
      drillType: "",
      frequency: "",
      dayOfWeek: "",
      time: "",
      startDate: "",
      expectedDuration: "",
      musterZone: "",
      notes: "",
    });
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

  const isValid = useMemo(() => {
    return Boolean(
      values.drillType &&
        values.frequency &&
        values.dayOfWeek &&
        values.time &&
        values.startDate &&
        values.expectedDuration &&
        values.musterZone,
    );
  }, [values]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div className="absolute inset-0 flex items-center justify-center px-4 py-10">
        {step === "success" ? (
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-[430px] rounded-2xl bg-white px-8 py-10 text-center shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
          >
            <div className="mx-auto flex justify-center">
              <SuccessIcon />
            </div>
            <h2 className="mt-4 text-[28px] font-semibold text-[#053361]">
              Drilled Scheduled
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-[#98A2B3]">
              Emergency drill has been scheduled for selected time and date
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
            className="w-full max-w-[720px] rounded-2xl bg-white px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="text-[#667085]"
                aria-label="Close plan drill modal"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="-mt-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-[#053361]">
                <ShieldIcon />
              </div>
              <h2 className="mt-4 text-[28px] font-semibold text-[#053361]">
                Plan Emergency Drill
              </h2>
              <p className="mt-2 text-[14px] text-[#98A2B3]">
                Schedule a safety drill for personnel training
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <EmergencySelectDropdown
                label="Drill Type"
                required
                placeholder="Select type"
                value={values.drillType}
                options={drillTypeOptions}
                onChange={(drillType) => setValues((current) => ({ ...current, drillType }))}
              />
              <EmergencySelectDropdown
                label="Frequency"
                required
                placeholder="Select frequency"
                value={values.frequency}
                options={frequencyOptions}
                onChange={(frequency) => setValues((current) => ({ ...current, frequency }))}
              />
              <EmergencySelectDropdown
                label="Day of Week"
                required
                placeholder="Select day"
                value={values.dayOfWeek}
                options={dayOptions}
                onChange={(dayOfWeek) => setValues((current) => ({ ...current, dayOfWeek }))}
              />

              <div>
                <label className="text-[12px] font-medium text-[#344054]">
                  Time <span className="text-[#F04438]">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    type="time"
                    value={values.time}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, time: event.target.value }))
                    }
                    className="h-12 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-[15px] text-[#101828] outline-none focus:ring-2 focus:ring-[#98A2B3]/25"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#98A2B3]">
                    <ClockIcon />
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#344054]">
                  Start Date <span className="text-[#F04438]">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    type="date"
                    value={values.startDate}
                    min={initialDate}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, startDate: event.target.value }))
                    }
                    className="h-12 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 pr-10 text-[15px] text-[#101828] outline-none focus:ring-2 focus:ring-[#98A2B3]/25"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#98A2B3]">
                    <CalendarIcon />
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#344054]">
                  Expected Duration (minutes)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="00"
                  value={values.expectedDuration}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      expectedDuration: event.target.value,
                    }))
                  }
                  className="mt-2 h-12 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-[15px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
                />
              </div>
            </div>

            <div className="mt-4">
              <EmergencySelectDropdown
                label="Muster Zones"
                placeholder="Select zones"
                value={values.musterZone}
                options={zoneOptions}
                onChange={(musterZone) => setValues((current) => ({ ...current, musterZone }))}
              />
            </div>

            <div className="mt-4">
              <label className="text-[12px] font-medium text-[#344054]">
                Notes &amp; Instructions (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Special instructions"
                value={values.notes}
                onChange={(event) =>
                  setValues((current) => ({ ...current, notes: event.target.value }))
                }
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
                disabled={!isValid}
                onClick={() => setStep("success")}
                className={`h-11 rounded-lg text-[14px] font-semibold text-white ${
                  isValid ? "bg-[#053361]" : "bg-[#8FA3B5]"
                } disabled:cursor-not-allowed`}
              >
                Schedule Drill
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
