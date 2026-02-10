import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "../models/User.js";

const router = express.Router();


const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post("/signup", async (req, res) => {
  const { error } = authSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const exist = await User.findOne({ email: req.body.email });
  if (exist) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(req.body.password, 10);
  await User.create({
    email: req.body.email,
    password: hashed,
  });

  res.json({ message: "Signup successful" });
});

router.post("/login", async (req, res) => {
  const { error } = authSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userId: user._id });
});

export default router;
