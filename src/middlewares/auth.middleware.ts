import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { APPLICATIONS } from "../config/config";
import { ERROR } from "../utils/response.helper";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const JWT_SECRET = APPLICATIONS.JWT_SECRET;

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // Verify access token
    try {
      const decoded = jwt.verify(accessToken, JWT_SECRET) as { id: string };
      req.user = { id: decoded.id }; // Attach user ID to request
      return next(); // Token is valid, proceed to the next middleware
    } catch (error: any) {
      if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") { 
        // Token is expired, try refreshing
        if (!refreshToken) {
          throw new Error("Authentication failed. Refresh token missing.");
        }

        try {
          const decodedRefresh = jwt.verify(refreshToken, JWT_SECRET) as {
            id: string;
          };

          // Generate a new access token
          const newAccessToken = jwt.sign(
            { id: decodedRefresh.id },
            JWT_SECRET,
            { expiresIn: "59m" }
          );

          // Set the new access token in cookies
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
          });

          // Attach user ID and proceed
          req.user = { id: decodedRefresh.id };
          return next();
        } catch (refreshError) {
          throw new Error("Authentication failed. Invalid refresh token.");
        }
      } else {
        throw new Error("Authentication failed. Invalid token.");
      }
    }
  } catch (error:any) {
    return ERROR(res,{
      code:401,
      message:error.message || "Unexpected Error Occurred"
    })
  }
};
