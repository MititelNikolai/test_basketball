import axios from "axios";

const uploadImageToServer = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://dev.trainee.dex-it.ru/api/Image/SaveImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImageToServer;
