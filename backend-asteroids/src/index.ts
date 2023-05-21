import express from "express";
import cors from "cors";
import { getAsteroids } from "./routes/asteroidsRoutes";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/asteroids", getAsteroids);

app.listen(port, () => {
  console.log(`Server running on port ${port} !`);
});
