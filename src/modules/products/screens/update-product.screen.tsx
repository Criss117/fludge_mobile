import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { FieldSet } from "@/modules/shared/components/ui/field";
import { Icon } from "@/modules/shared/components/ui/icon";
import type { CategorySummary } from "@/shared/entities/categories.entity";
import type { ProductSummary } from "@/shared/entities/products.entity";
import { ChartNoAxesGantt, CheckCircle, DollarSign } from "lucide-react-native";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ProductForm } from "../components/product-form";

interface Props {
  businessId: string;
  categories: CategorySummary[];
  product: ProductSummary;
}

export function UpdateProductScreen({
  product,
  businessId,
  categories,
}: Props) {
  return (
    <KeyboardAwareScrollView>
      <View className="flex gap-y-4 px-2 pt-5 pb-10">
        <ProductForm.Root
          businessId={businessId}
          type="update"
          defaultValues={product}
          productId={product.id}
        >
          <Card>
            <CardHeader className="flex flex-row gap-x-2 items-center">
              <Icon as={CheckCircle} size={20} />
              <CardTitle variant="h3">Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-y-2">
              <ProductForm.Barcode />
              <ProductForm.Name />
              <ProductForm.Description />
              <ProductForm.Category
                categories={categories}
                contentClass="w-[300px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row gap-x-2 items-center">
              <Icon as={DollarSign} size={20} />
              <CardTitle variant="h3">Precios</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-y-2">
              <FieldSet className="flex flex-row">
                <View className="flex-1">
                  <ProductForm.PurchasePrice />
                </View>
                <View className="flex-1">
                  <ProductForm.SalePrice />
                </View>
              </FieldSet>
              <FieldSet className="flex flex-row">
                <View className="flex-1">
                  <ProductForm.WholesalePrice />
                </View>
                <View className="flex-1">
                  <ProductForm.OfferPrice />
                </View>
              </FieldSet>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row gap-x-2 items-center">
              <Icon as={ChartNoAxesGantt} size={20} />
              <CardTitle variant="h3">Inventario</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-y-2">
              <View className="flex flex-row gap-x-2">
                <View className="flex-1">
                  <ProductForm.Stock />
                </View>
                <View className="flex-1">
                  <ProductForm.MinStock />
                </View>
              </View>
              <Card>
                <CardContent>
                  <ProductForm.AllowNegativeStock
                    hitSlop={{
                      bottom: 60,
                      top: 10,
                      left: 500,
                      right: 100,
                    }}
                  />
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <ProductForm.Submit />
        </ProductForm.Root>
      </View>
    </KeyboardAwareScrollView>
  );
}
