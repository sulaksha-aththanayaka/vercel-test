import { Router } from "express";
import * as bannerController from "../controllers/banner.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import {
  bannerSchema,
  bannerUpdateSchema,
  bannerDeleteSchema,
} from "../validations/banner.validation";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  validate(bannerSchema),
  bannerController.createBannerController
);

router.put(
  "/update",
  authenticateUser,
  validate(bannerUpdateSchema),
  bannerController.updateBannerController
);

router.get(
  "/",
  authenticateUser,
  bannerController.getBannersController
);

router.get(
  "/:id",
  authenticateUser,
  bannerController.getBannerByIdController
);

router.delete(
  "/",
  authenticateUser,
  validate(bannerDeleteSchema, "query"),
  bannerController.deleteBannerController
);

export default router;
