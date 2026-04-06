import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import cookieParser from "cookie-parser";
import { RedisStore } from "connect-redis";
import { doubleCsrf } from "csrf-csrf";
import { createClient } from "redis";

import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import connectDb from "./models";
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;
const client = process.env.CLIENT_URL;

const redisClient = createClient({
  url: process.env.REDIS_URL!,
});
redisClient.on("error", (err) => console.error("Redis error:", err));

(async function bootstrap() {
  try {
    await redisClient.connect(); //to store session tokens
    await connectDb();

    const redisStore = new RedisStore({
      client: redisClient,
      prefix: "litlas:",
    });

    const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
      getSecret: () => process.env.CSRF_SECRET!,
      getSessionIdentifier: (req) => req.session.id,
      cookieName: "x-csrf-token",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        httpOnly: true,
      },
    });

    //middleware
    app.use(helmet()); //security
    app.use(
      cors({
        //connection to client
        origin: client,
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE"],
      }),
    );
    app.use(express.json()); //bodyparser
    app.use(cookieParser()); //cookie parser
    app.use(
      session({
        //store session cookies for auth
        secret: process.env.SESSION_SECRET!,
        name: "sid",
        resave: false,
        saveUninitialized: false,
        store: redisStore,
        cookie: {
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60,
          sameSite: true,
          httpOnly: true,
        },
      }),
    );

    //routes
    app.get("/get-csrf-token", (req, res) => {
      res.json({ csrfToken: generateCsrfToken(req, res) });
    });
    app.use("/auth", doubleCsrfProtection, authRouter);
    app.use("/dashboard", authMiddleware, doubleCsrfProtection, userRouter);

    //initialization
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
})();
