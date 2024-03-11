import axios from "axios";
import { RootState } from "../redux/store";

export const baseRequest = async (config: any, getState: () => RootState) => {
  const { auth } = getState();
  const token = auth.userInfo.token;
  try {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios({
      ...config,
      url: `${process.env.REACT_APP_BACKEND_URL}${config.url}`,
    });
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    return {
      error: true,
      errorMessage: error.message,
    };
  }
};
