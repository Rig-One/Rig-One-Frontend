"use client";

import { useEffect, useMemo, useState } from "react";

import BiometricFlow from "./BiometricFlow";
import RecurringPersonnelList from "./RecurringPersonnelList";
import SelectDropdown from "./SelectDropdown";

type CheckInPersonnelModalProps = {
  open: boolean;
  onClose: () => void;
};

const tabs = ["New Personnel", "Recurring Personnel", "Group"] as const;
type ModalTab = (typeof tabs)[number];

function UserPlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="11" cy="9" r="4" fill="currentColor" />
      <path
        d="M3 21C4.2 17.4 7 15.5 11 15.5C15 15.5 17.8 17.4 19 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 8V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 11H23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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
      <rect x="4" y="6" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 10H20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function CheckInPersonnelModal({
  open,
  onClose,
}: CheckInPersonnelModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>("New Personnel");
  const [showBiometricFlow, setShowBiometricFlow] = useState(false);
  const [selectedRecurringId, setSelectedRecurringId] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    role: "",
    department: "",
    companyName: "",
    companyType: "",
    arrivalDate: "",
    expectedDeparture: "",
    roomAssignment: "",
  });

  const isFormValid = useMemo(() => {
    if (activeTab !== "New Personnel") return true;

    return (
      formValues.firstName.trim() &&
      formValues.lastName.trim() &&
      formValues.gender &&
      formValues.role.trim() &&
      formValues.department.trim() &&
      formValues.companyName.trim() &&
      formValues.companyType &&
      formValues.arrivalDate.trim() &&
      formValues.expectedDeparture &&
      formValues.roomAssignment
    );
  }, [activeTab, formValues]);

  const canContinueRecurring = Boolean(selectedRecurringId);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (showBiometricFlow) {
          setShowBiometricFlow(false);
          return;
        }

        onClose();
      }
    }

    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, showBiometricFlow]);

  if (!open) return null;

  if (showBiometricFlow) {
    return (
      <BiometricFlow
        onCancel={() => setShowBiometricFlow(false)}
        onComplete={() => {
          setShowBiometricFlow(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center px-4 py-10">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-[760px] rounded-2xl bg-white shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
        >
          <div className="flex flex-col items-center px-8 pt-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-[#053361]">
              <UserPlusIcon />
            </div>
            <h2 className="mt-4 text-[16px] font-semibold text-[#053361]">
              Check-in Personnel
            </h2>

            <div className="mt-6 flex w-full items-center justify-between border-b border-[#EAECF0] text-[12px] font-medium">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-3 ${
                    activeTab === tab
                      ? "border-b-2 border-[#F97316] text-[#F97316]"
                      : "border-b-2 border-transparent text-[#98A2B3]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <p className="mt-6 text-[12px] text-[#98A2B3]">
              {activeTab === "Recurring Personnel"
                ? "Choose personnel details from previous operations."
                : "Enter personnel details"}
            </p>
          </div>

          {activeTab === "New Personnel" ? (
            <div className="px-8 pb-8 pt-4">
              <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                <div>
                  <label className="text-[12px] font-medium text-[#344054]">
                    First Name
                  </label>
                  <input
                    value={formValues.firstName}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        firstName: event.target.value,
                      }))
                    }
                    placeholder="Enter your first name"
                    className="mt-2 h-10 w-full rounded-lg border border-[#D0D5DD] px-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-medium text-[#344054]">
                    Last Name
                  </label>
                  <input
                    value={formValues.lastName}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        lastName: event.target.value,
                      }))
                    }
                    placeholder="Enter your last name"
                    className="mt-2 h-10 w-full rounded-lg border border-[#D0D5DD] px-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
                  />
                </div>

                <SelectDropdown
                  label="Gender"
                  placeholder="Select"
                  value={formValues.gender}
                  onChange={(value) =>
                    setFormValues((current) => ({ ...current, gender: value }))
                  }
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                />

                <div>
                  <label className="text-[12px] font-medium text-[#344054]">
                    Role
                  </label>
                  <input
                    value={formValues.role}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        role: event.target.value,
                      }))
                    }
                    placeholder="e.g Driller"
                    className="mt-2 h-10 w-full rounded-lg border border-[#D0D5DD] px-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-medium text-[#344054]">
                    Department
                  </label>
                  <input
                    value={formValues.department}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        department: event.target.value,
                      }))
                    }
                    placeholder="e.g Operations"
                    className="mt-2 h-10 w-full rounded-lg border border-[#D0D5DD] px-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-medium text-[#344054]">
                    Company Name
                  </label>
                  <input
                    value={formValues.companyName}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        companyName: event.target.value,
                      }))
                    }
                    placeholder="Company Name"
                    className="mt-2 h-10 w-full rounded-lg border border-[#D0D5DD] px-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
                  />
                </div>

                <SelectDropdown
                  label="Company Type"
                  placeholder="Select"
                  value={formValues.companyType}
                  onChange={(value) =>
                    setFormValues((current) => ({
                      ...current,
                      companyType: value,
                    }))
                  }
                  options={[
                    { label: "Service", value: "service" },
                    { label: "Contractor", value: "contractor" },
                    { label: "Operator", value: "operator" },
                    { label: "Supplier", value: "supplier" },
                  ]}
                />

                <div>
                  <label className="text-[12px] font-medium text-[#344054]">
                    Arrival Date
                  </label>
                  <div className="relative mt-2">
                    <input
                      value={formValues.arrivalDate}
                      onChange={(event) =>
                        setFormValues((current) => ({
                          ...current,
                          arrivalDate: event.target.value,
                        }))
                      }
                      placeholder="DD/MM/YYYY"
                      className="h-10 w-full rounded-lg border border-[#D0D5DD] px-3 pr-10 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#98A2B3]">
                      <CalendarIcon />
                    </span>
                  </div>
                </div>

                <SelectDropdown
                  label="Expected Departure"
                  placeholder="Select"
                  value={formValues.expectedDeparture}
                  onChange={(value) =>
                    setFormValues((current) => ({
                      ...current,
                      expectedDeparture: value,
                    }))
                  }
                  options={[
                    { label: "Undefined(Long-term)", value: "undefined" },
                    { label: "Specified Date", value: "specified-date" },
                  ]}
                />

                <SelectDropdown
                  label="Room Assignment"
                  placeholder="Select"
                  value={formValues.roomAssignment}
                  onChange={(value) =>
                    setFormValues((current) => ({
                      ...current,
                      roomAssignment: value,
                    }))
                  }
                  options={[
                    { label: "A-101(4-man)", value: "a-101" },
                    { label: "A-102(2-man)", value: "a-102" },
                    { label: "B-201(1-man)", value: "b-201" },
                  ]}
                />
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-[13px] font-semibold text-[#344054]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!isFormValid}
                  onClick={() => setShowBiometricFlow(true)}
                  className="h-11 rounded-lg bg-[#053361] text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#D0D5DD] disabled:text-[#98A2B3]"
                >
                  Continue to Biometric Registration
                </button>
              </div>
            </div>
          ) : activeTab === "Recurring Personnel" ? (
            <div>
              <RecurringPersonnelList
                selectedId={selectedRecurringId}
                onSelect={setSelectedRecurringId}
              />

              <div className="grid gap-4 px-8 pb-8 md:grid-cols-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 rounded-lg border border-[#D0D5DD] bg-white text-[13px] font-semibold text-[#344054]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!canContinueRecurring}
                  onClick={() => setShowBiometricFlow(true)}
                  className="h-11 rounded-lg bg-[#053361] text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#D0D5DD] disabled:text-[#98A2B3]"
                >
                  Continue to Biometric Registration
                </button>
              </div>
            </div>
          ) : (
            <div className="px-8 pb-10 pt-8 text-center text-[14px] text-[#667085]">
              This flow is coming next.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
