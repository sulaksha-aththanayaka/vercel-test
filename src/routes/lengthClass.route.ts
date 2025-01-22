import { Router } from "express";
import * as lengthClassController from "../controllers/lengthClass.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { lengthClassDeleteSchema,lengthClassSchema,lengthClassUpdateSchema } from "../validations/lengthClass.validation";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  validate(lengthClassSchema),
  lengthClassController.createLengthClassController
);

router.put(
  "/update",
  authenticateUser,
  validate(lengthClassUpdateSchema),
  lengthClassController.updateLengthClassController
);

router.get(
  "/",
  authenticateUser,
  lengthClassController.getLengthClassesController
);

// router.get(
//   "/:id",
//   authenticateUser,
//   lengthClassController.
// );

router.delete(
  "/",
  authenticateUser,
  validate(lengthClassDeleteSchema, "query"),
  lengthClassController.deleteLengthClassController
);

export default router;
