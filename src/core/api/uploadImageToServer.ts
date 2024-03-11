import axios from "axios";

const uploadImageToServer = async (file: File, token: string | null) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/Image/SaveImage`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
