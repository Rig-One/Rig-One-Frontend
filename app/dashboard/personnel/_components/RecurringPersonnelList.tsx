"use client";

import { useMemo, useState } from "react";

type PersonItem = {
  id: string;
  name: string;
  meta: string;
  lastVisit: string;
};

type RecurringPersonnelListProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

const people: PersonItem[] = [
  {
    id: "john-smith",
    name: "John Smith",
    meta: "Acme Drilling • Driller",
    lastVisit: "Last Visit: 2024-01-15",
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    meta: "Safety First Ltd • Safety Officer",
    lastVisit: "Last Visit: 2024-01-10",
  },
  {
    id: "mike-wilson",
    name: "Mike Wilson",
    meta: "Tech Services • Engineer",
    lastVisit: "Last Visit: 2024-01-20",
  },
  {
    id: "lisa-chen",
    name: "Lisa Chen",
    meta: "Maintenance Co • Technician",
    lastVisit: "Last Visit: 2024-01-25",
  },
];

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

export default function RecurringPersonnelList({
  selectedId,
  onSelect,
}: RecurringPersonnelListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return people;

    return people.filter((person) => {
      return (
        person.name.toLowerCase().includes(trimmed) ||
        person.meta.toLowerCase().includes(trimmed) ||
        person.lastVisit.toLowerCase().includes(trimmed)
      );
    });
  }, [query]);

  return (
    <div className="px-8 pb-8 pt-4">
      <p className="text-center text-[12px] text-[#98A2B3]">
        Choose personnel details from previous operations.
      </p>

      <div className="relative mt-4">
        <span className="absolute inset-y-0 left-3 flex items-center text-[#98A2B3]">
          <SearchIcon />
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search previous personnel..."
          className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-10 pr-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25"
        />
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-[#EAECF0] bg-white">
        {filtered.map((person) => {
          const selected = selectedId === person.id;
          return (
            <button
              key={person.id}
              type="button"
              onClick={() => onSelect(person.id)}
              className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left ${
                selected ? "bg-[#EEF5FC]" : "bg-white"
              }`}
            >
              <div>
                <p className="text-[13px] font-semibold text-[#053361]">
                  {person.name}
                </p>
                <p className="mt-1 text-[11px] text-[#667085]">{person.meta}</p>
                <p className="mt-1 text-[10px] text-[#98A2B3]">{person.lastVisit}</p>
              </div>

              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  selected ? "border-[#053361]" : "border-[#D0D5DD]"
                }`}
              >
                {selected ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-[#053361]" />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

