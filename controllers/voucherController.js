import asyncHandler from "express-async-handler";
import Voucher from "../models/Voucher.js";
import generateVoucherCode from "../utils/generateVoucherCode.js";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

// @desc Create voucher
// @route POST /api/vouchers/create
// @access Agent
const createVoucher = asyncHandler(
  async (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      res.status(400);
      throw new Error(
        "Please provide a valid amount"
      );
    }

    const voucher =
      await Voucher.create({
        code: generateVoucherCode(),
        amount,
        issuedBy: req.user._id,
      });

    res.status(201).json(voucher);
  }
);

const redeemVoucher = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code) {
    res.status(400);
    throw new Error("Voucher code is required");
  }

  // 1. Find voucher
  const voucher = await Voucher.findOne({ code });

  if (!voucher) {
    res.status(404);
    throw new Error("Invalid voucher code");
  }

  // 2. Check if already redeemed
  if (voucher.status === "redeemed") {
    res.status(400);
    throw new Error("Voucher already redeemed");
  }

  // 3. Find SME wallet
  const wallet = await Wallet.findOne({
    user: req.user._id,
  });

  if (!wallet) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  // 4. Credit wallet
  wallet.balance += voucher.amount;
  await wallet.save();

  // 5. Mark voucher as redeemed
  voucher.status = "redeemed";
  voucher.redeemedBy = req.user._id;
  voucher.redeemedAt = Date.now();
  await voucher.save();

  // 6. Create transaction record
  await Transaction.create({
  wallet: wallet._id,
  type: "credit",
  amount: voucher.amount,
  description: `Voucher redemption: ${code}`,
  balanceAfter: wallet.balance,
});

  res.json({
    message: "Voucher redeemed successfully",
    balance: wallet.balance,
  });
});

export { createVoucher, redeemVoucher };

// SVP-EUMQPW4J
// "code": "SVP-HFAMB8JW"
// SVP-NNO5TIOP