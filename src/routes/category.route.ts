import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { categoryDeleteSchema, categorySchema, categoryUpdateSchema } from "../validations/category.validation";
import { validate } from "../middlewares/validate.middleware";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create", authenticateUser,validate(categorySchema), categoryController.createCategoryController);
router.put( "/update", authenticateUser, validate(categoryUpdateSchema), categoryController.updateCategoryController);
router.get("/", authenticateUser, categoryController.getCategoriesController);
router.get("/:id", authenticateUser, categoryController.getCategoryByIdController);
router.delete("/", authenticateUser, validate(categoryDeleteSchema, "query"), categoryController.deleteCategoryController);

export default router;