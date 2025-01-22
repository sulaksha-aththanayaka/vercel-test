import { Response } from 'express';
import { z } from 'zod';
import { errorLogger } from './logger';

export const SUCCESS = (
  res: Response,
  options: { code?: number; message?: string } = {},
  data: any = null,
) => {

  const { code = 200, message } = options;
  //infoLogger.info(`Response-SUCCESS: ${Date.now()} ${}`);
  return res.status(code).json({
    success: true,
    code,
    message,
    data,
  });
};

export const TERROR = (err: any, log: boolean = true) => {
  if (log) console.error(err);
  throw err;
};

export const ERROR = (res: Response, error: any) => {
  const statusCode = error.code || 500;
  const message = error.message || 'An unknown error occurred';
  const { method, originalUrl: url, body } = res.req;
  errorLogger.error(
    `Error occurred: ${method} ${url}- Body: ${JSON.stringify(body)} - Message: ${message} - TimeStamp: `
  );
  return res.status(statusCode).json({
    success: false,
    code: statusCode,
    message:message,
  });
};

export const VALIDATION_ERROR = (res: Response, error: any) => {
  const message = 'Validation failed';
  const statusCode = 400;
  let formattedErrors;
  const { method, originalUrl: url, body } = res.req;
  errorLogger.error(
    `Error occurred: ${method} ${url}- Body: ${JSON.stringify(body)} - Message: ${message} - TimeStamp: `
  );
  if (error instanceof z.ZodError) {
    formattedErrors = error.errors
      .map(
        (issue) => `${issue.path.join('.')} is ${issue.message.toLowerCase()}`,
      )
      .join(', ');
  } else {
    formattedErrors = error.message || 'Unknown error';
  }
  console.log("error", formattedErrors)
  return res.status(statusCode).json({
    success: false,
    code: statusCode,
    message: formattedErrors ?? message,
  });
};
