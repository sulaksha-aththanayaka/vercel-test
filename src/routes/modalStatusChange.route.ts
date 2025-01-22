import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { bannerStatusChange } from "../controllers/modalStatusChange.controller";
import { bannerStatusChangeSchema } from "../validations/banner.validation";


const router = Router();

router.put("/banner", authenticateUser,validate(bannerStatusChangeSchema,"query"),bannerStatusChange);

export default router;
