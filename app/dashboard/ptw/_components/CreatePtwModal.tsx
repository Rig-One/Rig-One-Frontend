"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type CreatePtwModalProps = {
  open: boolean;
  onClose: () => void;
};

type StepKey = "work-id" | "risk-assessment" | "safety-controls" | "approval" | "completion";

type Step = {
  key: StepKey;
  label: string;
};

type SelectOption = {
  id: string;
  label: string;
};

const steps: Step[] = [
  { key: "work-id", label: "Work ID" },
  { key: "risk-assessment", label: "Risk Assessment" },
  { key: "safety-controls", label: "Safety Controls" },
  { key: "approval", label: "Approval" },
  { key: "completion", label: "Completion" },
];

const locationOptions: SelectOption[] = [
  { id: "drill-floor", label: "Drill Floor" },
  { id: "cargo-deck", label: "Cargo Deck" },
  { id: "mud-pit-area", label: "Mud Pit Area" },
  { id: "engine-room", label: "Engine Room" },
  { id: "living-quarters", label: "Living Quarters" },
  { id: "pipe-deck", label: "Pipe Deck" },
  { id: "moon-pool", label: "Moon Pool" },
  { id: "bop-area", label: "BOP Area" },
];

const departmentOptions: SelectOption[] = [
  { id: "drilling", label: "Drilling" },
  { id: "production", label: "Production" },
  { id: "maintenance", label: "Maintenance" },
  { id: "marine", label: "Marine" },
  { id: "hse", label: "HSE" },
  { id: "electrical", label: "Electrical" },
];

const categoryOptions: SelectOption[] = [
  { id: "hot-work", label: "Hot Work" },
  { id: "confined-space-entry", label: "Confined Space Entry" },
  { id: "electrical-work", label: "Electrical Work" },
  { id: "working-at-height", label: "Working at Height" },
  { id: "lifting-operations", label: "Lifting Operations" },
  { id: "excavation", label: "Excavation" },
  { id: "radiation-work", label: "Radiation Work" },
  { id: "general-maintenance", label: "General Maintenance" },
];

const hazardOptions = [
  "Fire/Explosion Risk",
  "Electrical Hazard",
  "Confined Space Hazard",
  "Chemical Exposure",
  "Radiation Exposure",
  "Toxic Gas Exposure",
  "Fall From Height",
  "Moving Machinery",
  "Noise Exposure",
  "Pressure Release",
];

const safetyControlOptions = [
  "Lockout/Tagout (LOTO) confirmed",
  "Electrical Isolation Completed",
  "Mechanical Isolation Completed",
  "Process Isolation Completed",
  "Gas Testing Required",
  "Toolbox Talk Conducted",
];

const ppeOptions = [
  "Hard Hat",
  "Steel-toe Boots",
  "Gloves",
  "Respiratory Protection",
  "Safety Glasses",
  "Fire-resistant Clothing",
  "Hearing Protection",
  "Fall Protection Harness",
];

const approvalOptions = [
  {
    id: "shift-supervisor",
    title: "Shift Supervisor / Drilling Supervisor",
    description: "Approves PTW within operational scope",
  },
  {
    id: "hse-officer",
    title: "HSE Officer",
    description: "Required for high-risk or safety-critical work",
  },
  {
    id: "opm-toolpusher",
    title: "OPM/Toolpusher",
    description: "Overall operational authorization",
  },
];

const completionOptions = [
  "All work completed as per permit",
  "Work area cleaned and restored",
  "All isolations removed",
  "All tools and equipment accounted for",
  "Area safe for normal operations",
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

function ClipboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="6" y="5" width="12" height="15" rx="2" fill="currentColor" />
      <rect x="9" y="2" width="6" height="4" rx="1.5" fill="#ffffff" />
      <path
        d="M9 11L11 13L15 9"
        stroke="#ffffff"
        strokeWidth="1.8"
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
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 9H20" stroke="currentColor" strokeWidth="2" />
      <path d="M9 13H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 17H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UploadCloudIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 18H6C3.79 18 2 16.21 2 14C2 11.95 3.54 10.25 5.53 10.02C6.21 7.11 8.82 5 12 5C15.3 5 18.01 7.29 18.58 10.37C20.56 10.63 22 12.32 22 14.33C22 16.54 20.21 18.33 18 18.33H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 21V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 15.5L12 12L15.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 6V4C8 3.45 8.45 3 9 3H15C15.55 3 16 3.45 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 6L18.3 18.14C18.24 19.19 17.37 20 16.32 20H7.68C6.63 20 5.76 19.19 5.7 18.14L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 11V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 11V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
      <path d="M7 12L10.5 15.5L17 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
      <path
        d="M16.5 16.5L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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

function formatDateDisplay(value: string) {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;

  return `${day}/${month}/${year}`;
}

function DatePickerField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <label className="text-[12px] font-medium text-[#344054]">
        {label} <span className="text-[#F04438]">*</span>
      </label>
      <div className="relative mt-2">
        <input
          readOnly
          value={formatDateDisplay(value)}
          placeholder="DD/MM/YYYY"
          onClick={() => inputRef.current?.showPicker?.()}
          className="h-12 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 pr-12 text-[15px] text-[#101828] outline-none placeholder:text-[#98A2B3]"
        />
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-[72%] -translate-x-1/2 -translate-y-1/2 opacity-0"
          tabIndex={-1}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.showPicker?.()}
          className="absolute inset-y-0 right-3 flex items-center text-[#98A2B3]"
          aria-label={`Choose ${label.toLowerCase()} date`}
        >
          <CalendarIcon />
        </button>
      </div>
    </div>
  );
}

