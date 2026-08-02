"use client";

import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authInputClassName } from "@/components/auth/auth-field-styles";
import { OtpInput } from "@/components/auth/otp-input";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type TwoFactorVerifyProps = {
  callbackUrl: string;
  onBack?: () => void;
};

export function TwoFactorVerify({ callbackUrl, onBack }: TwoFactorVerifyProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [useBackup, setUseBackup] = useState(false);
  const [trustDevice, setTrustDevice] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    setError(null);
    setLoading(true);

    try {
      const result = useBackup
        ? await authClient.twoFactor.verifyBackupCode({
            code: backupCode.trim(),
            trustDevice,
          })
        : await authClient.twoFactor.verifyTotp({
            code: code.trim(),
            trustDevice,
          });

      if (result.error) {
        setError(result.error.message ?? "Invalid verification code");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = useBackup ? backupCode.trim().length >= 8 : code.trim().length >= 6;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--violet)_20%,transparent)] bg-[color-mix(in_srgb,var(--violet)_8%,transparent)] p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--violet)_15%,transparent)]">
          <ShieldCheck className="h-5 w-5 text-violet" />
        </div>
        <div>
          <p className="text-sm font-medium">Two-factor authentication required</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Enter the 6-digit code from your authenticator app to complete sign in.
          </p>
        </div>
      </div>

      {useBackup ? (
        <div className="space-y-2">
          <label className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Backup recovery code
          </label>
          <input
            value={backupCode}
            onChange={(e) => setBackupCode(e.target.value)}
            placeholder="Enter one of your backup codes"
            className={authInputClassName}
          />
        </div>
      ) : (
        <OtpInput value={code} onChange={setCode} disabled={loading} />
      )}

      <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <div>
          <p className="text-sm font-medium">Trust this device</p>
          <p className="text-xs text-muted-foreground">Skip 2FA on this device for 30 days</p>
        </div>
        <Switch checked={trustDevice} onCheckedChange={setTrustDevice} />
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button
        type="button"
        className="gradient-primary glow-primary h-11 w-full rounded-xl border-0 text-primary-foreground hover:opacity-90"
        disabled={!canSubmit}
        loading={loading}
        loadingText="Verifying"
        onClick={handleVerify}
      >
        Verify & continue
      </Button>

      <div className="flex flex-col items-center gap-3 text-sm">
        <button
          type="button"
          onClick={() => {
            setUseBackup((v) => !v);
            setError(null);
          }}
          className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground"
        >
          <KeyRound className="h-3.5 w-3.5" />
          {useBackup ? "Use authenticator code instead" : "Use a backup code instead"}
        </button>

        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to sign in
          </button>
        ) : (
          <Link href="/login" className="text-muted-foreground hover:text-foreground">
            Back to sign in
          </Link>
        )}
      </div>
    </div>
  );
}
