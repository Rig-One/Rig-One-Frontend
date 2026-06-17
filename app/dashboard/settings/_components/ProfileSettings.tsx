"use client";

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 20L8 19L18 9C18.55 8.45 18.55 7.55 18 7L17 6C16.45 5.45 15.55 5.45 15 6L5 16L4 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserAvatarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="8.5" r="3.2" fill="currentColor" />
      <path
        d="M6.8 18.2C7.7 15.8 9.5 14.4 12 14.4C14.5 14.4 16.3 15.8 17.2 18.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileField({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="text-[12px] font-medium text-[#344054]">{label}</label>
      <input
        value={value}
        readOnly
        className="mt-2 h-11 w-full rounded-[8px] border border-[#D0D5DD] bg-white px-3 text-[14px] text-[#667085] outline-none"
      />
    </div>
  );
}

export default function ProfileSettings() {
  return (
    <section>
      <div>
        <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#053361]">Profile</h1>
        <p className="mt-1 text-[14px] text-[#667085]">
          Generate and export operational reports
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-[520px]">
        <div className="flex justify-center">
          <div className="relative">
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#FEE4D7] text-[#F97316]">
              <UserAvatarIcon />
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md border border-[#D0D5DD] bg-white text-[#667085]"
              aria-label="Edit profile image"
            >
              <EditIcon />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <ProfileField label="First Name" value="Chinedu" />
          <ProfileField label="Last Name" value="Eze" />
          <ProfileField label="Email Address" value="ceze@gmail.com" fullWidth />
          <ProfileField label="Role" value="HSE Officer" fullWidth />
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[28px] font-semibold text-[#053361]">Change Password</h2>
            <p className="mt-1 text-[14px] text-[#667085]">Secure your account</p>
          </div>
          <button
            type="button"
            className="pb-1 text-[14px] font-semibold text-[#F97316] underline underline-offset-4"
          >
            Change Password
          </button>
        </div>
      </div>
    </section>
  );
}
