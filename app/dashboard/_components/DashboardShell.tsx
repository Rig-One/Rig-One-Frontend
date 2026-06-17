"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

type DashboardShellProps = {
  children: ReactNode;
};

const fieldSections = [
  {
    id: "idaja-field",
    title: "Idaja Field - Well 42",
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Personnel", href: "#" },
      { label: "Feeding", href: "#", locked: true },
      { label: "Emergency", href: "#" },
      { label: "Shift Log", href: "#" },
      { label: "PTW", href: "#" },
      { label: "Incident Report", href: "#" },
      { label: "Medic", href: "#" },
      { label: "Reports", href: "#" },
    ],
  },
  {
    id: "obare-field",
    title: "Obare Field - Well 28",
    items: [],
  },
  {
    id: "tode-field",
    title: "Tode Field - Well 15",
    items: [],
  },
];

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 4H10V10H4V4Z" fill="currentColor" />
      <path d="M14 4H20V10H14V4Z" fill="currentColor" />
      <path d="M4 14H10V20H4V14Z" fill="currentColor" />
      <path d="M14 14H20V20H14V14Z" fill="currentColor" />
    </svg>
  );
}

function FieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 18C6.2 15.3 8.54 13.5 11.25 13.5C13.96 13.5 16.3 15.3 17.5 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="11.25" cy="8.5" r="2.75" fill="currentColor" />
      <path
        d="M3 18.75H19.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon({ name }: { name: string }) {
  if (name === "Personnel") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3" fill="currentColor" />
        <circle cx="16.5" cy="9.5" r="2.5" fill="currentColor" />
        <path
          d="M3.5 18C4.6 15.4 6.6 14 9 14C11.4 14 13.4 15.4 14.5 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M13.75 18C14.45 16.2 15.85 15.25 17.5 15.25C19.15 15.25 20.55 16.2 21.25 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "Feeding") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 3V11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 3V11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 7H9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7.5 11V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M17 3C15.5 5 15 7 15 9V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "Emergency" || name === "Incident Report") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 4L21 20H3L12 4Z"
          fill="currentColor"
        />
        <path
          d="M12 9V13"
          stroke="#001B44"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16.5" r="1" fill="#031A31" />
      </svg>
    );
  }

  if (name === "Shift Log") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" fill="currentColor" />
        <path
          d="M12 8V12L15 14"
          stroke="#001B44"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "PTW" || name === "Reports") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M7 3H14L19 8V21H7V3Z"
          fill="currentColor"
        />
        <path
          d="M14 3V8H19"
          stroke="#001B44"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M10 12H16"
          stroke="#001B44"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "Medic") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M6 5H18V21H6V5Z" fill="currentColor" />
        <path
          d="M10 3H14V7H10V3Z"
          fill="#001B44"
        />
        <path
          d="M12 10V16"
          stroke="#001B44"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 13H15"
          stroke="#001B44"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return <DashboardIcon />;
}

function ChevronIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
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

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 10V8C7 5.79 8.79 4 11 4C13.21 4 15 5.79 15 8V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="5" y="10" width="12" height="10" rx="2" fill="currentColor" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 4C9.79 4 8 5.79 8 8V10.5C8 11.8 7.5 13.05 6.6 13.97L5 15.6H19L17.4 13.97C16.5 13.05 16 11.8 16 10.5V8C16 5.79 14.21 4 12 4Z"
        fill="currentColor"
      />
      <path
        d="M10 18C10.4 19.2 11.05 20 12 20C12.95 20 13.6 19.2 14 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [openFieldId, setOpenFieldId] = useState(fieldSections[0].id);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#053361]">
      <div className="min-h-screen border-t-[3px] border-[#F97316] bg-white lg:flex">
        <aside className="w-full bg-[#031A31] px-5 py-6 text-white lg:min-h-screen lg:w-[260px] lg:flex-none">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6">
            <Image
              src="/logos/rig_one_logo.svg"
              alt="RigOne"
              width={34}
              height={34}
              priority
            />
            <span className="text-[22px] font-semibold tracking-[-0.02em]">
              RigOne
            </span>
          </div>

          <button
            type="button"
            className="mt-5 flex w-full items-center gap-3 rounded-lg bg-[#053361] px-4 py-3 text-left text-[15px] font-medium"
          >
            <span className="text-[#F97316]">
              <DashboardIcon />
            </span>
            Operations
          </button>

          <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
            {fieldSections.map((section) => {
              const isOpen = openFieldId === section.id;

              return (
                <div key={section.id} className="space-y-2">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFieldId((current) =>
                        current === section.id ? "" : section.id,
                      )
                    }
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition ${
                      isOpen ? "bg-[#053361]" : "hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-3 text-[14px] font-medium">
                      <span className="text-white/85">
                        <FieldIcon />
                      </span>
                      {section.title}
                    </span>
                    <span className="text-white/80">
                      <ChevronIcon open={isOpen} />
                    </span>
                  </button>

                  {isOpen && section.items.length > 0 ? (
                    <div className="space-y-1 px-2 py-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`flex items-center justify-between rounded-md px-3 py-2 text-[14px] ${
                            item.label === "Dashboard"
                              ? "text-white"
                              : "text-white/85 hover:bg-white/5"
                          } ${
                            item.locked ? "opacity-55" : ""
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-white/85">
                              <MenuIcon name={item.label} />
                            </span>
                            {item.label}
                          </span>
                          {item.locked ? (
                            <span className="text-white/60">
                              <LockIcon />
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-white/10 pt-5">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[14px] font-medium text-white/55"
            >
              <span className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M13.5 4L15 2.5L17.5 5L16 6.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 18L15 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 21L6.5 20L4 17.5L3 21Z"
                    fill="currentColor"
                  />
                </svg>
                Rig Setup
              </span>
              <span className="text-white/50">
                <LockIcon />
              </span>
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-[#EAECF0] bg-white px-6 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-[#98A2B3]">
                  Current Operations
                </p>
                <p className="mt-1 text-[16px] font-medium text-[#053361]">
                  North Sea Alpha - Well 42
                </p>
              </div>

              <div className="flex items-center gap-5 self-end lg:self-auto">
                <button
                  type="button"
                  className="relative text-[#667085]"
                  aria-label="Notifications"
                >
                  <BellIcon />
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F97316] px-1 text-[10px] font-semibold text-white">
                    4
                  </span>
                </button>

                <div className="h-8 w-px bg-[#EAECF0]" />

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[13px] font-semibold text-[#344054]">
                      Chinedu Eze
                    </p>
                    <p className="text-[11px] text-[#98A2B3]">HSE Officer</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FEE4D7] text-[#F97316]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="3" fill="currentColor" />
                      <path
                        d="M6.5 18C7.4 15.5 9.4 14 12 14C14.6 14 16.6 15.5 17.5 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[#F97316]">
                    <ChevronIcon />
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 bg-[#F9FAFB] px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
