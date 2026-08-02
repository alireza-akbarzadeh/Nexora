"use client";

import { Check, Copy, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authInputClassName } from "@/components/auth/auth-field-styles";
import { OtpInput } from "@/components/auth/otp-input";
import { FormPasswordField } from "@/components/forms/form-password-field";
import { authClient } from "@/lib/auth/client";
import {
  enableTwoFactorSchema,
  type EnableTwoFactorFormValues,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

type SetupStep = "idle" | "qr" | "done";

export function TwoFactorSetup() {
  const { data: session, refetch } = authClient.useSession();
  const [step, setStep] = useState<SetupStep>("idle");
  const [totpUri, setTotpUri] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verifyCode, setVerifyCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const form = useForm<EnableTwoFactorFormValues>({
    resolver: zodResolver(enableTwoFactorSchema),
    defaultValues: { password: "" },
  });

  const isEnabled = Boolean(session?.user?.twoFactorEnabled);

  async function handleEnable(values: EnableTwoFactorFormValues) {
    setError(null);
    setLoading(true);
    try {
      const result = await authClient.twoFactor.enable({
        password: values.password,
        issuer: "Nexora",
      });

      if (result.error) {
        setError(result.error.message ?? "Unable to enable 2FA");
        return;
      }

      setTotpUri(result.data?.totpURI ?? null);
      setBackupCodes(result.data?.backupCodes ?? []);
      setStep("qr");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifySetup() {
    setError(null);
    setLoading(true);
    try {
      const result = await authClient.twoFactor.verifyTotp({
        code: verifyCode.trim(),
      });

      if (result.error) {
        setError(result.error.message ?? "Invalid code");
        return;
      }

      setStep("done");
      await refetch();
    } finally {
      setLoading(false);
    }
  }

  async function handleDisable() {
    const password = window.prompt("Enter your password to disable 2FA:");
    if (!password) return;

    setError(null);
    setLoading(true);
    try {
      const result = await authClient.twoFactor.disable({ password });
      if (result.error) {
        setError(result.error.message ?? "Unable to disable 2FA");
        return;
      }
      setStep("idle");
      setTotpUri(null);
      setBackupCodes([]);
      setVerifyCode("");
      form.reset();
      await refetch();
    } finally {
      setLoading(false);
    }
  }

  async function copyBackupCodes() {
    await navigator.clipboard.writeText(backupCodes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (isEnabled && step !== "qr") {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl border border-[color-mix(in_srgb,var(--profit)_25%,transparent)] bg-[color-mix(in_srgb,var(--profit)_8%,transparent)] p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-profit" />
          <div>
            <p className="font-medium text-profit">2FA is active</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your account requires an authenticator code at sign in.
            </p>
          </div>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button
          type="button"
          variant="outline"
          loading={loading}
          loadingText="Disabling"
          onClick={handleDisable}
        >
          Disable two-factor authentication
        </Button>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--profit)_15%,transparent)]">
          <Check className="h-7 w-7 text-profit" />
        </div>
        <div>
          <p className="font-medium">Two-factor authentication enabled</p>
          <p className="mt-1 text-sm text-muted-foreground">
            You&apos;ll be asked for a code from your authenticator app when signing in.
          </p>
        </div>
      </div>
    );
  }

  if (step === "qr" && totpUri) {
    return (
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="rounded-2xl border border-white/10 bg-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(totpUri)}`}
              alt="Scan with authenticator app"
              width={160}
              height={160}
              className="rounded-lg"
            />
          </div>
          <div className="flex-1 space-y-2 text-sm">
            <p className="font-medium">Scan with your authenticator app</p>
            <p className="text-muted-foreground">
              Use Google Authenticator, Authy, 1Password, or any TOTP-compatible app.
            </p>
            <p className="break-all rounded-lg bg-white/[0.03] p-2 font-mono text-[10px] text-muted-foreground">
              {totpUri}
            </p>
          </div>
        </div>

        {backupCodes.length > 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium">Backup codes</p>
              <Button type="button" size="sm" variant="ghost" onClick={copyBackupCodes}>
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {backupCodes.map((c) => (
                <span key={c} className="rounded-md bg-white/[0.04] px-2 py-1">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Store these somewhere safe. Each code works once if you lose your device.
            </p>
          </div>
        ) : null}

        <div className="space-y-3">
          <p className="text-sm font-medium">Enter the 6-digit code to confirm</p>
          <OtpInput value={verifyCode} onChange={setVerifyCode} disabled={loading} />
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <Button
          type="button"
          className="w-full"
          disabled={verifyCode.trim().length < 6}
          loading={loading}
          loadingText="Verifying"
          onClick={handleVerifySetup}
        >
          Activate 2FA
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Add a second layer of protection with time-based codes from an authenticator app.
      </p>
      <form onSubmit={form.handleSubmit(handleEnable)} className="space-y-4">
        <FieldGroup>
          <FormPasswordField
            control={form.control}
            name="password"
            label="Confirm password"
            autoComplete="current-password"
            placeholder="Enter your password"
            variant="auth"
          />
        </FieldGroup>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" className="w-full" loading={loading} loadingText="Setting up">
          Enable authenticator 2FA
        </Button>
      </form>
    </div>
  );
}
