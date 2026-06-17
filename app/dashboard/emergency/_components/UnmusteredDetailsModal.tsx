"use client";

type UnmusteredPerson = {
  name: string;
  rfid: string;
  department: string;
  cabin: string;
  contact: string;
  lastSeen: string;
};

type UnmusteredDetailsModalProps = {
  open: boolean;
  person: UnmusteredPerson | null;
  onClose: () => void;
};

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21C12 21 18 15.4 18 10.8C18 7.6 15.3 5 12 5C8.7 5 6 7.6 6 10.8C6 15.4 12 21 12 21Z"
        fill="currentColor"
      />
      <circle cx="12" cy="10.8" r="2.2" fill="#ffffff" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.6 10.8C8.4 14.4 10.8 16.8 14.4 18.6L16.8 16.2C17.1 15.9 17.5 15.8 17.9 15.9C19.1 16.3 20.4 16.5 21.8 16.5C22.4 16.5 23 17.1 23 17.7V21.5C23 22.1 22.4 22.7 21.8 22.7C10.1 22.7 0.3 12.9 0.3 1.2C0.3 0.6 0.9 0 1.5 0H5.3C5.9 0 6.5 0.6 6.5 1.2C6.5 2.6 6.7 3.9 7.1 5.1C7.2 5.5 7.1 5.9 6.8 6.2L4.4 8.6"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function UnmusteredDetailsModal({
  open,
  person,
  onClose,
}: UnmusteredDetailsModalProps) {
  if (!open || !person) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center px-4 py-10">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-[540px] rounded-2xl bg-white px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-[#667085]"
              aria-label="Close details modal"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="-mt-2 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-[#053361]">
              <PinIcon />
            </div>
            <h2 className="mt-4 text-[16px] font-semibold text-[#053361]">
              Unmustered Personnel Details
            </h2>
            <p className="mt-2 text-[12px] text-[#98A2B3]">
              Detailed information and actions for unmustered personnel
            </p>
          </div>

          <div className="mt-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-[16px] font-semibold text-[#101828]">{person.name}</p>
              <p className="mt-1 text-[11px] text-[#98A2B3]">{person.rfid}</p>
            </div>
            <span className="inline-flex rounded-full bg-[#FEF3F2] px-3 py-1 text-[10px] font-medium text-[#F04438]">
              Not Mustered
            </span>
          </div>

          <div className="mt-5 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-[10px] text-[#98A2B3]">Department</p>
                <p className="mt-1 text-[16px] font-semibold text-[#053361]">
                  {person.department}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#98A2B3]">Cabin</p>
                <p className="mt-1 text-[16px] font-semibold text-[#053361]">
                  {person.cabin}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#98A2B3]">Contact</p>
                <p className="mt-1 text-[16px] font-semibold text-[#053361]">
                  {person.contact}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#98A2B3]">Last Seen</p>
                <p className="mt-1 text-[16px] font-semibold text-[#053361]">
                  {person.lastSeen}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#F97316] px-4 text-[14px] font-semibold text-white"
            >
              <PhoneIcon />
              Call
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 text-[14px] font-semibold text-[#344054]"
            >
              <PinIcon />
              Track
            </button>
            <button
              type="button"
              className="h-11 rounded-lg border border-[#D0D5DD] bg-white px-4 text-[14px] font-semibold text-[#667085]"
            >
              Send Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
