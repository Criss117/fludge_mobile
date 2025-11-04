import { LockKeyhole } from "lucide-react-native";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface PermissionsAlertProps {
  descriptions?: string[];
  children?: React.ReactNode;
}

export function PermissionsAlert({
  descriptions,
  children,
}: PermissionsAlertProps) {
  return (
    <Alert icon={LockKeyhole} variant="destructive">
      <AlertTitle>No tienes permisos necesarios</AlertTitle>
      {descriptions?.map((description, index) => (
        <AlertDescription key={index}>{description}</AlertDescription>
      ))}
      {children}
    </Alert>
  );
}
