import axios from "axios";
interface IAddTeamData {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}
const addTeamToServer = async (data: IAddTeamData) => {
  try {
    const response = await axios.post(
      "http://dev.trainee.dex-it.ru/api/Team/Add",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};

export default addTeamToServer;
