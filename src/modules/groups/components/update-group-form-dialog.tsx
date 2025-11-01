import { Button } from "@/modules/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/shared/components/ui/dialog";
import { FieldSet } from "@/modules/shared/components/ui/field";
import { Icon } from "@/modules/shared/components/ui/icon";
import type { GroupSummary } from "@/shared/entities/group.entity";
import { PencilIcon } from "lucide-react-native";
import { useState } from "react";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { UpdateGroupForm } from "./update-group-form";

interface Props {
  group: GroupSummary;
  businessSlug: string;
}

export function UpdateGroupFormDialog({ group, businessSlug }: Props) {
  const [open, setOpen] = useState(false);
  const { width } = useSafeAreaFrame();

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon as={PencilIcon} />
        </Button>
      </DialogTrigger>
      <DialogContent style={{ width: Math.floor(width * (95 / 100)) }}>
        <DialogHeader>
          <DialogTitle>Actualizar grupo</DialogTitle>
          <DialogDescription>
            Actualizar los detalles del grupo.
          </DialogDescription>
        </DialogHeader>
        <UpdateGroupForm.Root
          group={group}
          businessSlug={businessSlug}
          actions={{
            onSuccess: () => setOpen(false),
          }}
        >
          <FieldSet>
            <UpdateGroupForm.Name />
            <UpdateGroupForm.Description />
            <UpdateGroupForm.Submit />
          </FieldSet>
        </UpdateGroupForm.Root>
      </DialogContent>
    </Dialog>
  );
}
