import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    redeemedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["active", "redeemed"],
      default: "active",
    },

    redeemedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model(
  "Voucher",
  voucherSchema
);

export default Voucher;