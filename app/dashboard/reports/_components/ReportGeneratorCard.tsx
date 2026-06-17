"use client";

import { useState } from "react";

type ReportGeneratorCardProps = {
  title: string;
  description: string;
  options: string[];
  defaultValue: string;
  onGenerate: () => void;
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

export default function ReportGeneratorCard({
  title,
  description,
  options,
  defaultValue,
  onGenerate,
}: ReportGeneratorCardProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  return (
    <article className="rounded-lg bg-[#F2F4F7] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="max-w-[160px] text-[16px] leading-6 text-[#344054]">{title}</h3>
          <p className="mt-1 max-w-[170px] text-[12px] leading-5 text-[#667085]">{description}</p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="flex h-9 min-w-[92px] items-center justify-between gap-2 rounded-[8px] border border-[#D0D5DD] bg-white px-3 text-[12px] font-medium text-[#667085]"
          >
            <span>{selectedValue}</span>
            <ChevronDownIcon />
          </button>

          {open ? (
            <div className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[175px] overflow-hidden rounded-[10px] border border-[#EAECF0] bg-white py-2 shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedValue(option);
                    setOpen(false);
                  }}
                  className="flex w-full px-5 py-3 text-left text-[14px] font-medium text-[#344054] hover:bg-[#F9FAFB]"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        className="mt-6 inline-flex h-10 items-center rounded-[8px] bg-[#F97316] px-5 text-[14px] font-semibold text-white"
      >
        Generate Report
      </button>
    </article>
  );
}
