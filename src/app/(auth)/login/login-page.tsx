"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TwoFactorVerify } from "@/components/auth/two-factor-verify";
import { FormPasswordField } from "@/components/forms/form-password-field";
import { FormTextField } from "@/components/forms/form-text-field";
import { authClient } from "@/lib/auth/client";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

type LoginStep = "credentials" | "two-factor";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const initialStep = searchParams.get("step") === "2fa" ? "two-factor" : "credentials";

  const [step, setStep] = useState<LoginStep>(initialStep);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (searchParams.get("step") === "2fa") {
      setStep("two-factor");
    }
  }, [searchParams]);

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);

    const result = await authClient.signIn.email(values, {
      onSuccess(context) {
        if (context.data.twoFactorRedirect) {
          setStep("two-factor");
        }
      },
    });

    if (result.error) {
      setServerError(result.error.message ?? "Unable to sign in");
      return;
    }

    if (result.data && "twoFactorRedirect" in result.data && result.data.twoFactorRedirect) {
      setStep("two-factor");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  if (step === "two-factor") {
    return (
      <TwoFactorVerify
        callbackUrl={callbackUrl}
        onBack={() => setStep("credentials")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGroup className="gap-4">
            <FormTextField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              variant="auth"
            />
            <FormPasswordField
              control={form.control}
              name="password"
              label="Password"
              autoComplete="current-password"
              placeholder="••••••••"
              variant="auth"
            />
        </FieldGroup>

        {serverError ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </div>
        ) : null}

        <Button
          type="submit"
          className="gradient-primary glow-primary h-11 w-full rounded-xl border-0 text-primary-foreground hover:opacity-90"
          loading={form.formState.isSubmitting}
          loadingText="Signing in"
        >
          Sign in securely
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground">
            New to Nexora?
          </span>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-violet hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
