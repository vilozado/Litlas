import { Request, Response, NextFunction } from "express";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: InstanceType<typeof User>;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.session.uid;

  if (!userId) {
    return res
      .status(401)
      .json({ data: null, error: { code: 401, msg: "Not authenticated" } });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ data: null, error: { code: 401, msg: "Not authenticated" } });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res
      .status(500)
      .json({ data: null, error: { code: 500, msg: "Internal Server Error" } });
  }
};
