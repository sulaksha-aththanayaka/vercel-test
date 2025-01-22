import { Request, Response, NextFunction } from "express";
import { errorLogger } from "../utils/logger";
import { ERROR, VALIDATION_ERROR } from "../utils/response.helper";
import { z } from "zod";

// Middleware to catch and log errors
const logError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url, body } = req;
  errorLogger.error(
    `Error occurred: ${method} ${url} - Body: ${JSON.stringify(
      body
    )} - Message: ${err.message}`
  );
  console.log(err.message)
  if (err.message === "No image file uploaded.") {
    ERROR(res, { code: 400, message: err.message });
  } else if (err.message === "Name and image are required." || 
    err.message === "Name already exists" || 
    err.message === "Banner name and title already exists" ||
    err.message === "Email already exists" ||
    err.message === "Marketing name already exists" ||
    err.message === "Attribute group with this name already exists." || 
    err.message === "Attribute already exists in this group" ||
    err.message === "Attribute group is deleted" || 
    err.message === "Filter group exists with this name" ||
    err.message === "Length class already exists with this title"
  ) {
    ERROR(res, { code: 400, message: err.message });
  } else if (err.message === "Invalid credentials.") {
    ERROR(res, { code: 401, message: err.message });
  } else if (err.message === "Authentication failed.") {
    ERROR(res, { code: 401, message: err.message });
  } else if (err.message === "Parent category not found" || 
    err.message === "Banner not found" || 
    err.message === "Customer not found" ||
    err.message === "Marketing not found" ||
    err.message === "Product not found" ||
    err.message === "Attribute group not found." ||
    err.message === "Attribute not found" ||
    err.message === "Filter not found" ||
    err.message === "Length class not found"
  ) {
    ERROR(res, { code: 404, message: err.message });
  }  else if (err.message === "User already exists.") {
    ERROR(res, { code: 409, message: err.message });
  } else if (err instanceof z.ZodError) {
    VALIDATION_ERROR(res, err);
  } else {
    ERROR(res, { code: 500, message: "Internal Server Error" });
  }
};

export default logError;
