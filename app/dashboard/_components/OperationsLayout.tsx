import Link from "next/link";
import type { ReactNode } from "react";

import { BellIcon, ChevronIcon } from "./DashboardIcons";
import SideNav from "./SideNav";

type OperationsLayoutProps = {
  children: ReactNode;
};

export default function OperationsLayout({ children }: OperationsLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#053361]">
      <div className="min-h-screen border-t-[3px] border-[#F97316] bg-white">
        <SideNav />

        <div className="flex min-h-screen flex-1 flex-col lg:ml-[260px]">
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

                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-[#F9FAFB]"
                >
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
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 bg-[#F9FAFB] px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
