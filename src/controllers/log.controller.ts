import { NextFunction, Request, Response } from "express";
import { getLogsByDateRange } from "../services/log.service";
import { ERROR } from "../utils/response.helper";

export const fetchLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { startDate, endDate, level } = req.query;
        let levels: string[] = [];
        if (level) {
            if (Array.isArray(level)) {
                levels = level as string[]; // If `level` is an array, use it as is
            } else {
                levels = (level as string).split(","); // Split comma-separated values
            }
        }
        const logs = await getLogsByDateRange(startDate as string, endDate as string, levels);
        res.json({ logs });
    } catch (error: any) {
         ERROR(res,{
            code:500,
            message:error
        }); // Pass the error to the error-handling middleware
    }
};
