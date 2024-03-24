import { baseRequest } from "./baseRequest";

const uploadImageToServer = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const result = await baseRequest({
    method: "post",
    url: `/api/Image/SaveImage`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (result.error) {
    return false;
  }
  return result;
};

export default uploadImageToServer;
