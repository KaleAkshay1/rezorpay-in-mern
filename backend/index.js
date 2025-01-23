import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";

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

app.listen(3000);
