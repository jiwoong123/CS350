import express from "express";
import { gymGoerLoggedIn, AdminLoggedIn } from "../controller/varify.controller.js";

const router = express.Router();

router.get("/gym-goer", gymGoerLoggedIn, (req, res) => {
  res.status(200).json({ message: "authenticated" });
});
router.get("/admin", AdminLoggedIn, (req, res) => {
  res.status(200).json({ message: "authenticated" });
  console.log("good");
});

export default router;
