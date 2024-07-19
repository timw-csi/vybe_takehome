import express from "express";
import apiRoutes from "./routes/api";
import { PORT } from "./config/constants";
import cors from "cors";
import _ from "./utils/env";
const app = express();

app.use(cors());
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
