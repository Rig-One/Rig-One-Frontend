"use client";

import { useEffect, useId, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectDropdownProps = {
  label: string;
  placeholder: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

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

export default function SelectDropdown({
  label,
  placeholder,
  value,
  options,
  onChange,
}: SelectDropdownProps) {
  const buttonId = useId();
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";

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
      <label className="text-[12px] font-medium text-[#344054]" htmlFor={buttonId}>
        {label}
      </label>

      <button
        id={buttonId}
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="mt-2 flex h-10 w-full items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-3 text-left text-[13px] text-[#101828] outline-none"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selectedLabel ? "text-[#101828]" : "text-[#98A2B3]"}>
          {selectedLabel || placeholder}
        </span>
        <span className="text-[#667085]">
          <ChevronDownIcon />
        </span>
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[78px] z-50 overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.18)]"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="flex w-full px-4 py-4 text-left text-[16px] font-medium text-[#344054] hover:bg-[#F2F4F7]"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
