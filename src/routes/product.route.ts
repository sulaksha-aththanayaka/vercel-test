import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { productDeleteSchema, productSchema, productUpdateSchema } from "../validations/product.validation";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.post("/create", authenticateUser,validate(productSchema), productController.createProductController);
router.put("/update", authenticateUser,validate(productUpdateSchema), productController.updateProductController);
router.get("/", authenticateUser, productController.getProductsController);
router.get("/:id", authenticateUser, productController.getProductByIdController);
router.delete("/", authenticateUser, validate(productDeleteSchema, "query"), productController.deleteProductController)

export default router;
