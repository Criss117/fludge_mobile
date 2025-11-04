import { cn } from "@/modules/shared/lib/utils";
import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Text } from "../ui/text";

interface Props<T extends FieldValues>
  extends React.ComponentProps<typeof Input> {
  form: UseFormReturn<T, unknown, T>;
  name: Path<T>;
  description?: string;
  label?: string;
  required?: boolean;
  fieldClassName?: string;
}

export function FormInput<T extends FieldValues>({
  form,
  name,
  description,
  label,
  required,
  fieldClassName,
  ...props
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={cn(fieldClassName)}>
          {label && (
            <FieldLabel
              className={cn(fieldState.invalid && "text-destructive")}
            >
              {label} {required && <Text className="text-destructive">*</Text>}
              {!required && (
                <Text className="text-sm text-muted-foreground">
                  (opcional)
                </Text>
              )}
            </FieldLabel>
          )}
          <Input
            {...props}
            onBlur={field.onBlur}
            onChangeText={(e) => {
              if (
                props.inputMode === "numeric" ||
                props.inputMode === "decimal"
              ) {
                const value = Number(e);

                if (isNaN(value)) return;

                field.onChange(value);

                return;
              }
              field.onChange(e);
            }}
            value={
              field.value?.toString() === "0" ? "" : field.value?.toString()
            }
            className={cn(
              props.className,
              fieldState.invalid && "border-destructive"
            )}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
