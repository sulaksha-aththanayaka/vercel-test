import { Request, Response } from "express";
import { ERROR, SUCCESS } from "../utils/response.helper";
import * as userService from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await userService.registerUser({ email, password });

    return SUCCESS(
      res,
      { code: 201, message: "User registered successfully." },
      user
    );
  } catch (error: any) {
    ERROR(res, {
      code: 500,
      message: error
    })
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser({ email, password }, res);

    return SUCCESS(
      res,
      { code: 200, message: "User login successfully." },
      user
    );
  } catch (error: any) {
    ERROR(res, {
      code: 500,
      message: error
    })
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    userService.logoutUser(res);
    return SUCCESS(res, { code: 200, message: "Logout successful." });
  } catch (error) {
    ERROR(res, {
      code: 500,
      message: error
    })
  }
};
