import fs from "fs";
import path from "path";

const logDirPath = "./logs";

const getCurrentDateMinus30Days = () => {
  const currentDate = new Date();
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 30);

  const formatDate = (date: Date) => 
    `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(currentDate),
  };
};

export const getLogsByDateRange = async (
  startDate: string,
  endDate: string,
  levels: string[] = []
) => {
  let start: Date;
  let end: Date;

  // Set default date range to the current date and 30 days later if not provided
  if (!startDate || !endDate) {
    const dates = getCurrentDateMinus30Days();
    start = new Date(dates.startDate);
    end = new Date(dates.endDate);
  } else {
    start = new Date(startDate);
    end = new Date(endDate);
  }
  console.log(start,end)
  if (!levels || levels.length === 0) {
    levels.push("info");
  }

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format.");
  }

  const logs: any[] = [];

  for (const level of levels) {
    const levelDir = path.join(logDirPath, level);

    if (!fs.existsSync(levelDir)) {
      console.warn(`Log level directory not found: ${level}`);
      continue;
    }

    const files = fs.readdirSync(levelDir);

    const filteredFiles = files.filter((file) => {
      const fileDate = parseLogDate(file);
      if (!fileDate) return false;

      const logDate = new Date(`${fileDate}-01`);
      return logDate >= start && logDate <= end;
    });

    for (const file of filteredFiles) {
      const filePath = path.join(levelDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      const logLines = fileContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");

      for (const logLine of logLines) {
        try {
          const parsedLog = JSON.parse(logLine);

          // Convert timestamp to UTC
          const logTimestamp = new Date(parsedLog.timestamp);
          if (logTimestamp >= start && logTimestamp <= end) {
            parsedLog.timestamp = logTimestamp.toISOString(); // Ensure UTC
            logs.push(parsedLog);
          }
        } catch (error: any) {
          console.error("Error parsing JSON line:", error.message);
          console.error("Invalid JSON line:", logLine);
        }
      }
    }
  }

  // Sort logs by timestamp (newest first)
  return logs.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Utility to parse log file dates
const parseLogDate = (filename: string): string => {
  const match = filename.match(/-(\d{4}-\d{2})\.log$/);
  return match ? match[1] : "";
};
