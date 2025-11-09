import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Input } from "@/modules/shared/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { ArrowLeftRight, CameraIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

type SearchMode = "barcode" | "name";

interface Props {
  onChangeTerm: (value: string | null, searchMode: SearchMode) => void;
}

export function ProductsSearchInput({ onChangeTerm }: Props) {
  const [searchBy, setSearchBy] = useState<SearchMode>("name");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const toggleSearchBy = () => {
    setSearchBy((prevSearchBy) => {
      if (prevSearchBy === "name") return "barcode";
      return "name";
    });
    setSearchTerm("");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length === 0) {
      onChangeTerm(null, searchBy);
      return;
    }
    onChangeTerm(debouncedSearchTerm, searchBy);

    return () => {
      onChangeTerm(null, searchBy);
    };
  }, [debouncedSearchTerm, onChangeTerm, searchBy]);

  return (
    <View className="flex flex-row gap-x-2">
      {searchBy === "name" && (
        <Input
          placeholder="Buscar productos por nombre"
          className="flex-1"
          onChangeText={handleSearch}
        />
      )}
      {searchBy === "barcode" && (
        <View className="flex flex-row gap-x-1 flex-1">
          <Input
            placeholder="Buscar productos por codigo de barras"
            className="flex-1"
          />
          <Button variant="outline" size="icon">
            <Icon as={CameraIcon} size={18} />
          </Button>
        </View>
      )}
      <Button variant="outline" size="icon" onPress={toggleSearchBy}>
        <Icon as={ArrowLeftRight} size={18} />
      </Button>
    </View>
  );
}
