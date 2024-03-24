import { forwardRef, useRef, useState } from "react";
import { IconAddImage } from "../ui/icons";
import { ImageUploadProps } from "./ImageUploadProps";
import styles from "./ImageUpload.module.css";

const ImageUpload: React.ForwardRefRenderFunction<
  HTMLInputElement,
  ImageUploadProps
> = (
  {
    setValueForTeam,
    setValueForPlayer,
    setValueForUser,
    imageUrl,
    errorMessage,
    clearError,
  },
  ref
) => {
  const { uploadImageContainer, uploadImage, uploadImageInput, warningStyles } =
    styles;

  const [previewImage, setPreviewImage] = useState<string | null | undefined>(
    imageUrl ? `${process.env.REACT_APP_BACKEND_URL}${imageUrl}` : null
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
      clearError && clearError();
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={uploadImageContainer}>
        <input
          type='file'
          ref={fileInputRef}
          className={uploadImageInput}
          onChange={handleFileChange}
          accept='image/jpeg, image/png'
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
        {errorMessage && <p className={warningStyles}>{errorMessage}</p>}
      </div>
    </>
  );
};

export default forwardRef(ImageUpload);
