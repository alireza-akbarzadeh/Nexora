"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authInputClassName, authLabelClassName } from "@/components/auth/auth-field-styles";
import { cn } from "@/lib/utils";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: React.ComponentProps<typeof Input>["type"];
  placeholder?: string;
  autoComplete?: string;
  variant?: "default" | "auth";
}

export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  variant = "default",
}: FormFieldProps<T>) {
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
          <Input
            {...field}
            id={field.name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
            className={cn(variant === "auth" && authInputClassName)}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
