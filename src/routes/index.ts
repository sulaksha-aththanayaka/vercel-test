import * as express from "express";
import testRouter from "./test.route";
import userRouter from "./user.route";
import logRouter from "./log.route";
import productRouter from "./product.route";
import categoryRouter from "./category.route"
import bannerRouter from "./banner.route"
import customerGroupRouter from "./customerGroup.route"
import customerRouter from "./customer.route"
import marketingRouter from "./marketing.route"
import attributeGroupRouter from "./attriubteGroup.route"
import attributeRouter from "./attribute.route"
import filterRouter from "./filter.route"
import lengthClassRouter from "./lengthClass.route"
import modalStatusChange from "./modalStatusChange.route"
const router = express.Router();

router.use("/test", testRouter);
router.use("/logs", logRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/banner",bannerRouter)
router.use("/customer-group",customerGroupRouter)
router.use("/customer",customerRouter)
router.use("/marketing",marketingRouter)
router.use("/attribute-group",attributeGroupRouter)
router.use("/attribute",attributeRouter)
router.use("/filter",filterRouter)
router.use("/length-class",lengthClassRouter)
router.use("/status",modalStatusChange)
export default router;
