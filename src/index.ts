import express, { Request, Response, Application } from "express";
import { rateLimiter } from "./middlewares/rate-limit.js";
import data from "./data/data.json" assert { type: "json" };

const app: Application = express();
const port = process.env.PORT ?? 3000;

/**
 * GET endpoint to retrieve user data with rate limiting middleware
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON object containing user data
 */
app.get("/users", rateLimiter, (req: Request, res: Response) => {
  res.send({
    data,
  });
});

/**
 * Start the Express server
 */
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
