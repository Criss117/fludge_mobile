import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { cn } from "../../lib/utils";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface Props<T extends FieldValues>
  extends React.ComponentProps<typeof Input> {
  form: UseFormReturn<T, unknown, T>;
  name: Path<T>;
  description?: string;
  label?: string;
}

export function FormInput<T extends FieldValues>({
  form,
  name,
  description,
  label,
  ...props
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel
              className={cn(fieldState.invalid && "text-destructive")}
            >
              {label}
            </FieldLabel>
          )}
          <Input
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
