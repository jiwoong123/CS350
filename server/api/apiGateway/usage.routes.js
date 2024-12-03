import express from "express";
import { getUsage, getUsages } from "../controller/usage.controller.js";

const router = express.Router();

//router.get("/equipment-info",)
router.get("/", getUsages);
router.get("/:id", getUsage);

export default router;
