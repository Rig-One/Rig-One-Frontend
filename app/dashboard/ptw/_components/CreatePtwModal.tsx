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

function ProgressSteps({ currentStep }: { currentStep: StepKey }) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = step.key === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.key}
              className={`relative flex flex-1 flex-col items-center ${isLast ? "max-w-[70px] flex-none" : ""}`}
            >
              {!isLast ? (
                <span
                  className={`absolute left-1/2 top-4 h-[2px] w-full ${
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
                className={`mt-2 text-center text-[11px] font-medium ${
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
  const [workDescription, setWorkDescription] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [controlMeasures, setControlMeasures] = useState("");
  const [selectedHazards, setSelectedHazards] = useState<string[]>([]);
  const [selectedSafetyControls, setSelectedSafetyControls] = useState<string[]>([]);
  const [selectedPpe, setSelectedPpe] = useState<string[]>([]);
  const [riskLevel, setRiskLevel] = useState<"Low" | "Medium" | "High" | "">("");
  const [openSelect, setOpenSelect] = useState<"location" | "department" | "category" | null>(
    null,
  );

  const workIdValid = Boolean(workDescription && location && department && category);
  const riskAssessmentValid = Boolean(
    selectedHazards.length > 0 && riskLevel && controlMeasures.trim(),
  );
  const safetyControlsValid = Boolean(
    selectedSafetyControls.length > 0 || selectedPpe.length > 0,
  );

  const handleClose = useCallback(() => {
    setCurrentStep("work-id");
    setWorkDescription("");
    setLocation("");
    setDepartment("");
    setCategory("");
    setControlMeasures("");
    setSelectedHazards([]);
    setSelectedSafetyControls([]);
    setSelectedPpe([]);
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

      <div className="absolute inset-0 flex items-center justify-center px-4 py-10">
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
                  className={`h-11 rounded-lg text-[14px] font-semibold text-white ${
                    safetyControlsValid ? "bg-[#053361]" : "bg-[#8FA3B5]"
                  } disabled:cursor-not-allowed`}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
