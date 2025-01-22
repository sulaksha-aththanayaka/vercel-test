import { Router } from "express";
import * as attributeGroupController from "../controllers/attributeGroup.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { attributeGroupDeleteSchema, attributeGroupSchema, attributeGroupUpdateSchema } from "../validations/attributeGroup.validation";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  validate(attributeGroupSchema),
  attributeGroupController.createAttributeGroupController
);

router.put(
  "/update",
  authenticateUser,
  validate(attributeGroupUpdateSchema),
  attributeGroupController.updateAttributeGroupController
);

router.get(
  "/",
  authenticateUser,
  attributeGroupController.getAllAttributeGroupController
);

router.get(
  "/:id",
  authenticateUser,
  attributeGroupController.getAttributeGroupByIdController
);

router.delete(
  "/",
  authenticateUser,
  validate(attributeGroupDeleteSchema, "query"),
  attributeGroupController.removeAttributeGroupController
);

export default router;
