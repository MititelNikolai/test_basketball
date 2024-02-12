import { UseFormSetValue } from "react-hook-form";
import { IAddFormInputs } from "../../pages/AddTeam/components/IAddFormInputs";

interface IPropsImage {
  onFileChange?: (file: File) => void;
  setValue: UseFormSetValue<IAddFormInputs>;
  forwardedRef?: React.RefObject<HTMLInputElement>;
}

export default IPropsImage;
