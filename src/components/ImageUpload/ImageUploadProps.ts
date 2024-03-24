import { UseFormSetValue } from "react-hook-form";
import { TeamFormInputs } from "../../pages/AddTeam/components/TeamForm.interfaces";
import { PlayerFormInputs } from "../../pages/AddPlayer/components/PlayerForm.interfaces";
import { EditUser } from "../../pages/EditProfile/EditUser.interfaces";

export interface ImageUploadProps {
  onFileChange?: (file: File) => void;
  setValueForTeam?: UseFormSetValue<TeamFormInputs>;
  setValueForPlayer?: UseFormSetValue<PlayerFormInputs>;
  setValueForUser?: UseFormSetValue<EditUser>;
  clearError?: () => void;
  imageUrl?: string | undefined;
  errorMessage?: string;
}
