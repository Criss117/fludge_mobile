import { cn } from "@/modules/shared/lib/utils";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Text } from "../ui/text";

type Item = { label: string; value: string };

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, unknown, T>;
  name: Path<T>;
  description?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  items: Item[];
  triggerClass?: string;
  contentClass?: string;
}

function getDefaultValue(items: Item[], value?: string): Item | undefined {
  if (!value) return undefined;

  const label = items.find((item) => item.value === value);

  if (!label) return undefined;

  return {
    label: label.label,
    value: label.value,
  };
}

export function FormSelect<T extends FieldValues>({
  form,
  name,
  description,
  label,
  required,
  items,
  contentClass,
  triggerClass,
  disabled,
}: Props<T>) {
  const insets = useSafeAreaInsets();

  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 12,
    right: 12,
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
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
          <Select
            disabled={disabled}
            onValueChange={(v) => {
              if (!v) return;

              field.onChange(v.value);
            }}
            defaultValue={getDefaultValue(items, field.value)}
          >
            <SelectTrigger className={cn(triggerClass)}>
              <SelectValue placeholder="Selecciona una categoria" />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className={cn(contentClass)}>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem
                    label={item.label}
                    value={item.value}
                    key={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
