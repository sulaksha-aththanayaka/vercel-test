import { Router } from "express";
import * as filterController from "../controllers/filter.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { filterDeleteSchema, filterSchema, filterUpdateSchema } from "../validations/filter.validation";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  validate(filterSchema),
  filterController.createFilterController
);

router.put(
  "/update",
  authenticateUser,
  validate(filterUpdateSchema),
  filterController.updateFilterController
);

router.get(
  "/",
  authenticateUser,
  filterController.getFiltersController
);

router.get(
  "/:id",
  authenticateUser,
  filterController.getFilterByIdController
);

router.delete(
  "/",
  authenticateUser,
  validate(filterDeleteSchema, "query"),
  filterController.deleteFilterController
);

export default router;
