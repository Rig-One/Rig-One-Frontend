"use client";

import { useEffect, useRef, useState } from "react";

type IncidentActionMenuProps = {
  direction?: "up" | "down";
  onViewDetails: () => void;
};

function DotsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="6" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="18" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function IncidentActionMenu({
  direction = "down",
  onViewDetails,
}: IncidentActionMenuProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onDocumentMouseDown(event: MouseEvent) {
      const target = event.target as Node;
      if (!ref.current?.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#98A2B3] hover:bg-[#F2F4F7] hover:text-[#667085]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <DotsIcon />
      </button>

      {open ? (
        <div
          className={`absolute right-0 z-50 w-[168px] overflow-hidden rounded-2xl border border-[#EAECF0] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.20)] ${
            direction === "up" ? "bottom-10" : "top-10"
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onViewDetails();
            }}
            className="w-full px-8 py-6 text-left text-[14px] font-medium leading-[1.1] text-[#344054]"
          >
            View Details
          </button>
        </div>
      ) : null}
    </div>
  );
}
