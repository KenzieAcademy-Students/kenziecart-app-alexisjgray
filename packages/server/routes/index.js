import express from "express";
import authRouter from "./auth";
import userRouter from "./users";
import ordersRouter from "./orders";
import productRouter from "./products";
import couponCodesRouter from "./couponCodes";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("api endpoint");
});

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/orders", ordersRouter);
router.use("/products", productRouter);
router.use("/couponCodes", couponCodesRouter);

module.exports = router;
