import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const instance = new Razorpay({
  key_id: process.env.REZORPAY_KEY_ID, // Your Razorpay Key ID
  key_secret: process.env.REZORPAY_KEY_SECRET, // Your Razorpay Key Secret
});

app.post("/creat-order", async (req, res) => {
  const options = req.body;
  const data = await instance.orders.create(options);
  res.json({ data });
});

app.post("/verify-payment", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const genrate_sign = await crypto
    .HmacSHA256(
      razorpay_order_id + "|" + razorpay_payment_id,
      process.env.REZORPAY_KEY_SECRET
    )
    .toString(crypto.enc.Hex);
  if (genrate_sign === razorpay_signature) {
    // here you can write login of db if you want
    res.status(200).json({ success: true, status: "success" });
  } else {
    res.status(404).json({ data: "invalid payment" });
  }
});

app.listen(3000);
