function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 5V19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HelmetIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-24 w-24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 72C24 46.6 40.3 28 60 28C79.7 28 96 46.6 96 72V75C96 79.4 92.4 83 88 83H32C27.6 83 24 79.4 24 75V72Z"
        fill="#E4E7EC"
      />
      <path d="M58 28H62L66 72H54L58 28Z" fill="#D0D5DD" />
      <path
        d="M27 67H93"
        stroke="#D0D5DD"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <span className="text-[#E4E7EC]">
          <HelmetIcon />
        </span>
        <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.03em] text-[#053361]">
          No Active Operations
        </h2>
        <p className="mt-2 max-w-[420px] text-[18px] text-[#667085]">
          There are currently no rig operations running.
        </p>
        <button
          type="button"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B3D78] px-6 py-3 text-[15px] font-semibold text-white"
        >
          <PlusIcon />
          Create New Operation
        </button>
      </div>
    </section>
  );
}
