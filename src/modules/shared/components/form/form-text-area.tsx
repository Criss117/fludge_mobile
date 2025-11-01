import { cn } from "@/modules/shared/lib/utils";
import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props<T extends FieldValues>
  extends React.ComponentProps<typeof Input> {
  form: UseFormReturn<T, unknown, T>;
  name: Path<T>;
  description?: string;
  label?: string;
  required?: boolean;
  fieldClassName?: string;
}

export function FormTextArea<T extends FieldValues>({
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
              {label}
            </FieldLabel>
          )}
          <Textarea
            {...props}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
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
