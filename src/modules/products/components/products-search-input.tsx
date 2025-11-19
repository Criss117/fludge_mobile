import { SearchInput } from "@/modules/shared/components/search-input";
import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import { useDebounce } from "@uidotdev/usehooks";
import { Link, usePathname } from "expo-router";
import { ArrowLeftRight, CameraIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useProductsFilters } from "../hooks/products-filters";

type SearchMode = "barcode" | "name";

interface Props {
  businessId: string;
  defaultBarcode?: string;
}

export function ProductsSearchInput({ businessId, defaultBarcode }: Props) {
  const pathname = usePathname();
  const { filtersDispatch } = useProductsFilters();
  const [searchBy, setSearchBy] = useState<SearchMode>(
    defaultBarcode ? "barcode" : "name"
  );
  const [searchTerm, setSearchTerm] = useState(
    searchBy === "barcode" ? (defaultBarcode ?? "") : ""
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const toggleSearchBy = () => {
    setSearchBy((prevSearchBy) => {
      if (prevSearchBy === "name") return "barcode";
      return "name";
    });
    setSearchTerm("");
  };

  useEffect(() => {
    if (debouncedSearchTerm.length === 0) {
      filtersDispatch({
        type: "set:name",
        payload: null,
      });

      filtersDispatch({
        type: "set:barcode",
        payload: null,
      });
      return;
    }

    if (searchBy === "name") {
      filtersDispatch({
        type: "set:name",
        payload: debouncedSearchTerm,
      });

      return;
    }

    if (searchBy === "barcode") {
      filtersDispatch({
        type: "set:barcode",
        payload: debouncedSearchTerm,
      });

      return;
    }
  }, [debouncedSearchTerm, searchBy, filtersDispatch]);

  return (
    <View className="flex flex-row gap-x-2">
      {searchBy === "name" && (
        <SearchInput
          className="flex-1"
          placeholder="Buscar productos por nombre"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
      )}
      {searchBy === "barcode" && (
        <View className="flex flex-row gap-x-1 flex-1">
          <SearchInput
            className="flex-1"
            placeholder="Buscar productos por codigo de barras"
            onChangeText={setSearchTerm}
            value={searchTerm}
          />
          <Link
            asChild
            push
            href={{
              pathname: "/businesses/[businessId]/barcode-reader",
              params: {
                businessId,
                from: pathname,
              },
            }}
          >
            <Button variant="outline" size="icon">
              <Icon as={CameraIcon} size={18} />
            </Button>
          </Link>
        </View>
      )}
      <Button variant="outline" size="icon" onPress={toggleSearchBy}>
        <Icon as={ArrowLeftRight} size={18} />
      </Button>
    </View>
  );
}

export function ProductsSearchInputSkeleton() {
  return (
    <View className="flex flex-row gap-x-2">
      <SearchInput
        className="flex-1"
        placeholder="Buscar productos por nombre"
        onChangeText={() => {}}
        value=""
      />
      <Button variant="outline" size="icon" disabled>
        <Icon as={ArrowLeftRight} size={18} />
      </Button>
    </View>
  );
}
