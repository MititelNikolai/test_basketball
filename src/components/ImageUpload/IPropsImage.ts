import { UseFormSetValue } from "react-hook-form";
import { ITeamFormInputs } from "../../pages/AddTeam/components/ITeamFormInputs";
import { IPlayerFormInputs } from "../../pages/AddPlayer/components/IPlayerFormProps";

interface IPropsImage {
  onFileChange?: (file: File) => void;
  setValueForTeam?: UseFormSetValue<ITeamFormInputs>;
  setValueForPlayer?: UseFormSetValue<IPlayerFormInputs>;
  forwardedRef?: React.RefObject<HTMLInputElement>;
  edit?: boolean;
  imageUrl?: string | undefined;
}

export default IPropsImage;
