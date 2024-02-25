import { UseFormSetValue } from "react-hook-form";
import { ITeamFormInputs } from "../../pages/AddTeam/components/ITeamFormInputs";
import { IPlayerFormInputs } from "../../pages/AddPlayer/components/IPlayerFormProps";
import { IEditUser } from "../../pages/EditProfile/EditProfile";

interface IPropsImage {
  onFileChange?: (file: File) => void;
  setValueForTeam?: UseFormSetValue<ITeamFormInputs>;
  setValueForPlayer?: UseFormSetValue<IPlayerFormInputs>;
  setValueForUser?: UseFormSetValue<IEditUser>;
  forwardedRef?: React.RefObject<HTMLInputElement>;
  edit?: boolean;
  imageUrl?: string | undefined;
  needMessage?: boolean;
  errorMessage?: string;
}

export default IPropsImage;
