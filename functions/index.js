// functions/index.js
require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// Use environment variable in production: functions.config().stripe.secret

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Test route
app.get("/", (req, res) => res.status(200).send("hello world"));

// Payment creation route
app.post("/payments/create", async (req, res) => {
  let { total } = req.body; // get total from request body
  total = parseInt(total, 10);

  if (!total || total <= 0) {
    return res.status(400).send({ error: "Invalid total amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Payment creation failed:", error);
    res.status(500).send({ error: error.message });
  }
});

// Expose API endpoint
exports.api = functions.https.onRequest(app);
