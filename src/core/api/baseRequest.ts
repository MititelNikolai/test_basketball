import axios from "axios";

export const baseRequest = async (config: any) => {
  const store = require("../redux/store").default;
  const { auth } = store.getState();
  const token = auth.userInfo.token;
  try {
    config.headers = {
      "Content-Type": "application/json",
      ...config.headers,
      Authorization: `Bearer ${token}`,
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
      errorCode: error.response?.status,
    };
  }
};
