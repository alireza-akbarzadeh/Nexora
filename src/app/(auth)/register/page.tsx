"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormPasswordField } from "@/components/forms/form-password-field";
import { FormTextField } from "@/components/forms/form-text-field";
import { authClient } from "@/lib/auth/client";
import {
  registerSchema,
  type RegisterFormValues,
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

    router.push("/");
    router.refresh();
  }

  return (
    <Card className="border-border/80">
      <CardHeader>
        <CardTitle>Create your Nexora account</CardTitle>
        <CardDescription>
          Start trading with real exchange connectivity and live market data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <FormTextField
              control={form.control}
              name="name"
              label="Name"
              autoComplete="name"
              placeholder="Your name"
            />
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
              autoComplete="new-password"
              placeholder="At least 8 characters"
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
            {form.formState.isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
