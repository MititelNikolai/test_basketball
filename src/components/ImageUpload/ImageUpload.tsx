import { forwardRef, useRef, useState } from "react";
import styles from "./ImageUpload.module.css";
import IconAddImage from "../../ui/icons/IconAddImage";
import IPropsImage from "./IPropsImage";

const ImageUpload: React.ForwardRefRenderFunction<
  HTMLInputElement,
  IPropsImage
> = ({ setValue }, ref) => {
  const { uploadImageContainer, uploadImage, uploadImageInput } = styles;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  let fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("file_img", file);
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
          backgroundColor: !previewImage ? "#9c9c9c" : "",
        }}
      >
        {!previewImage && <IconAddImage height={74} width={75} />}
      </div>
    </div>
  );
};

export default forwardRef(ImageUpload);
