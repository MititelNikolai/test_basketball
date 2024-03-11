import { UseFormSetValue } from "react-hook-form";
import { ITeamFormInputs } from "../../pages/AddTeam/components/TeamForm.interfaces";
import { IPlayerFormInputs } from "../../pages/AddPlayer/components/PlayerForm.interfaces";
import IEditUser from "../../pages/EditProfile/EditUser.interfaces";

interface ImageUploadProps {
  onFileChange?: (file: File) => void;
  setValueForTeam?: UseFormSetValue<ITeamFormInputs>;
  setValueForPlayer?: UseFormSetValue<IPlayerFormInputs>;
  setValueForUser?: UseFormSetValue<IEditUser>;
  clearError?: () => void;
  forwardedRef?: React.RefObject<HTMLInputElement>;
  edit?: boolean;
  imageUrl?: string | undefined;
  haveMessage?: boolean;
  errorMessage?: string;
}

export default ImageUploadProps;
