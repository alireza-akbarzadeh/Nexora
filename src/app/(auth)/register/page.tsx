"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthShell } from "@/components/auth/auth-shell";
import { FormPasswordField } from "@/components/forms/form-password-field";
import { FormTextField } from "@/components/forms/form-text-field";
import { authClient } from "@/lib/auth/client";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null);

    const result = await authClient.signUp.email(values);

    if (result.error) {
      setServerError(result.error.message ?? "Unable to create account");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Nexora and connect exchanges with encrypted API credentials."
    >
      <div className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="gap-4">
            <FormTextField
              control={form.control}
              name="name"
              label="Full name"
              autoComplete="name"
              placeholder="Your name"
              variant="auth"
            />
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
              autoComplete="new-password"
              placeholder="At least 8 characters"
              variant="auth"
            />
          </FieldGroup>

          <p className="text-xs leading-relaxed text-muted-foreground">
            By creating an account you agree to Nexora&apos;s terms. Enable two-factor
            authentication anytime from Settings for extra protection.
          </p>

          {serverError ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </div>
          ) : null}

          <Button
            type="submit"
            className="gradient-primary glow-primary h-11 w-full rounded-xl border-0 text-primary-foreground hover:opacity-90"
            loading={form.formState.isSubmitting}
            loadingText="Creating account"
          >
            Create account
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">
              Already trading with us?
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-violet hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
