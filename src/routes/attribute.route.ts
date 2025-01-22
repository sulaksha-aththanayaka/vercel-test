import { Router } from "express";
import * as attributeController from "../controllers/attribute.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { attributeDeleteSchema, attributeSchema, attributeUpdateSchema } from "../validations/attribute.validation";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  validate(attributeSchema),
  attributeController.createAttributeController
);

router.put(
  "/update",
  authenticateUser,
  validate(attributeUpdateSchema),
  attributeController.updateAttributeController
);

router.get(
  "/",
  authenticateUser,
  attributeController.getAttributesController
);

router.get(
  "/:id",
  authenticateUser,
  attributeController.getAttributeByIdController
);

router.delete(
  "/",
  authenticateUser,
  validate(attributeDeleteSchema, "query"),
  attributeController.deleteAttributeController
);

export default router;
