import { forwardRef, useRef, useState } from "react";
import styles from "./ImageUpload.module.css";
import IconAddImage from "../../ui/icons/IconAddImage";
import IPropsImage from "./IPropsImage";
import { backendUrl } from "../../core/redux/apiData";

const ImageUpload: React.ForwardRefRenderFunction<
  HTMLInputElement,
  IPropsImage
> = (
  { setValueForTeam, setValueForPlayer, setValueForUser, edit, imageUrl },
  ref
) => {
  const { uploadImageContainer, uploadImage, uploadImageInput } = styles;
  const [previewImage, setPreviewImage] = useState<string | null | undefined>(
    edit ? `${backendUrl}${imageUrl}` : null
  );
  let fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValueForTeam && setValueForTeam("file_img", file);
      setValueForPlayer && setValueForPlayer("file_img", file);
      setValueForUser && setValueForUser("file_img", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={uploadImageContainer}>
      <input
        type='file'
        ref={fileInputRef}
        className={uploadImageInput}
        onChange={handleFileChange}
      />
      <div
        className={uploadImage}
        onClick={handleImageClick}
        style={{
          backgroundImage: previewImage ? `url(${previewImage})` : "",
        }}
      >
        <IconAddImage height={74} width={75} />
      </div>
    </div>
  );
};

export default forwardRef(ImageUpload);
