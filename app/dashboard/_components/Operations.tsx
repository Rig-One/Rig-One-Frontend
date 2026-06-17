"use client";

import { useState } from "react";

import { PlusIcon } from "./DashboardIcons";
import Badges from "./Badges";
import OperationsCards from "./OperationsCards";
import SafetyOverview from "./SafetyOverview";
import SciScore from "./SciScore";
import Streaks from "./Streaks";

const tabs = ["Overview", "SCI Score", "Badges", "Streaks"] as const;
type SafetyTab = (typeof tabs)[number];

export default function Operations() {
  const [activeTab, setActiveTab] = useState<SafetyTab>("Overview");

  return (
    <section>
      <p className="text-[14px] font-medium text-[#98A2B3]">Idaja Field - Well 42</p>
      <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] text-[#053361]">
            Operations Dashboard
          </h1>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#053361] px-6 py-3 text-[15px] font-semibold text-white"
        >
          <PlusIcon />
          Create New Operation
        </button>
      </div>

      <div className="mt-6">
        <OperationsCards />
      </div>

      <div className="mt-8">
        <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[#053361]">
          Safety Management
        </h2>

        <div className="mt-4 flex gap-6 border-b border-[#EAECF0]">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-2 pb-3 text-[14px] font-medium transition ${
                activeTab === tab
                  ? "border-[#F97316] text-[#F97316]"
                  : "border-transparent text-[#98A2B3] hover:text-[#667085]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "Overview" ? <SafetyOverview /> : null}
          {activeTab === "SCI Score" ? <SciScore /> : null}
          {activeTab === "Badges" ? <Badges /> : null}
          {activeTab === "Streaks" ? <Streaks /> : null}
        </div>
      </div>
    </section>
  );
}
