"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormPasswordField } from "@/components/forms/form-password-field";
import { FormTextField } from "@/components/forms/form-text-field";
import { authClient } from "@/lib/auth/client";
import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);

    const result = await authClient.signIn.email(values);

    if (result.error) {
      setServerError(result.error.message ?? "Unable to sign in");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <Card className="border-border/80">
      <CardHeader>
        <CardTitle>Sign in to Nexora</CardTitle>
        <CardDescription>
          Access your trading dashboard and connected exchanges.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <FormTextField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
            <FormPasswordField
              control={form.control}
              name="password"
              label="Password"
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </FieldGroup>

          {serverError ? (
            <p className="text-sm text-destructive">{serverError}</p>
          ) : null}

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
