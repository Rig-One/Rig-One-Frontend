import EmptyState from "../_components/EmptyState";
import { PlusIcon } from "../_components/DashboardIcons";

export default function EmptyDashboardPage() {
  return (
    <section>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] text-[#053361]">
            Operations
          </h1>
          <p className="mt-1 text-[18px] text-[#667085]">
            Manage and monitor rig operations
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#0B3D78] px-6 py-3 text-[15px] font-semibold text-white"
        >
          <PlusIcon />
          Create New Operation
        </button>
      </div>

      <EmptyState />
    </section>
  );
}
