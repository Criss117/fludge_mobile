import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { CreateCategoryForm } from "../components/create-category-form";

interface Props {
  businessSlug: string;
}

export function CreateCategoryScreen({ businessSlug }: Props) {
  return (
    <KeyboardAwareScrollView>
      <CreateCategoryForm.Root businessSlug={businessSlug}>
        <CreateCategoryForm.Name />
        <CreateCategoryForm.Description />
        <CreateCategoryForm.Submit />
      </CreateCategoryForm.Root>
    </KeyboardAwareScrollView>
  );
}
