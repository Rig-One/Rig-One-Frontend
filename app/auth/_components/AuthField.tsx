"use client";

import * as React from "react";

type SelectOption = {
  value: string;
  label: string;
};

type AuthFieldProps = {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  type: "text" | "email" | "password" | "select";
  options?: SelectOption[];
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  className?: string;
};

export default function AuthField({
  id,
  name,
  label,
  placeholder,
  required,
  autoComplete,
  type,
  options,
  defaultValue,
  value,
  disabled,
  onChange,
  className,
}: AuthFieldProps) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const containerClassName = [
    "flex w-full max-w-[510px] flex-col gap-1.5",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const controlClassName =
    "h-11 w-full rounded-lg border border-[#D5D7DA] bg-white px-[14px] py-[10px] text-[16px] leading-6 text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#98A2B3] focus:ring-2 focus:ring-[#98A2B3]/25 disabled:cursor-not-allowed disabled:bg-[#F9FAFB] disabled:text-[#98A2B3]";

  return (
    <div className={containerClassName}>
      {label ? (
        <label
          htmlFor={id}
          className="text-[14px] font-medium leading-5 text-[#344054]"
        >
          {label}
        </label>
      ) : null}

      {type === "select" ? (
        <div className="relative">
          <select
            id={id}
            name={name ?? id}
            required={required}
            defaultValue={defaultValue ?? ""}
            value={value}
            disabled={disabled}
            onChange={onChange}
            className={[
              controlClassName,
              "appearance-none pr-10 invalid:text-[#98A2B3]",
            ].join(" ")}
          >
            <option value="" disabled className="text-[#98A2B3]">
              {placeholder ?? "Select an option"}
            </option>
            {(options ?? []).map((opt) => (
              <option key={opt.value} value={opt.value} className="text-[#101828]">
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#667085]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
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
          </span>
        </div>
      ) : (
        <div className="relative">
          <input
            id={id}
            name={name ?? id}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            value={value}
            disabled={disabled}
            onChange={onChange}
            type={
              type === "password"
                ? passwordVisible
                  ? "text"
                  : "password"
                : type
            }
            className={[
              controlClassName,
              type === "password" ? "pr-11" : "",
            ].join(" ")}
          />

          {type === "password" ? (
            <button
              type="button"
              onClick={() => setPasswordVisible((v) => !v)}
              className="absolute inset-y-0 right-3 flex items-center text-[#667085]"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 3L21 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.58 10.58C10.21 10.95 10 11.45 10 12C10 13.1 10.9 14 12 14C12.55 14 13.05 13.79 13.42 13.42"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.88 5.09C10.56 4.84 11.27 4.71 12 4.71C16.27 4.71 19.82 7.63 21 12C20.62 13.39 19.94 14.66 19 15.71"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.23 6.23C4.43 7.51 3.1 9.53 2.25 12C3.43 16.37 6.98 19.29 11.25 19.29C12.67 19.29 14.03 18.97 15.28 18.38"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2.25 12C3.43 7.63 6.98 4.71 11.25 4.71C15.52 4.71 19.07 7.63 20.25 12C19.07 16.37 15.52 19.29 11.25 19.29C6.98 19.29 3.43 16.37 2.25 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.25 15C12.9069 15 14.25 13.6569 14.25 12C14.25 10.3431 12.9069 9 11.25 9C9.59315 9 8.25 10.3431 8.25 12C8.25 13.6569 9.59315 15 11.25 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
