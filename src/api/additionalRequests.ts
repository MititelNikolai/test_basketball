import axios from "axios";
import { backendUrl } from "../core/redux/apiData";
import { addSpaceBeforeUppercase } from "../utils/stringFunctions";

export const getPositionsWithSpaces = async (token: string | null) => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/Player/GetPositions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return data.map((position: string) => ({
      label: addSpaceBeforeUppercase(position),
      value: position,
    }));
  } catch (error: any) {
    console.error("Error fetching positions:", error);
    throw error;
  }
};
