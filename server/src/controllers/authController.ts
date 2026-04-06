import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { Types } from "mongoose";

declare module "express-session" {
  export interface SessionData {
    uid: Types.ObjectId;
  }
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Missing credentials" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        msg: "There's already an account with this email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: passwordHash });
    req.session.uid = user._id;
    res.status(201).json({ name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return res.status(401).json({ msg: "Invalid credentials" });

    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
      }
      req.session.uid = user._id;
      res.json({ data: { user: user.name }, error: null });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(500)
        .json({ data: null, error: { msg: "Failed to logout", code: 500 } });

    res.clearCookie("x-csrf-token"); //csrf cookie, contains the hash used to validate form submissions
    res.clearCookie("sid"); //session cookie, set by express-session, identifies user session in Redis
    return res.status(200).json({ data: "Logout successful!", error: null });
  });
};
