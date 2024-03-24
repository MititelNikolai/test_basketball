import { compressImage } from "../utils/compressImage";

export function useImageCompression(
  maxWidth: number,
  maxHeight: number
): (file: File) => Promise<File> {
  const compress = async (file: File): Promise<File> => {
    try {
      if (file.size < 512000) return file;
      const compressedBlob = await compressImage(file, maxWidth, maxHeight);

      return new File([compressedBlob], file.name, { type: file.type });
    } catch (err) {
      return file;
    }
  };

  return compress;
}