function ProgressSteps({ currentStep }: { currentStep: StepKey }) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className="mx-auto mt-8 max-w-[620px] overflow-hidden px-4">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = step.key === currentStep;
          const hasNext = index < steps.length - 1;

          return (
            <div key={step.key} className="relative flex min-w-0 flex-1 flex-col items-center">
              {hasNext ? (
                <span
                  className={`absolute left-[calc(50%+16px)] top-4 h-[2px] w-[calc(100%-32px)] ${
                    isComplete ? "bg-[#F97316]" : "bg-[#D0D5DD]"
                  }`}
                />
              ) : null}

              <span
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-[12px] font-semibold ${
                  isComplete
                    ? "border-[#F97316] bg-[#F97316] text-white"
                    : isCurrent
                      ? "border-[#F97316] bg-white text-[#F97316]"
                      : "border-[#D0D5DD] bg-white text-[#98A2B3]"
                }`}
              >
                {isComplete ? "✓" : ""}
              </span>

              <span
                className={`mt-2 max-w-[92px] text-center text-[10px] font-medium sm:text-[11px] ${
                  isCurrent || isComplete ? "text-[#053361]" : "text-[#98A2B3]"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SearchableSelect({
  label,
  required = false,
  placeholder,
  searchPlaceholder,
  value,
  options,
  open,
  onOpenChange,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  searchPlaceholder: string;
  value: string;
  options: SelectOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return options;
    return options.filter((option) => option.label.toLowerCase().includes(trimmed));
  }, [options, query]);

  return (
    <div className="relative">
      <label className="text-[12px] font-medium text-[#344054]">
        {label}
        {required ? <span className="text-[#F04438]"> *</span> : null}
      </label>
      <button
        type="button"
        onClick={() => {
          if (open) {
            setQuery("");
          }
          onOpenChange(!open);
        }}
        className="mt-2 flex h-12 w-full items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-3 text-left text-[15px] outline-none"
      >
        <span className={value ? "text-[#101828]" : "text-[#98A2B3]"}>{value || placeholder}</span>
        <span className="text-[#667085]">
          <ChevronDownIcon />
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[84px] z-50 overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.18)]">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-[#98A2B3]">
                <SearchIcon />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-10 pr-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3]"
              />
            </div>
          </div>

          <div className="max-h-[180px] overflow-y-auto py-2">
            {filtered.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.label);
                  setQuery("");
                  onOpenChange(false);
                }}
                className="flex w-full px-4 py-3 text-left text-[14px] font-medium text-[#344054] hover:bg-[#F9FAFB]"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function CreatePtwModal({ open, onClose }: CreatePtwModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentStep, setCurrentStep] = useState<StepKey>("work-id");
  const [showSuccess, setShowSuccess] = useState(false);
  const [workDescription, setWorkDescription] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [controlMeasures, setControlMeasures] = useState("");
  const [selectedHazards, setSelectedHazards] = useState<string[]>([]);
  const [selectedSafetyControls, setSelectedSafetyControls] = useState<string[]>([]);
  const [selectedPpe, setSelectedPpe] = useState<string[]>([]);
  const [selectedApprovers, setSelectedApprovers] = useState<string[]>([]);
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [signaturePin, setSignaturePin] = useState("");
  const [finalSignature, setFinalSignature] = useState("");
  const [closeOutComments, setCloseOutComments] = useState("");
  const [selectedCompletionItems, setSelectedCompletionItems] = useState<string[]>([]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [riskLevel, setRiskLevel] = useState<"Low" | "Medium" | "High" | "">("");
  const [openSelect, setOpenSelect] = useState<"location" | "department" | "category" | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const workIdValid = Boolean(workDescription && location && department && category);
  const riskAssessmentValid = Boolean(
    selectedHazards.length > 0 && riskLevel && controlMeasures.trim(),
  );
  const safetyControlsValid = Boolean(
    selectedSafetyControls.length > 0 || selectedPpe.length > 0,
  );
  const approvalValid = Boolean(
    selectedApprovers.length > 0 && validFrom && validTo && signaturePin.trim(),
  );
  const completionValid = Boolean(
    selectedCompletionItems.length > 0 &&
      closeOutComments.trim() &&
      finalSignature.trim(),
  );

  const handleClose = useCallback(() => {
    setCurrentStep("work-id");
    setShowSuccess(false);
    setWorkDescription("");
    setLocation("");
    setDepartment("");
    setCategory("");
    setControlMeasures("");
    setSelectedHazards([]);
    setSelectedSafetyControls([]);
    setSelectedPpe([]);
    setSelectedApprovers([]);
    setValidFrom("");
    setValidTo("");
    setSignaturePin("");
    setFinalSignature("");
    setCloseOutComments("");
    setSelectedCompletionItems([]);
    setPhotoFile(null);
    setRiskLevel("");
    setOpenSelect(null);
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
          className="w-full max-w-[760px] rounded-2xl bg-white px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="text-[#667085]"
              aria-label="Close create PTW modal"
            >
              <CloseIcon />
            </button>
          </div>

          {showSuccess ? (
            <div className="px-6 py-8 text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16B364]">
                <CheckSuccessIcon />
              </div>
              <h2 className="mt-10 text-[28px] font-semibold text-[#053361]">
                Permit To Work Created
              </h2>
              <p className="mt-3 text-[16px] text-[#667085]">
                You have successfully created a permit.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mx-auto mt-10 flex h-14 w-full max-w-[336px] items-center justify-center rounded-xl bg-[#053361] text-[18px] font-semibold text-white"
              >
                Done
              </button>
            </div>
          ) : (
            <>
          <div className="-mt-2 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-[#053361]">
              <ClipboardIcon />
            </div>
            <h2 className="mt-4 text-[28px] font-semibold text-[#053361]">
              Create Permit To Work
            </h2>
            <p className="mt-2 text-[14px] text-[#667085]">
              Auto-filled: Apr 9, 2026 • 11:19 AM • Day Shift
            </p>
          </div>

          <ProgressSteps currentStep={currentStep} />

          {currentStep === "work-id" ? (
            <div className="mt-8">
              <div>
                <label className="text-[12px] font-medium text-[#344054]">Work Description</label>
                <textarea
                  rows={4}
                  value={workDescription}
                  onChange={(event) => setWorkDescription(event.target.value)}
                  placeholder="Describe the work to be performed..."
                  className="mt-2 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 py-3 text-[15px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <SearchableSelect
                  label="Location"
                  required
                  placeholder="Select"
                  searchPlaceholder="Search location"
                  value={location}
                  options={locationOptions}
                  open={openSelect === "location"}
                  onOpenChange={(isOpen) => setOpenSelect(isOpen ? "location" : null)}
                  onChange={setLocation}
                />
                <SearchableSelect
                  label="Department"
                  required
                  placeholder="Select"
                  searchPlaceholder="Search department"
                  value={department}
                  options={departmentOptions}
                  open={openSelect === "department"}
                  onOpenChange={(isOpen) => setOpenSelect(isOpen ? "department" : null)}
                  onChange={setDepartment}
                />
              </div>

              <div className="mt-4">
                <SearchableSelect
                  label="Category"
                  required
                  placeholder="Select"
                  searchPlaceholder="Search category"
                  value={category}
                  options={categoryOptions}
                  open={openSelect === "category"}
                  onOpenChange={(isOpen) => setOpenSelect(isOpen ? "category" : null)}
                  onChange={setCategory}
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
                  disabled={!workIdValid}
                  onClick={() => setCurrentStep("risk-assessment")}
                  className={`h-11 rounded-lg text-[14px] font-semibold text-white ${
                    workIdValid ? "bg-[#053361]" : "bg-[#8FA3B5]"
                  } disabled:cursor-not-allowed`}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : currentStep === "risk-assessment" ? (
            <div className="mt-8">
              <h3 className="text-[14px] font-semibold text-[#344054]">Hazard Checklist</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {hazardOptions.map((hazard) => {
                  const checked = selectedHazards.includes(hazard);
                  return (
                    <label key={hazard} className="flex items-center gap-3 text-[14px] text-[#344054]">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          setSelectedHazards((current) =>
                            event.target.checked
                              ? [...current, hazard]
                              : current.filter((item) => item !== hazard),
                          );
                        }}
                        className="h-5 w-5 rounded border border-[#D0D5DD]"
                      />
                      {hazard}
                    </label>
                  );
                })}
              </div>

              <div className="mt-8">
                <p className="text-[12px] font-medium text-[#344054]">
                  Risk Level <span className="text-[#F04438]">*</span>
                </p>
                <div className="mt-3 flex gap-3">
                  {(["Low", "Medium", "High"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRiskLevel(option)}
                      className={`min-w-[96px] rounded-lg border px-5 py-3 text-[14px] font-semibold ${
                        riskLevel === option
                          ? option === "Low"
                            ? "border-[#16B364] bg-[#16B364] text-white"
                            : option === "Medium"
                              ? "border-[#F5B726] bg-[#F5B726] text-white"
                              : "border-[#F04438] bg-[#F04438] text-white"
                          : "border-[#D0D5DD] bg-white text-[#475467]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {riskLevel === "High" ? (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#FEF3F2] px-4 py-3 text-[14px] font-medium text-[#F97316]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M12 3L22 21H2L12 3Z" />
                    </svg>
                    High-risk permits require HSE Manager approval
                  </div>
                ) : null}
              </div>

              <div className="mt-6">
                <label className="text-[12px] font-medium text-[#344054]">
                  Control Measures <span className="text-[#F04438]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={controlMeasures}
                  onChange={(event) => setControlMeasures(event.target.value)}
                  placeholder="Describe the risk control measures..."
                  className="mt-2 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 py-3 text-[15px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
                />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep("work-id")}
                  className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-[14px] font-semibold text-[#344054]"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!riskAssessmentValid}
                  onClick={() => setCurrentStep("safety-controls")}
                  className={`h-11 rounded-lg text-[14px] font-semibold text-white ${
                    riskAssessmentValid ? "bg-[#053361]" : "bg-[#8FA3B5]"
                  } disabled:cursor-not-allowed`}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : currentStep === "safety-controls" ? (
            <div className="mt-8">
              <h3 className="text-[14px] font-semibold text-[#344054]">Isolation & Lockout</h3>
              <div className="mt-4 grid gap-x-12 gap-y-4 md:grid-cols-2">
                {safetyControlOptions.map((item) => {
                  const checked = selectedSafetyControls.includes(item);
                  return (
                    <label key={item} className="flex items-center gap-3 text-[14px] text-[#344054]">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          setSelectedSafetyControls((current) =>
                            event.target.checked
                              ? [...current, item]
                              : current.filter((value) => value !== item),
                          );
                        }}
                        className="h-5 w-5 rounded border border-[#D0D5DD]"
                      />
                      {item}
                    </label>
                  );
                })}
              </div>

              <div className="mt-10">
                <h3 className="text-[14px] font-semibold text-[#344054]">PPE Requirements</h3>
                <div className="mt-4 grid gap-x-12 gap-y-4 md:grid-cols-2">
                  {ppeOptions.map((item) => {
                    const checked = selectedPpe.includes(item);
                    return (
                      <label key={item} className="flex items-center gap-3 text-[14px] text-[#344054]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) => {
                            setSelectedPpe((current) =>
                              event.target.checked
                                ? [...current, item]
                                : current.filter((value) => value !== item),
                            );
                          }}
                          className="h-5 w-5 rounded border border-[#D0D5DD]"
                        />
                        {item}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep("risk-assessment")}
                  className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-[14px] font-semibold text-[#344054]"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!safetyControlsValid}
                  onClick={() => setCurrentStep("approval")}
                  className={`h-11 rounded-lg text-[14px] font-semibold text-white ${
                    safetyControlsValid ? "bg-[#053361]" : "bg-[#8FA3B5]"
                  } disabled:cursor-not-allowed`}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : currentStep === "approval" ? (
            <div className="mt-8">
              <div>
                <h3 className="text-[16px] font-semibold text-[#344054]">
                  Route for Approval <span className="text-[#F04438]">*</span>
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-[#667085]">
                  Select which role(s) need to approve or be aware of this permit.
                  <br />
                  Please select at least one approver
                </p>
              </div>

              <div className="mt-5 space-y-5">
                {approvalOptions.map((option) => {
                  const checked = selectedApprovers.includes(option.id);
                  return (
                    <label key={option.id} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          setSelectedApprovers((current) =>
                            event.target.checked
                              ? [...current, option.id]
                              : current.filter((value) => value !== option.id),
                          );
                        }}
                        className="mt-1 h-5 w-5 rounded border border-[#D0D5DD]"
                      />
                      <span>
                        <span className="block text-[14px] font-semibold text-[#344054]">
                          {option.title}
                        </span>
                        <span className="mt-1 block text-[13px] text-[#667085]">
                          {option.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <DatePickerField label="Valid From" value={validFrom} onChange={setValidFrom} />
                <DatePickerField label="Valid To" value={validTo} onChange={setValidTo} />
              </div>

              <div className="mt-6">
                <label className="text-[16px] font-semibold text-[#344054]">
                  Photo Attachment (Optional)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setPhotoFile(file);
                  }}
                />
                {photoFile ? (
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-dashed border-[#BFD6F2] bg-[#EEF5FC] px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#16B364]">
                        <CheckSuccessIcon />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#053361]">
                          {photoFile.name}
                        </p>
                        <p className="mt-1 text-[13px] text-[#98A2B3]">
                          11 Sep, 2023&nbsp;&nbsp; 12:24pm • {Math.max(1, Math.round(photoFile.size / 1024 / 1024))}MB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPhotoFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="text-[#F04438]"
                      aria-label="Remove attachment"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-dashed border-[#BFD6F2] bg-[#EEF5FC] px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#053361]">
                        <UploadCloudIcon />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#053361]">
                          Upload Photo
                        </p>
                        <p className="mt-1 text-[13px] text-[#98A2B3]">
                          Jpeg, PNG format • Max. 5MB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-10 rounded-lg bg-[#053361] px-5 text-[14px] font-semibold text-white"
                    >
                      Choose File
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-center text-[16px] font-semibold text-[#344054]">
                  Digital Signature
                </label>
                <div className="mt-3 flex justify-center">
                  <input
                    value={signaturePin}
                    onChange={(event) => setSignaturePin(event.target.value)}
                    placeholder="Enter your PIN to sign"
                    className="h-12 w-full max-w-[288px] rounded-lg border border-[#D0D5DD] bg-white px-3 text-[15px] text-[#101828] outline-none placeholder:text-[#98A2B3]"
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep("safety-controls")}
                  className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-[14px] font-semibold text-[#344054]"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!approvalValid}
                  onClick={() => setCurrentStep("completion")}
                  className={`h-11 rounded-lg text-[14px] font-semibold text-white ${
                    approvalValid ? "bg-[#053361]" : "bg-[#8FA3B5]"
                  } disabled:cursor-not-allowed`}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : currentStep === "completion" ? (
            <div className="mt-8">
              <div>
                <h3 className="text-[16px] font-semibold text-[#344054]">
                  Close-Out Confirmation <span className="text-[#F04438]">*</span>
                </h3>
              </div>

              <div className="mt-5 space-y-4">
                {completionOptions.map((option) => {
                  const checked = selectedCompletionItems.includes(option);
                  return (
                    <label key={option} className="flex items-center gap-3 text-[14px] text-[#344054]">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          setSelectedCompletionItems((current) =>
                            event.target.checked
                              ? [...current, option]
                              : current.filter((value) => value !== option),
                          );
                        }}
                        className="h-5 w-5 rounded border border-[#D0D5DD]"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>

              <div className="mt-8">
                <label className="text-[16px] font-semibold text-[#344054]">
                  Close-Out Comments <span className="text-[#F04438]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={closeOutComments}
                  onChange={(event) => setCloseOutComments(event.target.value)}
                  placeholder="Any additional notes on work completion..."
                  className="mt-3 w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-4 text-[15px] text-[#101828] outline-none placeholder:text-[#98A2B3]"
                />
              </div>

              <div className="mt-6">
                <label className="block text-center text-[16px] font-semibold text-[#344054]">
                  Final Signature
                </label>
                <div className="mt-3 flex justify-center">
                  <input
                    value={finalSignature}
                    onChange={(event) => setFinalSignature(event.target.value)}
                    placeholder="Enter your PIN to close permit"
                    className="h-12 w-full max-w-[288px] rounded-lg border border-[#D0D5DD] bg-white px-3 text-[15px] text-[#101828] outline-none placeholder:text-[#98A2B3]"
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep("approval")}
                  className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-[14px] font-semibold text-[#344054]"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!completionValid}
                  onClick={() => setShowSuccess(true)}
                  className={`h-11 rounded-lg text-[14px] font-semibold text-white ${
                    completionValid ? "bg-[#053361]" : "bg-[#8FA3B5]"
                  } disabled:cursor-not-allowed`}
                >
                  Submit & Close Permit
                </button>
              </div>
            </div>
          ) : null}
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
