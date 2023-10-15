import { Router } from "express";
import CouponCodes from "../models/couponCodes";

const router = Router();

router
  .route("/create")
  // GET /api/couponCodes/create?code=x&discount=y
  .get(async (req, res) => {
    const { code, discount } = req.query;
    if (!code || !discount)
      return res.status(422).json({ error: "No code, no discount!" });

    try {
      const queryParams = { code, discount };
      await CouponCodes.create(queryParams);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  });

router.route("/verify").get(async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(422).json({ error: "No code, no discount!" });

  try {
    const couponCodes = await CouponCodes.findOne({ code: code });
    if (!couponCodes)
      return res
        .status(404)
        .json({ error: "This isn't the code you're looking for." });

    res.json(couponCodes.toJSON());
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
