import express from "express";
import * as logController from "../controllers/log.controller";

const router = express.Router();

// Define the endpoint to fetch logs
router.get("/", logController.fetchLogs);

export default router;
