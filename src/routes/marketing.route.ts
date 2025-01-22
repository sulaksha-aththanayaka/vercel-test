import { Router } from "express";
import * as marketingController from "../controllers/marketing.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { marketingDeleteSchema, marketingSchema, marketingUpdateSchema } from "../validations/marketing.validation";

const router = Router();

router.post("/create", authenticateUser,validate(marketingSchema),marketingController.createMarketing);
router.put("/update", authenticateUser,validate(marketingUpdateSchema), marketingController.updateMarketing);
router.get("/", authenticateUser, marketingController.getMarketing);
router.get("/:id", authenticateUser, marketingController.getMarketingById);
router.delete("/", authenticateUser, validate(marketingDeleteSchema, "query"), marketingController.deleteMarketing)

export default router;
