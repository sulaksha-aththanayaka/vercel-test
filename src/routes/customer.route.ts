// Customer Router
import { Router } from "express";
import * as customerController from "../controllers/customer.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { customerSchema, customerUpdateSchema, customerDeleteSchema } from "../validations/customer.validation";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  validate(customerSchema),
  customerController.createCustomerController
);

router.put(
  "/update",
  authenticateUser,
  validate(customerUpdateSchema),
  customerController.updateCustomerController
);

router.get(
  "/",
  authenticateUser,
  customerController.getCustomersController
);

router.get(
  "/:id",
  authenticateUser,
  customerController.getCustomerByIdController
);

router.delete(
  "/delete",
  authenticateUser,
  validate(customerDeleteSchema,"query"),
  customerController.deleteCustomerController
);

export default router;
