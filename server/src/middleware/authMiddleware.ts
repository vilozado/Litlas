import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const authMiddleware = (
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

  req.user = { id: userId.toString() };
  next();
};
