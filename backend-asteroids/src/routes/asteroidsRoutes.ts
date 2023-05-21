import { Request, Response } from "express";
import { AxiosResponse } from "axios";
import { fetchAsteroidsData } from "../config/apiConfig";

export const getAsteroids = async (req: Request, res: Response): Promise<void> => {
  const { start_date, end_date, api_key } = req.query;

  try {
    const data: AxiosResponse = await fetchAsteroidsData(start_date as string, end_date as string, api_key as string);
    res.status(200).send(data);
  } catch (error: any) {
    if (typeof error === "string") {
      res.status(500).json({ error });
    } else {
      res.status(500).json({ error: error?.message || "Failed To fetch Nasa Asteroids" });
    }
  }
};
