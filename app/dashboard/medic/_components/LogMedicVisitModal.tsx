"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type LogMedicVisitValues = {
  personnel: string;
  visitDate: string;
  complaint: string;
  diagnosis: string;
  treatment: string;
  medicName: string;
  followUpDate: string;
};

type LogMedicVisitModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: LogMedicVisitValues) => void;
};

const personnelOptions = ["John Smith", "Sarah Johnson", "Tom Brown", "Ada Victor"];
const medicOptions = ["Dr. Chinedu Eze", "Nurse Mary Okafor", "Dr. Adaeze Obi"];

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

function MedicIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 4C8.69 4 6 6.69 6 10V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V10C18 6.69 15.31 4 12 4Z"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <path
        d="M10 8.5H14V11.5H16.5V14.5H14V17.5H10V14.5H7.5V11.5H10V8.5Z"
        fill="currentColor"
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

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 3V6M17 3V6M4 9H20M6 5H18C19.1 5 20 5.9 20 7V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V7C4 5.9 4.9 5 6 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatDateDisplay(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

function SelectField({
  label,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  value: string;
  options: string[];
  open: boolean;
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
        className="mt-2 flex h-11 w-full items-center justify-between rounded-[8px] border border-[#D0D5DD] bg-white px-3 text-left text-[14px]"
      >
        <span className={value ? "text-[#344054]" : "text-[#98A2B3]"}>{value || "Select"}</span>
        <span className="text-[#98A2B3]">
          <ChevronDownIcon />
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[220px] overflow-y-auto rounded-[10px] border border-[#EAECF0] bg-white py-2 shadow-[0_18px_55px_rgba(0,0,0,0.18)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="flex w-full px-4 py-3 text-left text-[14px] font-medium text-[#344054] hover:bg-[#F9FAFB]"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <label className="text-[12px] font-medium text-[#344054]">
        {label} {required ? <span className="text-[#F04438]">*</span> : null}
      </label>
      <div className="relative mt-2">
        <input
          readOnly
          value={formatDateDisplay(value)}
          placeholder="DD/MM/YYYY"
          onClick={() => inputRef.current?.showPicker?.()}
          className="h-11 w-full rounded-[8px] border border-[#D0D5DD] bg-white px-3 pr-10 text-[14px] text-[#344054] outline-none placeholder:text-[#98A2B3]"
        />
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="pointer-events-none absolute left-1/2 top-1/2 h-11 w-[72%] -translate-x-1/2 -translate-y-1/2 opacity-0"
          tabIndex={-1}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.showPicker?.()}
          className="absolute inset-y-0 right-3 flex items-center text-[#98A2B3]"
          aria-label={`Choose ${label.toLowerCase()}`}
        >
          <CalendarIcon />
        </button>
      </div>
    </div>
  );
}

export default function LogMedicVisitModal({
  open,
  onClose,
  onSubmit,
}: LogMedicVisitModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [personnel, setPersonnel] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [complaint, setComplaint] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [medicName, setMedicName] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [openSelect, setOpenSelect] = useState<"personnel" | "medic" | null>(null);

  const canSubmit = useMemo(
    () =>
      Boolean(personnel && visitDate && complaint.trim() && diagnosis.trim() && treatment.trim() && medicName),
    [complaint, diagnosis, medicName, personnel, treatment, visitDate],
  );

  const handleClose = useCallback(() => {
    setPersonnel("");
    setVisitDate("");
    setComplaint("");
    setDiagnosis("");
    setTreatment("");
    setMedicName("");
    setFollowUpDate("");
    setShowSuccess(false);
    setOpenSelect(null);
    onClose();
  }, [onClose]);

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
            className="w-full max-w-[500px] rounded-2xl bg-white px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="text-[#667085]"
                aria-label="Close log medic visit modal"
              >
                <CloseIcon />
              </button>
            </div>

            {showSuccess ? (
              <div className="px-4 py-6 text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16B364]">
                  <CheckSuccessIcon />
                </div>
                <h2 className="mt-10 text-[28px] font-semibold text-[#053361]">Visit Logged</h2>
                <p className="mx-auto mt-4 max-w-[280px] text-[16px] leading-9 text-[#667085]">
                  Medic visit has been recorded successfully.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mx-auto mt-10 flex h-14 w-full max-w-[404px] items-center justify-center rounded-xl bg-[#053361] text-[18px] font-semibold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="-mt-2 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-[#053361]">
                    <MedicIcon />
                  </div>
                  <h2 className="mt-4 text-[28px] font-semibold text-[#053361]">Log Medic Visit</h2>
                  <p className="mt-2 text-[14px] text-[#667085]">
                    Record a new medical consultation or treatment
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <SelectField
                      label="Personnel"
                      value={personnel}
                      options={personnelOptions}
                      open={openSelect === "personnel"}
                      onToggle={() =>
                        setOpenSelect((current) => (current === "personnel" ? null : "personnel"))
                      }
                      onSelect={(value) => {
                        setPersonnel(value);
                        setOpenSelect(null);
                      }}
                    />
                    <DateField
                      label="Visit Date & Time"
                      value={visitDate}
                      onChange={setVisitDate}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-[#344054]">
                      Chief Complaint <span className="text-[#F04438]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={complaint}
                      onChange={(event) => setComplaint(event.target.value)}
                      placeholder="Describe the main symptoms or concerns..."
                      className="mt-2 w-full rounded-[8px] border border-[#D0D5DD] bg-white px-3 py-3 text-[14px] text-[#344054] outline-none placeholder:text-[#98A2B3]"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-[#344054]">
                      Diagnosis <span className="text-[#F04438]">*</span>
                    </label>
                    <input
                      value={diagnosis}
                      onChange={(event) => setDiagnosis(event.target.value)}
                      placeholder="Medical Diagnosis"
                      className="mt-2 h-11 w-full rounded-[8px] border border-[#D0D5DD] bg-white px-3 text-[14px] text-[#344054] outline-none placeholder:text-[#98A2B3]"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-[#344054]">
                      Treatment Provided <span className="text-[#F04438]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={treatment}
                      onChange={(event) => setTreatment(event.target.value)}
                      placeholder="Describe medications, procedures, or recommendations..."
                      className="mt-2 w-full rounded-[8px] border border-[#D0D5DD] bg-white px-3 py-3 text-[14px] text-[#344054] outline-none placeholder:text-[#98A2B3]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <SelectField
                      label="Medic/Doctor Name"
                      value={medicName}
                      options={medicOptions}
                      open={openSelect === "medic"}
                      onToggle={() =>
                        setOpenSelect((current) => (current === "medic" ? null : "medic"))
                      }
                      onSelect={(value) => {
                        setMedicName(value);
                        setOpenSelect(null);
                      }}
                    />
                    <DateField
                      label="Follow-up Date (Optional)"
                      value={followUpDate}
                      onChange={setFollowUpDate}
                    />
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-[14px] font-semibold text-[#344054]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!canSubmit}
                    onClick={() => {
                      onSubmit({
                        personnel,
                        visitDate,
                        complaint,
                        diagnosis,
                        treatment,
                        medicName,
                        followUpDate,
                      });
                      setShowSuccess(true);
                    }}
                    className={`h-11 rounded-lg text-[14px] font-semibold text-white ${
                      canSubmit ? "bg-[#053361]" : "bg-[#8FA3B5]"
                    } disabled:cursor-not-allowed`}
                  >
                    Log Visit
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
