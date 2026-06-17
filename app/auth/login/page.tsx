"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import AuthField from "../_components/AuthField";
import AuthLayout from "../_components/AuthLayout";
import { AUTH_ROLE_OPTIONS } from "../_components/authRoles";

export default function LoginPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    role: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const isFormValid = useMemo(() => {
    return Object.values(formValues).every((value) => value.trim().length > 0);
  }, [formValues]);

  const submitButtonClassName = `mt-2 h-11 w-full max-w-[510px] rounded-lg text-[14px] font-semibold leading-5 text-white transition ${
    isFormValid
      ? "bg-[#053361] hover:bg-[#04294E]"
      : "bg-[#D0D5DD] text-[#98A2B3] disabled:cursor-not-allowed"
  }`;

  function updateField(name: keyof typeof formValues, value: string) {
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const destination = rememberMe ? "/dashboard" : "/dashboard";
    router.push(destination);
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center text-center">
        <Image
          src="/logos/rig_one_logo.svg"
          alt="RigOne"
          width={116}
          height={78}
          priority
        />
        <p className="text-[28px] font-bold leading-7 text-[#053361]">
          RigOne
        </p>
        <h1 className="mt-4 text-[22px] font-semibold leading-7 text-[#053361]">
          Welcome Back 👋
        </h1>
        <p className="mt-2 max-w-[360px] text-[12px] leading-5 text-[#6B7280]">
          Sign in to continue managing your rig operations safely and
          efficiently.
        </p>
      </div>

      <form className="mt-8 flex flex-col items-center gap-5" onSubmit={handleSubmit}>
        <AuthField
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          required
          autoComplete="email"
          value={formValues.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
        <AuthField
          id="role"
          type="select"
          label="Select Your Role"
          placeholder="Choose your entry point"
          required
          value={formValues.role}
          onChange={(event) => updateField("role", event.target.value)}
          options={AUTH_ROLE_OPTIONS.map((role) => ({
            value: role.value,
            label: role.label,
          }))}
        />
        <AuthField
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          value={formValues.password}
          onChange={(event) => updateField("password", event.target.value)}
        />

        <div className="flex w-full max-w-[510px] items-center justify-between">
          <label className="flex items-center gap-2 text-[12px] leading-5 text-[#667085]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border border-[#D5D7DA]"
            />
            Remember me
          </label>
          <Link
            href="#"
            className="text-[14px] font-bold leading-5 text-[#F97316]"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={submitButtonClassName}
        >
          Login
        </button>

        <p className="mt-2 text-[14px] leading-5 text-[#667085]">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-semibold text-[14px] text-[#F97316]">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
