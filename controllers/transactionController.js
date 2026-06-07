import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js";
import Wallet from "../models/Wallet.js";

const getTransactions = asyncHandler(async (req, res) => {
  const wallet = await Wallet.findOne({
    user: req.user._id,
  });

  if (!wallet) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  const transactions = await Transaction.find({
    wallet: wallet._id,
  }).sort({ createdAt: -1 });

  res.status(200).json(transactions);
});

export { getTransactions };