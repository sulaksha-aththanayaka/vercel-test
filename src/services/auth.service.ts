import User from "../models/user.model";
import { omit } from 'lodash';
import jwt from "jsonwebtoken";
import {
  RegisterUserRequest,
  LoginUserResponse,
  RegisterUserResponse,
} from "../types/user.type";
import { APPLICATIONS } from "../config/config";
import { Response } from "express";

const generateToken = (id: string, secret: string, expiresIn: string) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

export const registerUser = async (
  req: RegisterUserRequest
): Promise<RegisterUserResponse | undefined> => {
  if (req) {
    const { email, password } = req;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const newUser = new User({ email, password });
    await newUser.save();

    const omitNewUser = omit(newUser.toObject(), 'password', '__v', '_id');

    return {id: newUser._id as string, ...omitNewUser};
  }
  return undefined;
};

export const loginUser = async (
  req: RegisterUserRequest, res: Response
): Promise<LoginUserResponse | undefined> => {
  if (req) {
    const { email, password } = req;

    const existingUser = await User.findOne({ email });

    if (!existingUser || !(await existingUser.isValidPassword(password))) {
      throw new Error("Invalid credentials.");
    }

    const  JWT_SECRET  = APPLICATIONS.JWT_SECRET;

    const accessToken = generateToken(
      existingUser._id as string,
      JWT_SECRET,
      "59m"
    );

    const refreshToken = generateToken(
      existingUser._id as string,
      JWT_SECRET,
      "7d"
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // Secure cookie in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // Secure cookie in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });

    await existingUser.save();

    const userObject = existingUser.toObject();
    const omitExistingUser = omit(userObject, 'password', '__v', '_id');
    
    return { id: userObject._id as string, ...omitExistingUser };
  }
  return undefined;
};

export const logoutUser = (res: Response): void => {
  // Clear the accessToken and refreshToken cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};