import axios, { AxiosError, AxiosResponse } from "axios";

const apiConfig = axios.create({
  baseURL: "https://api.nasa.gov/neo/rest/v1",
});

export const fetchAsteroidsData = async (
  start_date: string = "2015-09-25",
  end_date: string = "2015-09-30",
  api_key: string = "DEMO_KEY"
) => {
  try {
    const response = await apiConfig.get("/feed", {
      params: {
        start_date,
        end_date,
        api_key,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      const response: AxiosResponse | undefined = axiosError.response;
      if (response && response.statusText) {
        throw new Error(response.statusText);
      } else {
        throw new Error("Failed to fetch NASA Asteroids");
      }
    }

    throw new Error("Failed to fetch NASA Asteroids");
  }
};
