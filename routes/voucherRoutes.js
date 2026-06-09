import express from "express";

import {
  createVoucher, redeemVoucher,
} from "../controllers/voucherController.js";

import {protect} from "../middleware/authMiddleware.js";

import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  authorizeRoles("agent"),
  createVoucher
);

router.post(
  "/redeem",
  protect,
  authorizeRoles("sme"),
  redeemVoucher
);

export default router;