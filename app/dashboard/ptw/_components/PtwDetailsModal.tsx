"use client";

import type { PtwRow, PtwStatus } from "./PtwTable";

type ApprovalAction = "approve" | "reject";

type PtwDetailsModalProps = {
  open: boolean;
  permit: PtwRow | null;
  confirmAction: ApprovalAction | null;
  successAction: ApprovalAction | null;
  onClose: () => void;
  onRequestAction: (action: ApprovalAction) => void;
  onConfirmAction: () => void;
  onCloseConfirm: () => void;
  onCloseSuccess: () => void;
};

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

function ClipboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 4.5C9 3.67 9.67 3 10.5 3H13.5C14.33 3 15 3.67 15 4.5V6H9V4.5Z"
        fill="currentColor"
      />
      <path
        d="M7 5.5H6.8C5.81 5.5 5 6.31 5 7.3V18.2C5 19.19 5.81 20 6.8 20H17.2C18.19 20 19 19.19 19 18.2V7.3C19 6.31 18.19 5.5 17.2 5.5H17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.5 11H15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.5 14.5H15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckSuccessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-9 w-9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 12L10.5 15.5L17 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 3L21 19H3L12 3Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}

function popupCopy(action: ApprovalAction) {
  if (action === "approve") {
    return {
      title: "Approve Permit?",
      text: "This action will approve this PTW and allow the job to proceed.",
      confirmLabel: "Approve Permit",
      confirmClass: "bg-[#053361] text-white",
      toneClass: "bg-[#EEF4FF] text-[#053361]",
    };
  }

  return {
    title: "Reject Permit?",
    text: "This action will reject this PTW and move it to the closed state.",
    confirmLabel: "Reject Permit",
    confirmClass: "bg-[#F04438] text-white",
    toneClass: "bg-[#FEF3F2] text-[#F04438]",
  };
}

function successCopy(action: ApprovalAction) {
  if (action === "approve") {
    return {
      title: "Permit Approved",
      text: "The permit has been approved successfully.",
    };
  }

  return {
    title: "Permit Rejected",
    text: "The permit has been rejected successfully.",
  };
}

function fieldValueClasses(status: PtwStatus) {
  if (status === "Approved") return "bg-[#EAF7EC] text-[#4E9765]";
  if (status === "Pending") return "bg-[#FFF3DD] text-[#B76E00]";
  return "bg-[#EAECF5] text-[#475467]";
}

