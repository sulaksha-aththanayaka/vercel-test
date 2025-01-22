import { Router } from "express";
import * as customerGroupController from "../controllers/customerGroup.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { customerGroupSchema, customerGrouptDeleteSchema, customerGrouptUpdateSchema,  } from "../validations/customerGroup.validation";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  validate(customerGroupSchema),
  customerGroupController.createCustomerGroupController
);

router.put(
  "/update",
  authenticateUser,
  validate(customerGrouptUpdateSchema),
  customerGroupController.updateCustomerGroupController
);

router.get(
  "/",
  authenticateUser,
  customerGroupController.getCustomerGroupsController
);

router.get(
  "/:id",
  authenticateUser,
  customerGroupController.getCustomerGroupByIdController
);

router.delete(
  "/",
  authenticateUser,
  validate(customerGrouptDeleteSchema, "query"),
  customerGroupController.deleteCustomerGroupController
);

export default router;
