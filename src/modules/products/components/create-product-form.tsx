"use no memo";

import { FormInput } from "@/modules/shared/components/form/form-input";
import { FormSelect } from "@/modules/shared/components/form/form-select";
import { FormSwitch } from "@/modules/shared/components/form/form-switch";
import { FormTextArea } from "@/modules/shared/components/form/form-text-area";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import { CategorySummary } from "@/shared/entities/categories.entity";
import {
  createProductSchema,
  CreateProductSchema,
} from "@/shared/schemas/products/create-product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { createContext, use } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Insets } from "react-native";
import { useMutateProducts } from "../hooks/use.mutate-products";

interface RootProps {
  children: React.ReactNode;
  businessSlug: string;
}

interface CategoryProps {
  categories: CategorySummary[];
  triggerClass?: string;
  contentClass?: string;
}

interface AllowNegativeStockProps {
  hitSlop?: number | Insets | null | undefined;
}

interface Context {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  form: ReturnType<typeof useForm<CreateProductSchema>>;
  isPending: boolean;
}

const CreateProductFormContext = createContext<Context | null>(null);

function useCreateProduct() {
  const context = use(CreateProductFormContext);

  if (!context) {
    throw new Error(
      "CreateProductFormContext must be used within a CreateProductFormProvider"
    );
  }

  return context;
}

function Root({ children, businessSlug }: RootProps) {
  const { create } = useMutateProducts();
  const router = useRouter();
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      barcode: "",
      purchasePrice: 0,
      salePrice: 0,
      wholesalePrice: 0,
      stock: 0,
      minStock: 0,
      description: "",
      allowNegativeStock: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    create.mutate(
      {
        data,
        businessSlug,
      },
      {
        onSuccess: () => {
          form.reset();
          router.replace({
            pathname: "/businesses/[businessSlug]/products",
            params: {
              businessSlug,
            },
          });
        },
      }
    );
  });

  return (
    <CreateProductFormContext.Provider
      value={{ form, onSubmit, isPending: create.isPending }}
    >
      {children}
    </CreateProductFormContext.Provider>
  );
}

function Name() {
  const { form } = useCreateProduct();

  return (
    <FormInput
      form={form}
      name="name"
      label="Nombre del producto"
      placeholder="Nombre del producto"
      required
    />
  );
}

function Description() {
  const { form } = useCreateProduct();

  return (
    <FormTextArea
      form={form}
      name="description"
      label="Descripción del producto"
      placeholder="Descripción del producto"
    />
  );
}

function Barcode() {
  const { form } = useCreateProduct();

  return (
    <FormInput
      form={form}
      name="barcode"
      label="Código de barras"
      placeholder="Escanea o ingresa manualmente"
      required
    />
  );
}

function PurchasePrice() {
  const { form } = useCreateProduct();

  return (
    <FormInput
      form={form}
      name="purchasePrice"
      label="Precio de compra"
      placeholder="Precio de compra"
      keyboardType="numeric"
      inputMode="numeric"
      required
    />
  );
}

function SalePrice() {
  const { form } = useCreateProduct();

  return (
    <FormInput
      form={form}
      name="salePrice"
      label="Precio de venta"
      placeholder="Precio de venta"
      keyboardType="numeric"
      inputMode="numeric"
      required
    />
  );
}

function WholesalePrice() {
  const { form } = useCreateProduct();

  return (
    <FormInput
      form={form}
      name="wholesalePrice"
      label="Precio al por mayor"
      placeholder="Precio al por mayor"
      keyboardType="numeric"
      inputMode="numeric"
      required
    />
  );
}

function OfferPrice() {
  const { form } = useCreateProduct();

  return (
    <FormInput
      form={form}
      name="offerPrice"
      label="Precio de oferta"
      placeholder="Precio de oferta"
      keyboardType="numeric"
      inputMode="numeric"
    />
  );
}

function Stock() {
  const { form } = useCreateProduct();

  return (
    <FormInput
      form={form}
      name="stock"
      label="Stock"
      placeholder="Stock"
      keyboardType="numeric"
      inputMode="numeric"
      required
    />
  );
}

function MinStock() {
  const { form } = useCreateProduct();

  return (
    <FormInput
      form={form}
      name="minStock"
      label="Stock Mínimo"
      placeholder="Stock Mínimo"
      keyboardType="numeric"
      inputMode="numeric"
      required
    />
  );
}

function AllowNegativeStock({ hitSlop }: AllowNegativeStockProps) {
  const { form } = useCreateProduct();

  return (
    <FormSwitch
      form={form}
      name="allowNegativeStock"
      label="Permitir stock negativo"
      hitSlop={hitSlop}
    />
  );
}

function Category({ categories, contentClass, triggerClass }: CategoryProps) {
  const { form } = useCreateProduct();

  return (
    <FormSelect
      form={form}
      name="categoryId"
      label="Categoria"
      items={categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))}
      triggerClass={triggerClass}
      contentClass={contentClass}
    />
  );
}

function Submit() {
  const { onSubmit, isPending } = useCreateProduct();

  return (
    <Button onPress={onSubmit} disabled={isPending}>
      {!isPending && <Text>Crear Producto</Text>}
      {isPending && <ActivityIndicator className="text-white" />}
    </Button>
  );
}

export const CreateProductForm = {
  useCreateProduct,
  Root,
  Name,
  Description,
  Barcode,
  PurchasePrice,
  SalePrice,
  WholesalePrice,
  Stock,
  MinStock,
  OfferPrice,
  Submit,
  Category,
  AllowNegativeStock,
};