export default function PtwDetailsModal({
  open,
  permit,
  confirmAction,
  successAction,
  onClose,
  onRequestAction,
  onConfirmAction,
  onCloseConfirm,
  onCloseSuccess,
}: PtwDetailsModalProps) {
  if (!open || !permit) return null;

  const isPending = permit.status === "Pending";
  const showOverlay = confirmAction !== null || successAction !== null;
  const currentPopup = confirmAction ? popupCopy(confirmAction) : null;
  const currentSuccess = successAction ? successCopy(successAction) : null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-0 overflow-y-auto px-4 py-10">
        <div className="flex min-h-full items-center justify-center">
          <div className="relative w-full max-w-[520px]">
            <div
              role="dialog"
              aria-modal="true"
              className="relative rounded-[12px] bg-white px-4 pb-4 pt-3 shadow-[0_18px_55px_rgba(0,0,0,0.35)] sm:px-4"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[#667085]"
                  aria-label="Close permit details modal"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="-mt-1 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-[#0B4A8B]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCEBFA]">
                    <ClipboardIcon />
                  </div>
                </div>
                <h2 className="mt-4 text-[14px] font-semibold text-[#053361]">
                  Permit To Work Details
                </h2>
                <p className="mt-1 text-[12px] text-[#98A2B3]">
                  PTW ID: {permit.id}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-[12px] font-medium text-[#344054]">Approval Routing</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {permit.routedTo.map((person) => (
                    <span
                      key={person}
                      className="inline-flex rounded-full bg-[#F2F4F7] px-3 py-1 text-[11px] font-medium text-[#667085]"
                    >
                      {person}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-3 border-b border-[#EAECF0] pb-4">
                <div>
                  <p className="text-[10px] text-[#667085]">Job Type</p>
                  <p className="mt-1 text-[12px] font-medium text-[#344054]">{permit.jobType}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#667085]">Location</p>
                  <p className="mt-1 text-[12px] font-medium text-[#344054]">{permit.location}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#667085]">AI Risk Level</p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      permit.aiRisk === "High"
                        ? "bg-[#FEF3F2] text-[#F04438]"
                        : permit.aiRisk === "Medium"
                          ? "bg-[#FFF3DD] text-[#B76E00]"
                          : "bg-[#EAF7EC] text-[#4E9765]"
                    }`}
                  >
                    {permit.aiRisk}
                  </span>
                </div>
                <div className="flex justify-end">
                  <span
                    className={`inline-flex h-fit rounded-full px-3 py-1 text-[11px] font-medium ${fieldValueClasses(
                      permit.status,
                    )}`}
                  >
                    {permit.status}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-[12px] font-medium text-[#344054]">
                  Approval Comments <span className="text-[#F04438]">*</span>
                </label>
                <textarea
                  rows={4}
                  defaultValue={permit.reviewNote}
                  placeholder="Enter approval or rejection comments"
                  className="mt-2 w-full rounded-[8px] border border-[#D0D5DD] px-3 py-3 text-[14px] text-[#344054] outline-none placeholder:text-[#98A2B3]"
                />
              </div>

              <div className="mt-4 rounded-[8px] border border-[#EAECF0] bg-[#F9FAFB] p-4">
                <h3 className="text-[12px] font-semibold text-[#053361]">AI Recommendations</h3>
                <div className="mt-3 space-y-3">
                  {permit.controlMeasures.map((measure) => (
                    <div key={measure} className="flex items-start gap-3 text-[12px] text-[#667085]">
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#667085]" />
                      <span>{measure}</span>
                    </div>
                  ))}
                </div>
              </div>

              {isPending ? (
                <div className="mt-7 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onRequestAction("reject")}
                    className="h-10 rounded-[8px] border border-[#D0D5DD] bg-white px-4 text-[14px] font-semibold text-[#475467]"
                  >
                    Reject PTW
                  </button>
                  <button
                    type="button"
                    onClick={() => onRequestAction("approve")}
                    className="h-10 rounded-[8px] bg-[#053361] px-4 text-[14px] font-semibold text-white"
                  >
                    Approve PTW
                  </button>
                </div>
              ) : null}
            </div>

            {showOverlay ? <div className="absolute inset-0 rounded-[12px] bg-[#101828]/30" /> : null}

            {currentPopup ? (
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="relative z-10 w-full max-w-[360px] rounded-[12px] bg-white px-5 py-5 shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={onCloseConfirm}
                      className="text-[#667085]"
                      aria-label="Close confirmation popup"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div className="text-center">
                    <div
                      className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${currentPopup.toneClass}`}
                    >
                      <WarningIcon />
                    </div>
                    <h3 className="mt-4 text-[20px] font-semibold text-[#053361]">
                      {currentPopup.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#667085]">{currentPopup.text}</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={onCloseConfirm}
                      className="h-10 rounded-[8px] border border-[#D0D5DD] bg-white text-[14px] font-semibold text-[#344054]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={onConfirmAction}
                      className={`h-10 rounded-[8px] text-[14px] font-semibold ${currentPopup.confirmClass}`}
                    >
                      {currentPopup.confirmLabel}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {currentSuccess ? (
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="relative z-10 w-full max-w-[360px] rounded-[12px] bg-white px-5 py-7 text-center shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16B364]">
                    <CheckSuccessIcon />
                  </div>
                  <h3 className="mt-7 text-[24px] font-semibold text-[#053361]">
                    {currentSuccess.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#667085]">{currentSuccess.text}</p>
                  <button
                    type="button"
                    onClick={onCloseSuccess}
                    className="mx-auto mt-7 flex h-11 w-full max-w-[240px] items-center justify-center rounded-[10px] bg-[#053361] px-5 text-[15px] font-semibold text-white"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
