import { Request, Response } from "express";
import express from "express";
import path from "path";
import apiRoutes from "./routes/api";
import { PORT } from "./config/constants";
import cors from "cors";
import _ from "./utils/env";
const app = express();

app.use(cors());
app.use("/api", apiRoutes);

// Serve static files from the frontend build directory
app.use(express.static(path.join("/usr/src/app/frontend/frontBuild")));

// Catch all handler to serve index.html for any other request
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join("/usr/src/app/frontend/frontBuild", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
