"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import AuthField from "../_components/AuthField";
import AuthLayout from "../_components/AuthLayout";
import { AUTH_ROLE_OPTIONS } from "../_components/authRoles";

export default function RegisterPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const passwordsMatch =
    formValues.password.length > 0 &&
    formValues.password === formValues.confirmPassword;

  const isFormValid = useMemo(() => {
    return (
      Object.values(formValues).every((value) => value.trim().length > 0) &&
      passwordsMatch
    );
  }, [formValues, passwordsMatch]);

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

    router.push("/dashboard");
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
        <p className="mt-5 max-w-[360px] text-[14px] leading-5 text-[#6B7280]">
          Securely manage rig personnel, feeding, and safety operations in real
          time.
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
          autoComplete="new-password"
          value={formValues.password}
          onChange={(event) => updateField("password", event.target.value)}
        />
        <AuthField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          required
          autoComplete="new-password"
          value={formValues.confirmPassword}
          onChange={(event) =>
            updateField("confirmPassword", event.target.value)
          }
        />

        {!passwordsMatch && formValues.confirmPassword ? (
          <p className="w-full max-w-[510px] text-left text-[12px] leading-5 text-[#F97316]">
            Passwords must match before you can continue.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!isFormValid}
          className={submitButtonClassName}
        >
          Get Started
        </button>

        <p className="mt-2 text-[14px] leading-5 text-[#667085]">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-bold text-[14px] text-[#F97316]">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
