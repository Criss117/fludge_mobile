import { cn } from "@/modules/shared/lib/utils";
import * as Haptics from "expo-haptics";
import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import { Switch } from "../ui/switch";
import { Text } from "../ui/text";

type SwitchProps = Omit<
  React.ComponentProps<typeof Switch>,
  "checked" | "onCheckedChange"
>;

interface Props<T extends FieldValues> extends SwitchProps {
  form: UseFormReturn<T, unknown, T>;
  name: Path<T>;
  description?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormSwitch<T extends FieldValues>({
  form,
  name,
  description,
  label,
  required,
  ...props
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
          <FieldContent>
            {label && (
              <FieldLabel
                className={cn(fieldState.invalid && "text-destructive")}
              >
                {label}{" "}
                {required && <Text className="text-destructive">*</Text>}
                {!required && (
                  <Text className="text-sm text-muted-foreground">
                    (opcional)
                  </Text>
                )}
              </FieldLabel>
            )}
            {description && <FieldDescription>{description}</FieldDescription>}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
          <Switch
            {...props}
            checked={field.value}
            onCheckedChange={(value) => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              field.onChange(value);
            }}
          />
        </Field>
      )}
    />
  );
}
