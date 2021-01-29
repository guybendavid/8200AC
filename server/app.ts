import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import pino from "pino";
import expressPino from "express-pino-logger";
import notesRoutes from "./api/routes/notesRouter";
import path from "path";

const app: Application = express();
const port = process.env.PORT || 8080;
const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const expressLogger = expressPino({ logger });

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  logger.info("MongoDB Connected!");
  app.listen(port, () => logger.info(`Listening on port: ${port}`));
});

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(expressLogger);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error("Not Found");
    error.status = 404;
    next(error);
  });
}

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(error);
  res.status(error.status || 500);
  res.json({ message: error.message });
});

export default app;