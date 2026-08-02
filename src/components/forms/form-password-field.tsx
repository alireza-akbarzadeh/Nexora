"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authInputClassName, authLabelClassName } from "@/components/auth/auth-field-styles";
import { cn } from "@/lib/utils";

interface FormPasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  variant?: "default" | "auth";
}

export function FormPasswordField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  autoComplete,
  variant = "default",
}: FormPasswordFieldProps<T>) {
  const [visible, setVisible] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            htmlFor={field.name}
            className={variant === "auth" ? authLabelClassName : undefined}
          >
            {label}
          </FieldLabel>
          <div className="relative">
            <Input
              {...field}
              id={field.name}
              type={visible ? "text" : "password"}
              placeholder={placeholder}
              autoComplete={autoComplete}
              aria-invalid={fieldState.invalid}
              className={cn(
                "pr-11",
                variant === "auth" && authInputClassName,
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                "absolute top-1/2 right-1.5 z-10 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                variant === "auth" && "hover:bg-white/10",
              )}
              onClick={() => setVisible((current) => !current)}
              aria-label={visible ? "Hide password" : "Show password"}
            >
              {visible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
