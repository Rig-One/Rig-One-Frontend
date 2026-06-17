"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  AlertIcon,
  ChevronIcon,
  ClockIcon,
  DashboardGridIcon,
  DocumentIcon,
  FeedingIcon,
  FieldIcon,
  LockIcon,
  MedicIcon,
  PersonnelIcon,
} from "./DashboardIcons";

type NavItem = {
  label: string;
  href: string;
  locked?: boolean;
};

type FieldSection = {
  id: string;
  title: string;
  items: NavItem[];
};

const fieldSections: FieldSection[] = [
  {
    id: "idaja-field",
    title: "Idaja Field - Well 42",
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Personnel", href: "/dashboard/personnel" },
      { label: "Feeding", href: "#", locked: true },
      { label: "Emergency", href: "/dashboard/emergency" },
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

function MenuIcon({ name }: { name: string }) {
  if (name === "Personnel") return <PersonnelIcon />;
  if (name === "Feeding") return <FeedingIcon />;
  if (name === "Emergency" || name === "Incident Report") return <AlertIcon />;
  if (name === "Shift Log") return <ClockIcon />;
  if (name === "PTW" || name === "Reports") return <DocumentIcon />;
  if (name === "Medic") return <MedicIcon />;
  return <DashboardGridIcon />;
}

export default function SideNav() {
  const [openFieldId, setOpenFieldId] = useState(fieldSections[0].id);
  const pathname = usePathname();

  const isPersonnelRoute = pathname.startsWith("/dashboard/personnel");
  const isEmergencyRoute = pathname.startsWith("/dashboard/emergency");

  return (
    <aside className="w-full bg-[#031A31] px-5 py-6 text-white lg:fixed lg:inset-y-[3px] lg:left-0 lg:z-30 lg:h-[calc(100vh-3px)] lg:w-[260px] lg:overflow-y-auto">
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

      <Link
        href="/dashboard"
        className="mt-5 flex w-full items-center gap-3 rounded-lg bg-[#053361] px-4 py-3 text-left text-[15px] font-medium"
      >
        <span className="text-[#F97316]">
          <DashboardGridIcon />
        </span>
        Operations
      </Link>

      <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
        {fieldSections.map((section) => {
          const isOpen = openFieldId === section.id;

          return (
            <div key={section.id} className="space-y-2">
              <button
                type="button"
                onClick={() =>
                  setOpenFieldId((current) => (current === section.id ? "" : section.id))
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
                  {section.items.map((item) => {
                    const isActive =
                      item.href === "/dashboard"
                        ? pathname === "/dashboard"
                        : item.href === "/dashboard/personnel"
                          ? isPersonnelRoute
                          : item.href === "/dashboard/emergency"
                            ? isEmergencyRoute
                          : false;

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center justify-between rounded-md px-3 py-2 text-[14px] ${
                          isActive
                            ? "bg-[#0B3D78] text-white"
                            : "text-white/85 hover:bg-white/5"
                        } ${item.locked ? "opacity-55" : ""}`}
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
                    );
                  })}
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
              <path d="M3 21L6.5 20L4 17.5L3 21Z" fill="currentColor" />
            </svg>
            Rig Setup
          </span>
          <span className="text-white/50">
            <LockIcon />
          </span>
        </button>
      </div>
    </aside>
  );
}
