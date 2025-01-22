import winston, { format, transports } from "winston";
import "winston-daily-rotate-file";

// Define log directory path
const logDirPath = "./logs";

// Define a function to create loggers for different log levels
const createLoggerForLevel = (level: string) => {
  return winston.createLogger({
    level,
    defaultMeta: { service: "30Island-service" },
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.errors({ stack: true }),
      format.metadata({ fillExcept: ["message", "level", "timestamp", "service"] }),
      format.printf((info: any) => {
        const { timestamp, level, message, metadata } = info;
        const routeMatch = message.match(/(GET|POST|PUT|DELETE|PATCH)\s(\/[\w/?=&%-]+)/);
        const route = routeMatch ? routeMatch[2].split('?')[0] : metadata?.route || "unknown route"; 
        const bodyMatch = message.match(/Body:\s(\{.*\})/);
        const body = bodyMatch ? JSON.parse(bodyMatch[1]) : metadata?.body || {};
        return JSON.stringify({
          level,
          message,
          timestamp,
          route,
          body,
          metadata: {
            service: "30Island-service",
            ...metadata,
          },
        });
      })
    ),
    transports: [
      new transports.DailyRotateFile({
        level,
        dirname: `${logDirPath}/${level}`,
        filename: `${level}-%DATE%.log`,
        datePattern: "YYYY-MM",
        maxSize: "20m",
        maxFiles: "30d",
        zippedArchive: true,
      }),
      new transports.Console({
        level,
        format: format.combine(
          format.colorize(),
          format.simple(), // You can also use format.json() for structured logs in the console
        ),
      }),
    ],
  });
};

// Create loggers
const infoLogger = createLoggerForLevel("info");
const warnLogger = createLoggerForLevel("warn");
const errorLogger = createLoggerForLevel("error");

export { infoLogger, warnLogger, errorLogger };
