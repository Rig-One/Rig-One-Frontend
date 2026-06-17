"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type WorkerOption = {
  id: string;
  name: string;
  meta: string;
  code: string;
};

type LocationOption = {
  id: string;
  label: string;
};

type StartShiftValues = {
  workerName: string;
  location: string;
};

type StartShiftModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: StartShiftValues) => void;
};

const workerOptions: WorkerOption[] = [
  {
    id: "john-smith-1",
    name: "John Smith",
    meta: "Drilling • Driller",
    code: "W-001",
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    meta: "Production • Operator",
    code: "W-001",
  },
  {
    id: "mike-wilson",
    name: "Mike Wilson",
    meta: "Maintenance • Mechanic",
    code: "W-001",
  },
  {
    id: "tom-brown",
    name: "Tom Brown",
    meta: "Marine • Crane op",
    code: "W-001",
  },
  {
    id: "john-smith-2",
    name: "John Smith",
    meta: "Drilling • Driller",
    code: "W-001",
  },
];

const locationOptions: LocationOption[] = [
  { id: "drill-floor", label: "Drill Floor" },
  { id: "cargo-deck", label: "Cargo Deck" },
  { id: "mud-pit-area", label: "Mud Pit Area" },
  { id: "engine-room", label: "Engine Room" },
  { id: "living-quarters", label: "Living Quarters" },
  { id: "pipe-deck", label: "Pipe Deck" },
  { id: "moon-pool", label: "Moon Pool" },
  { id: "bop-area", label: "BOP Area" },
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

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8 6L18 12L8 18V6Z" />
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

function WorkerSelect({
  value,
  open,
  onOpen,
  onClose,
  onChange,
}: {
  value: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: WorkerOption) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return workerOptions;

    return workerOptions.filter((worker) => {
      return (
        worker.name.toLowerCase().includes(trimmed) ||
        worker.meta.toLowerCase().includes(trimmed) ||
        worker.code.toLowerCase().includes(trimmed)
      );
    });
  }, [query]);

  return (
    <div className="relative">
      <label className="text-[12px] font-medium text-[#344054]">
        Select Worker <span className="text-[#F04438]">*</span>
      </label>

      <button
        type="button"
        onClick={() => {
          if (open) {
            setQuery("");
            onClose();
            return;
          }

          onOpen();
        }}
        className="mt-2 flex h-12 w-full items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-3 text-left text-[15px] outline-none"
      >
        <span className={value ? "text-[#101828]" : "text-[#98A2B3]"}>
          {value || "Select"}
        </span>
        <span className="text-[#667085]">
          <ChevronDownIcon />
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[84px] z-50 overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.18)]">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <p className="text-[11px] text-[#98A2B3]">Worker</p>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-3 flex items-center text-[#98A2B3]">
                <SearchIcon />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or scan RFID"
                className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-10 pr-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3]"
              />
            </div>
          </div>

          <div className="max-h-[236px] overflow-y-auto">
            {filtered.map((worker) => {
              const selected = value === worker.name;
              return (
                <button
                  key={worker.id}
                  type="button"
                  onClick={() => {
                    onChange(worker);
                    setQuery("");
                    onClose();
                  }}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left ${
                    selected ? "bg-[#EEF5FC]" : "bg-white hover:bg-[#F9FAFB]"
                  }`}
                >
                  <div>
                    <p className="text-[13px] font-semibold text-[#344054]">
                      {worker.name}
                    </p>
                    <p className="mt-1 text-[10px] text-[#98A2B3]">{worker.meta}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#98A2B3]">{worker.code}</span>
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        selected ? "border-[#12B76A]" : "border-[#D0D5DD]"
                      }`}
                    >
                      {selected ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#12B76A]" />
                      ) : null}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function LocationSelect({
  value,
  open,
  onOpen,
  onClose,
  onChange,
}: {
  value: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return locationOptions;

    return locationOptions.filter((location) =>
      location.label.toLowerCase().includes(trimmed),
    );
  }, [query]);

  return (
    <div className="relative">
      <label className="text-[12px] font-medium text-[#344054]">
        Work Location <span className="text-[#F04438]">*</span>
      </label>

      <button
        type="button"
        onClick={() => {
          if (open) {
            setQuery("");
            onClose();
            return;
          }

          onOpen();
        }}
        className="mt-2 flex h-12 w-full items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-3 text-left text-[15px] outline-none"
      >
        <span className={value ? "text-[#101828]" : "text-[#98A2B3]"}>
          {value || "Select"}
        </span>
        <span className="text-[#667085]">
          <ChevronDownIcon />
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[84px] z-50 overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.18)]">
          <div className="border-b border-[#EAECF0] px-4 py-3">
            <p className="text-[11px] text-[#98A2B3]">Location</p>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-3 flex items-center text-[#98A2B3]">
                <SearchIcon />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or scan RFID"
                className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-10 pr-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3]"
              />
            </div>
          </div>

          <div className="max-h-[236px] overflow-y-auto py-2">
            {filtered.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => {
                  onChange(location.label);
                  setQuery("");
                  onClose();
                }}
                className="flex w-full px-4 py-3 text-left text-[14px] font-medium text-[#344054] hover:bg-[#F9FAFB]"
              >
                {location.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function StartShiftModal({
  open,
  onClose,
  onSubmit,
}: StartShiftModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [note, setNote] = useState("");
  const [openPanel, setOpenPanel] = useState<"worker" | "location" | null>(null);

  const canSubmit = Boolean(selectedWorker && selectedLocation);

  const handleClose = useCallback(() => {
    setSelectedWorker("");
    setSelectedLocation("");
    setNote("");
    setOpenPanel(null);
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
        setOpenPanel(null);
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
          className="w-full max-w-[560px] rounded-2xl bg-white px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="text-[#667085]"
              aria-label="Close start shift modal"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="-mt-2 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#DDF9E7] text-[#16B364]">
              <PlayIcon />
            </div>
            <h2 className="mt-4 text-[28px] font-semibold text-[#053361]">Start Shift</h2>
            <p className="mt-2 text-[14px] text-[#667085]">
              Auto-filled: Apr 9, 2026 • 11:19 AM • Day Shift
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-lg bg-[#F2F4F7] p-4">
              <p className="text-[12px] text-[#344054]">Date</p>
              <p className="mt-3 text-[16px] font-semibold text-[#101828]">Apr 9, 2026</p>
            </article>
            <article className="rounded-lg bg-[#F2F4F7] p-4">
              <p className="text-[12px] text-[#344054]">Time</p>
              <p className="mt-3 text-[16px] font-semibold text-[#101828]">11:15 AM</p>
            </article>
            <article className="rounded-lg bg-[#F2F4F7] p-4">
              <p className="text-[12px] text-[#344054]">Shift</p>
              <p className="mt-3 text-[16px] font-semibold text-[#101828]">Day</p>
            </article>
          </div>

          <div className="mt-6 space-y-4">
            <WorkerSelect
              value={selectedWorker}
              open={openPanel === "worker"}
              onOpen={() => setOpenPanel("worker")}
              onClose={() => setOpenPanel(null)}
              onChange={(worker) => setSelectedWorker(worker.name)}
            />

            <LocationSelect
              value={selectedLocation}
              open={openPanel === "location"}
              onOpen={() => setOpenPanel("location")}
              onClose={() => setOpenPanel(null)}
              onChange={setSelectedLocation}
            />

            <div>
              <label className="text-[12px] font-medium text-[#344054]">
                Note (Optional)
              </label>
              <textarea
                rows={4}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add a note..."
                className="mt-2 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 py-3 text-[15px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
              />
            </div>
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
              disabled={!canSubmit}
              onClick={() => {
                onSubmit({
                  workerName: selectedWorker,
                  location: selectedLocation,
                });
                handleClose();
              }}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg text-[14px] font-semibold text-white ${
                canSubmit ? "bg-[#053361]" : "bg-[#8FA3B5]"
              } disabled:cursor-not-allowed`}
            >
              <PlayIcon />
              Start Shift
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
