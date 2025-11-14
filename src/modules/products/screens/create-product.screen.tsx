import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { FieldSet } from "@/modules/shared/components/ui/field";
import { Icon } from "@/modules/shared/components/ui/icon";
import type { CategorySummary } from "@/shared/entities/categories.entity";
import { ChartNoAxesGantt, CheckCircle, DollarSign } from "lucide-react-native";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { CreateProductForm } from "../components/create-product-form";

interface Props {
  businessSlug: string;
  categories: CategorySummary[];
}

export function CreateProductScreen({ businessSlug, categories }: Props) {
  return (
    <KeyboardAwareScrollView>
      <View className="flex gap-y-4 px-2 pt-5 pb-10">
        <CreateProductForm.Root businessSlug={businessSlug}>
          <Card>
            <CardHeader className="flex flex-row gap-x-2 items-center">
              <Icon as={CheckCircle} size={20} />
              <CardTitle variant="h3">Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-y-2">
              <CreateProductForm.Barcode />
              <CreateProductForm.Name />
              <CreateProductForm.Description />
              <CreateProductForm.Category
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
                  <CreateProductForm.PurchasePrice />
                </View>
                <View className="flex-1">
                  <CreateProductForm.SalePrice />
                </View>
              </FieldSet>
              <FieldSet className="flex flex-row">
                <View className="flex-1">
                  <CreateProductForm.WholesalePrice />
                </View>
                <View className="flex-1">
                  <CreateProductForm.OfferPrice />
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
                  <CreateProductForm.Stock />
                </View>
                <View className="flex-1">
                  <CreateProductForm.MinStock />
                </View>
              </View>
              <Card>
                <CardContent>
                  <CreateProductForm.AllowNegativeStock
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

          <CreateProductForm.Submit />
        </CreateProductForm.Root>
      </View>
    </KeyboardAwareScrollView>
  );
}
