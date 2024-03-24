export async function compressImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      if (!event.target) {
        reject(new Error("Failed to read the file."));
        return;
      }
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context."));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create a blob from the canvas."));
              return;
            }

            resolve(blob);
          },
          "image/png",
          0.9
        );
      };
      img.onerror = () => {
        reject(new Error("Failed to load the image."));
      };

      img.src = event.target.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read the file."));
    };

    reader.readAsDataURL(file);
  });
}
