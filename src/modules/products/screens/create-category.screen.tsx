import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { CreateCategoryForm } from "../components/create-category-form";

interface Props {
  businessId: string;
}

export function CreateCategoryScreen({ businessId }: Props) {
  return (
    <KeyboardAwareScrollView>
      <CreateCategoryForm.Root businessId={businessId}>
        <CreateCategoryForm.Name />
        <CreateCategoryForm.Description />
        <CreateCategoryForm.Submit />
      </CreateCategoryForm.Root>
    </KeyboardAwareScrollView>
  );
}
