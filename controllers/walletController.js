import asyncHandler from "express-async-handler";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

const getWallet = asyncHandler(
  async (req, res) => {
    const wallet = await Wallet.findOne({
      user: req.user._id,
    });

    if (!wallet) {
      res.status(404);
      throw new Error("Wallet not found");
    }

    res.status(200).json(wallet);
  }
);


const creditWallet = asyncHandler(async (req, res) => {
  const { amount, description } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Invalid amount");
  }

  const wallet = await Wallet.findOne({
    user: req.user._id,
  });

  if (!wallet) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  // Update wallet
  wallet.balance += amount;
  wallet.totalDeposits += amount;

  await wallet.save();

  // Create transaction record
  const transaction = await Transaction.create({
    wallet: wallet._id,
    type: "credit",
    amount,
    description: description || "Wallet credit",
    balanceAfter: wallet.balance,
  });

  res.status(200).json({
    message: "Wallet credited successfully",
    wallet,
    transaction,
  });
});

const debitWallet = asyncHandler(async (req, res) => {
  const { amount, description } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Invalid amount");
  }

  const wallet = await Wallet.findOne({
    user: req.user._id,
  });

  if (!wallet) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  // ❗ Check balance before debit
  if (wallet.balance < amount) {
    res.status(400);
    throw new Error("Insufficient funds");
  }

  // Update wallet
  wallet.balance -= amount;
  wallet.totalWithdrawals += amount;

  await wallet.save();

  // Create transaction record
  const transaction = await Transaction.create({
    wallet: wallet._id,
    type: "debit",
    amount,
    description: description || "Wallet debit",
    balanceAfter: wallet.balance,
  });

  res.status(200).json({
    message: "Wallet debited successfully",
    wallet,
    transaction,
  });
});

export {
  getWallet,
  creditWallet,
  debitWallet,
};